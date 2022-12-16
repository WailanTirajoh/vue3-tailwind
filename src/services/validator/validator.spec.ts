import { describe, it, expect } from "vitest";
import Validator from "./validator";
import { validatorErrorMessage } from "./validator-gate";

describe("Validator Service", () => {
  const formData = {
    name: "Wailan",
    email: null,
    age: 25,
  };
  it("fails", () => {
    const validator = new Validator({
      formData: formData,
      rules: {
        name: ["required"],
        email: [
          "required",
          (value) => {
            const emailRegex =
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegex.test(value))
              return "The field is not a valid email";
          },
        ],
      },
    }).validate();

    expect(validator.pass()).toBeFalsy();
    expect(validator.fail()).toBeTruthy();

    const error = validator.getErrorBag();
    expect(error.email).include(validatorErrorMessage["required"]);
    expect(error.email).include("The field is not a valid email");
  });

  it("pass", () => {
    const validator = new Validator({
      formData: formData,
      rules: {
        name: ["required"],
      },
    }).validate();

    expect(validator.pass()).toBeTruthy();
    expect(validator.fail()).toBeFalsy();

    const error = validator.getErrorBag();
    expect(error).toEqual({});
  });

  it("validate number", () => {
    const validator = new Validator({
      formData: formData,
      rules: {
        age: ["integer"],
      },
    }).validate();
    expect(validator.pass()).toBeTruthy();
    expect(validator.fail()).toBeFalsy();
  });

  it("validate string that have to be number", () => {
    const validator = new Validator({
      formData: formData,
      rules: {
        name: ["integer"],
      },
    }).validate();
    expect(validator.pass()).toBeFalsy();
    expect(validator.fail()).toBeTruthy();
    const error = validator.getErrorBag();
    expect(error.name).include(validatorErrorMessage["integer"]);
  });
});
