import type { baseValidatorRule } from "./base-rules";

export type BaseValidatorRule = typeof baseValidatorRule;

export type CustomRules = {
  [key: string]: (
    ...args: any[]
  ) => Promise<string | undefined> | string | undefined;
};

export type AnonimousRule = (
  value: any,
  formData: FormData
) => Promise<string | undefined> | string | undefined;

export type ValidationRule =
  | keyof BaseValidatorRule
  | keyof CustomRules
  | AnonimousRule;

export type ValidationRules = {
  [key: string]: ValidationRule[];
};

export type ErrorBag = {
  [key: string]: string[];
};

export type FormData = {
  [key: string]: any;
};

export type FormState = {
  formData: FormData;
  rules?: ValidationRules;
  customRules?: CustomRules;
};
