import { Validator } from "js-formdata-validator";
import type { ValidationRules } from "js-formdata-validator/dist/type";
import { ref } from "vue";
const forms = ref<{
  [key: string]: {
    validator: Validator;
  };
}>({});

export const useForm = () => {
  const addForm = (formId: string) => {
    forms.value[formId] = {
      validator: new Validator({}),
    };
  };

  const getForm = (formid: string) => {
    return forms.value[formid];
  };

  const initFormData = (formId: string, key: string) => {
    forms.value[formId].validator.setFormKeyValue(key, null);
  };

  const getFormData = (formId: string) => {
    return forms.value[formId].validator.getFormData();
  };

  const updateFormData = (formId: string, key: string, value: any) => {
    forms.value[formId].validator.setFormKeyValue(key, value);
  };

  const setFormRules = (formId: string, rules: ValidationRules) => {
    forms.value[formId].validator.setRules(rules);
  };

  const getFieldRules = (formId: string, fieldName: string) => {
    return forms.value[formId].validator.getRules()[fieldName];
  };

  const setFieldErrors = (
    formId: string,
    fieldName: string,
    fieldErrors: string[]
  ) => {
    forms.value[formId].validator.setFieldErrors(fieldName, fieldErrors);
  };

  const validate = async (formId: string) => {
    forms.value[formId].validator.clearErrors();
    await forms.value[formId].validator.validate();
  };

  const getError = (formId: string, field: string) => {
    return forms.value[formId].validator.getError(field);
  };

  const getErrors = (formId: string, field: string) => {
    return forms.value[formId].validator.getErrorBag()[field];
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
    validate,
    getError,
    getErrors,
  };
};
