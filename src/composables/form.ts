import { Validator } from "js-formdata-validator";
import type {
  CustomRules,
  ValidationRules,
} from "js-formdata-validator/dist/type";
import { ref } from "vue";
const forms = ref<{
  [key: string]: {
    validator: Validator;
  };
}>({});

const customValidatorRules = ref<CustomRules>({});

export const useForm = () => {
  const setCustomRules = (customRules: CustomRules) => {
    customValidatorRules.value = customRules;
  };

  const getCustomRules = () => {
    return customValidatorRules.value;
  };

  // To add new Form
  const addForm = (formId: string) => {
    const validator = new Validator({});
    if (customValidatorRules.value)
      validator.mergeCustomRules(customValidatorRules.value);

    forms.value[formId] = {
      validator: validator,
    };
  };

  // To get form by id
  const getForm = (formid: string) => {
    return forms.value[formid];
  };

  // To initialize form field with empty value
  const initFormData = (formId: string, key: string) => {
    forms.value[formId].validator.setFormKeyValue(key, null);
  };

  // To get form data by form id
  const getFormData = (formId: string) => {
    return forms.value[formId].validator.getFormData();
  };

  // To update for field values by form id & key (field)
  const updateFormData = (formId: string, key: string, value: any) => {
    forms.value[formId].validator.setFormKeyValue(key, value);
  };

  // To set form rules
  const setFormRules = (formId: string, rules: ValidationRules) => {
    forms.value[formId].validator.setRules(rules);
  };

  // To get field rules
  const getFieldRules = (formId: string, fieldName: string) => {
    return forms.value[formId].validator.getRules()[fieldName];
  };

  // To set form field errors
  const setFieldErrors = (
    formId: string,
    fieldName: string,
    fieldErrors: string[]
  ) => {
    forms.value[formId].validator.setFieldErrors(fieldName, fieldErrors);
  };

  const getError = (formId: string, field: string) => {
    return forms.value[formId].validator.getError(field);
  };

  const getErrors = (formId: string, field: string) => {
    return forms.value[formId].validator.getErrorBag()[field];
  };

  const hasError = (formId: string, field: string) => {
    return typeof forms.value[formId].validator.getError(field) === "string";
  };

  return {
    forms,
    addForm,
    getForm,
    initFormData,
    getFormData,
    updateFormData,
    setFormRules,
    getFieldRules,
    setFieldErrors,
    setCustomRules,
    getCustomRules,
    getError,
    getErrors,
    hasError,
  };
};
