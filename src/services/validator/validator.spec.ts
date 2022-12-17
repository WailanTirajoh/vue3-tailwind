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
});
