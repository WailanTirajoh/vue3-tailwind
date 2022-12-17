import { describe, it, expect, beforeEach } from "vitest";
import Validator from "./validator";
import { validatorErrorMessage } from "./base-rules";

describe("Validator Service", () => {
  let validator: Validator;

  beforeEach(() => {
    validator = new Validator({
      formData: {
        name: "Wailan",
        email: null,
        age: 25,
      },
    });
  });

  it("validate", async () => {
    validator.setRules({
      name: ["required"],
    });
    await validator.validate();

    expect(validator.pass()).toBeTruthy();
    expect(validator.fail()).toBeFalsy();

    const error = validator.getErrorBag();
    expect(error).toEqual({});
  });

  it("validate with errors", async () => {
    validator.setRules({
      name: ["required"],
      email: [
        "required",
        (value) => {
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          if (!emailRegex.test(value)) return "The field is not a valid email";
        },
      ],
    });

    await validator.validate();

    expect(validator.pass()).toBeFalsy();
    expect(validator.fail()).toBeTruthy();

    const error = validator.getErrorBag();
    expect(error.email).include(validatorErrorMessage["required"]);
    expect(error.email).include("The field is not a valid email");
  });

  it("validate integer", async () => {
    validator.setRules({
      age: ["integer"],
    });
    await validator.validate();
    expect(validator.pass()).toBeTruthy();
    expect(validator.fail()).toBeFalsy();
  });

  it("validate string that must be an integer", async () => {
    validator.setRules({
      name: ["integer"],
    });
    await validator.validate();
    expect(validator.fail()).toBeTruthy();
    const error = validator.getErrorBag();
    expect(error.name).include(validatorErrorMessage["integer"]);
  });

  it("validate custom rules", async () => {
    validator.setRules({
      age: ["custom"],
    });

    validator.mergeCustomRules({
      custom(value) {
        if (value === 25) {
          return "Test Error";
        }
      },
    });

    await validator.validate();

    const error = validator.getErrorBag();
    expect(error.age).include("Test Error");
  });

  it("validate dynamic arguments", async () => {
    validator.setRules({
      age: ["between:24,50"],
    });
    validator.mergeCustomRules({
      async between(value, firstValue, secondValue) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (value > firstValue && value < secondValue) {
          return "The value must between 24 - 50 years old";
        }
      },
    });
    await validator.validate();
    expect(validator.fail()).toBeTruthy();
    const error = validator.getErrorBag();
    expect(error.age).include("The value must between 24 - 50 years old");
  });

  it("validate nested form data", async () => {
    validator.setFormData({
      name: "John",
      age: 30,
      email: "john@example.com",
      family: {
        wife: "test",
        children: null,
      },
    });
    validator.setRules({
      "family.children": ["required"],
    });
    await validator.validate();
    expect(validator.fail()).toBeTruthy();
  });

  it("validate deep nested form data", async () => {
    validator.setFormData({
      name: "John",
      age: 30,
      email: "john@example.com",
      family: {
        wife: {
          name: "test",
          age: null,
          school: {
            name: null,
          },
        },
        children: null,
      },
    });
    validator.setRules({
      "family.wife.age": ["required"],
      "family.wife.school.name": ["required"],
    });
    await validator.validate();
    expect(validator.fail()).toBeTruthy();
    const error = validator.getErrorBag();
    expect(error["family.wife.age"]).include(validatorErrorMessage["required"]);
    expect(error["family.wife.school.name"]).include(
      validatorErrorMessage["required"]
    );
  });

  it("validate array form data", async () => {
    const validator = new Validator({
      formData: {
        name: "John",
        age: null,
        email: "john@example.com",
        families: [
          {
            type: "child",
            name: "test",
          },
          {
            type: "child",
            name: "null",
          },
          {
            type: "child",
            name: null,
          },
        ],
      },
      rules: {
        families: ["array"],
        ["families.*.name"]: ["string"],
      },
    });
    await validator.validate();
    expect(validator.fail()).toBeTruthy();
    const error = validator.getErrorBag();
    expect(error["families.2.name"]).include(validatorErrorMessage["string"]);
  });
});
