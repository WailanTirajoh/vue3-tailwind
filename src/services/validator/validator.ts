import type {
  FormData,
  FormState,
  ErrorBag,
  ValidationRule,
  ValidationRules,
  BaseValidatorRule,
  CustomRules,
} from "./type";
import { baseValidatorRule } from "./base-rules";

export default class Validator {
  // The form data to validate
  private formData: FormData;
  // The validation rules to apply to the form data
  private rules: ValidationRules;
  // The errors found while validating the form data
  private errorBag: ErrorBag = {};
  // The validator functions to use for validation, including both base rules and custom rules
  private validator!: BaseValidatorRule & CustomRules;

  constructor({ formData, customRules, rules }: FormState) {
    this.formData = formData;
    this.rules = rules ?? {};
    this.mergeCustomRules(customRules);
  }

  /**
   * Merges the base rules and custom rules into a single object.
   * @param customRules The custom rules to merge with the base rules.
   */
  public mergeCustomRules(customRules: CustomRules | undefined) {
    this.setValidator({ ...baseValidatorRule, ...customRules });
  }

  /**
   * Validates the form data with the set of given rules.
   */
  public async validate(): Promise<Validator> {
    // Validate each field in the form data with its corresponding rules
    const fieldPromises = Object.entries(this.rules).map(
      ([field, fieldRules]) => this.validateField({ field, fieldRules })
    );
    // Wait for all field validation promises to complete
    await Promise.all(fieldPromises);
    return this;
  }

  /**
   * Validates the given field with the set of rules.
   * @param field The field to validate.
   * @param fieldRules The validation rules to apply to the field.
   */
  private async validateField({
    field,
    fieldRules,
  }: {
    field: string;
    fieldRules: ValidationRule[];
  }): Promise<void> {
    // Get the results of validating each rule for the field
    const ruleResults = await Promise.all(
      fieldRules.map((rule) =>
        // If the validator result is a promise, return it directly,
        // otherwise wrap it in a resolved promise
        typeof this.getValidatorResult(field, rule) === "object"
          ? this.getValidatorResult(field, rule)
          : Promise.resolve(this.getValidatorResult(field, rule))
      )
    );
    // Filter out the undefined results
    const errors = ruleResults.filter((r) => r !== undefined);
    // Add each error to the error bag
    errors.forEach((error) => this.addErrorBag({ key: field, value: error }));
  }

  /**
   * Gets the validator result for the given field and rule.
   * @param field The field to validate.
   * @param rule The validation rule to apply to the field.
   */
  private getValidatorResult(field: string, rule: ValidationRule) {
    let validatorResult;
    switch (typeof rule) {
      // String is a predefined validator function (Can check the function lists on ./validator-gates.ts)
      case "string": {
        validatorResult = this.handleStringRule(field, rule);
        break;
      }
      // Its a custom callback function that returns either string if fail / void if success
      case "function": {
        validatorResult = rule(this.formData[field], this.formData);
        break;
      }

      // TODO: Add object type (To handle class that implements ValidatorRule)
    }
    return validatorResult;
  }

  /**
   * Handles string rules by parsing the rule string and calling the corresponding
   * validator function with the provided arguments.
   * @param field The field to validate.
   * @param rule The string rule to handle.
   */
  private handleStringRule(field: string, rule: string) {
    // Parse the validator name and arguments from the rule string
    const [validatorName, paramArgs] = rule.split(":");

    // Return if the validator function does not exist
    if (!(validatorName in this.validator)) return;

    // Split the arguments string into an array of trimmed strings
    const parameters = paramArgs
      ? paramArgs.split(",").map((p) => p.trim())
      : [];

    // Call the validator function with the field value and the arguments array
    return this.validator[validatorName](this.formData[field], ...parameters);
  }

  /**
   * To add error to errorBag object
   */
  private addErrorBag({
    key,
    value,
  }: {
    key: string;
    value: string | undefined;
  }) {
    if (!value) return;
    this.errorBag[key]
      ? this.errorBag[key].push(value)
      : (this.errorBag[key] = [value]);
  }

  /**
   * To get errorBag
   */
  public getErrorBag() {
    return this.errorBag;
  }

  /**
   * To get error by field name
   */
  public getError(field: string): string | undefined {
    return this.errorBag[field]?.[0];
  }

  /**
   * To get failed fields
   */
  public getFailedFields(): string[] {
    return Object.keys(this.errorBag);
  }

  /**
   * To check if form data is pass the validator
   */
  public pass() {
    return Object.keys(this.errorBag).length === 0;
  }

  /**
   * To check if form data is fail the validator
   */
  public fail() {
    return !this.pass();
  }

  // Getters & Setters for unit test
  public getFormData(): FormData {
    return this.formData;
  }

  public setFormData(formData: FormData) {
    this.formData = formData;
  }

  public getValidator(): BaseValidatorRule & CustomRules {
    return this.validator;
  }

  public setValidator(validator: BaseValidatorRule & CustomRules) {
    this.validator = validator;
  }

  public getRules(): ValidationRules {
    return this.rules;
  }

  public setRules(rules: ValidationRules) {
    this.rules = rules;
  }
  // End Getters & Setters for unit test
}
