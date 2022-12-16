import type { ValidatorGateKeys } from "./type";

export const validatorErrorMessage: Record<ValidatorGateKeys, string> = {
  ["required"]: `The field cannot be empty`,
  ["array"]: `The field must be instance of Array`,
  ["integer"]: `The field must be integer`,
  ["numeric"]: `The field must be numeric`,
  ["string"]: `The field must be string`,
};

export const validatorGate = {
  required(value: any) {
    if (value === undefined || value === "" || value === null) {
      return validatorErrorMessage["required"];
    }
  },

  array(value: any) {
    if (!(value instanceof Array)) {
      return validatorErrorMessage["array"];
    }
  },

  integer(value: any) {
    if (!Number.isInteger(value)) {
      return validatorErrorMessage["integer"];
    }
  },

  numeric(value: any) {
    if (!(value instanceof Number)) {
      return validatorErrorMessage["numeric"];
    }
  },

  string(value: any) {
    if (typeof value !== "string") {
      return validatorErrorMessage["string"];
    }
  },
};
