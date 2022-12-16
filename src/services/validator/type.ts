import type { validatorGate } from "./validator-gate";

export type ValidatorGateKeys = keyof typeof validatorGate;
export type ValidationRule =
  | ValidatorGateKeys
  | ((value: any) => string | void);

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

export interface ErrorBag {
  [key: string]: string[];
}

export interface FormData {
  [key: string]: any;
}

export interface FormState {
  formData: FormData;
  rules: ValidationRules;
}
