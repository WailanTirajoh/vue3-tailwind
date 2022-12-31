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

  const updateFormData = (formId: string, key: string, value: any) => {
    forms.value[formId].validator.setFormKeyValue(key, value);
  };

  const setFormRules = (formId: string, rules: ValidationRules) => {
    forms.value[formId].validator.setRules(rules);
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
    updateFormData,
    setFormRules,
    validate,
    getError,
    getErrors,
  };
};
