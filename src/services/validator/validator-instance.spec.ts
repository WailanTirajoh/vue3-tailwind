import { describe, it, expect, beforeEach } from "vitest";
import Validator from "./validator";
import { validatorErrorMessage, baseValidatorRule } from "./base-rules";

describe("Validator", () => {
  let validator: Validator;

  beforeEach(() => {
    validator = new Validator({
      formData: {
        name: "John",
        age: 30,
        email: "john@example.com",
      },
      rules: {
        name: ["required", "string"],
        age: ["required", "integer"],
        email: ["required", "string"],
      },
    });
  });

  it("validate", async () => {
    await validator.validate();
    expect(validator.pass()).toBe(true);
    expect(validator.fail()).toBe(false);
    expect(validator.getErrorBag()).toEqual({});
  });

  it("validate with errors", async () => {
    validator.getFormData().age = "invalid";
    await validator.validate();
    expect(validator.pass()).toBe(false);
    expect(validator.fail()).toBe(true);
    const errors = validator.getErrorBag();
    expect(errors).toEqual({
      age: [validatorErrorMessage["integer"]],
    });
  });

  it("merge custom rules", () => {
    const customRules = {
      testRule() {
        return "test";
      },
    };
    validator.mergeCustomRules(customRules);
    expect(validator.getValidator()).toEqual({
      ...baseValidatorRule,
      ...customRules,
    });
  });
});
