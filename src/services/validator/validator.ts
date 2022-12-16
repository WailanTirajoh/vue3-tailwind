import type {
  FormData,
  FormState,
  ErrorBag,
  ValidationRule,
  ValidationRules,
} from "./type";
import { validatorGate } from "./validator-gate";

export default class Validator {
  private formData: FormData;
  private rules: ValidationRules;
  private errorBag: ErrorBag = {};

  constructor(params: FormState) {
    const { formData, rules } = params;
    this.formData = formData;
    this.rules = rules;
  }

  /**
   * to validate form data with the set of given rules
   */
  public validate() {
    for (const field in this.rules) {
      const fieldRules = this.rules[field];
      this.validateField({
        field,
        fieldRules,
      });
    }
    return this;
  }

  /**
   * to validate the given field and set of rules
   * rules can be predefined function name or custom function that returns either string if fails or void if success
   * validate field just populate errorBag if there is an unpass guard
   */
  private validateField(params: {
    field: string;
    fieldRules: ValidationRule[];
  }) {
    const { field, fieldRules } = params;
    for (const rule of fieldRules) {
      const validatorResult = this.getValidatorResult(field, rule);
      if (!validatorResult) continue;
      this.addErrorBag({ key: field, value: validatorResult });
    }
  }

  private getValidatorResult(field: string, rule: ValidationRule) {
    let validatorResult;
    switch (typeof rule) {
      // String is a predefined validator function (Can check the function lists on ./validator-gates.ts)
      case "string": {
        if (!Object.prototype.hasOwnProperty.call(validatorGate, rule)) return;
        validatorResult = validatorGate[rule](this.formData[field]);
        break;
      }
      // Its a custom callback function that returns string either string if fail / void if success
      case "function": {
        validatorResult = rule(this.formData[field]);
        break;
      }

      // TODO: Add object type (To handle class that implements ValidatorRule)
    }
    return validatorResult;
  }

  /**
   * to add error to errorBag object
   */
  private addErrorBag(params: { key: string; value: string }) {
    const { key, value } = params;
    if (this.errorBag[key]) {
      this.errorBag[key].push(value);
      return;
    }
    this.errorBag[key] = [value];
  }

  /**
   * to get errorBag
   */
  public getErrorBag() {
    return this.errorBag;
  }

  /**
   * to check if form data is pass the validator
   */
  public pass() {
    return Object.keys(this.errorBag).length === 0;
  }

  /**
   * to check if form data is fail the validator
   */
  public fail() {
    return !this.pass();
  }
}
