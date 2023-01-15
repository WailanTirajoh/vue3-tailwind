import { Validator } from "js-formdata-validator";
import type {
  CustomFieldName,
  CustomRules,
  CustomValidatorErrorMessage,
  ValidationRules,
} from "js-formdata-validator/dist/type";
import { ref } from "vue";
const forms = ref<{
  [key: string]: {
    validator: Validator;
  };
}>({});

const customValidatorRules = ref<CustomRules>({});
const globalCustomValidatorErrorMessage = ref<CustomValidatorErrorMessage>({});

export const useForm = () => {
  function setCustomRules(customRules: CustomRules) {
    customValidatorRules.value = customRules;
  }

  function getCustomRules() {
    return customValidatorRules.value;
  }

  // To add new Form
  function addForm(formId: string) {
    const validator = new Validator();

    if (customValidatorRules.value) {
      validator.mergeCustomRules(customValidatorRules.value);
    }

    forms.value[formId] = {
      validator: validator,
    };
  }

  // To get form by id
  function getForm(formid: string) {
    return forms.value[formid];
  }

  // To initialize form field with empty value
  function initFormData(formId: string, key: string) {
    forms.value[formId].validator.setFormKeyValue(key, null);
  }

  // To get form data by form id
  function getFormData(formId: string) {
    return forms.value[formId].validator.getFormData();
  }

  // To update for field values by form id & key (field)
  function updateFormData(formId: string, key: string, value: any) {
    forms.value[formId].validator.setFormKeyValue(key, value);
  }

  // To set form rules
  function setFormRules(formId: string, rules: ValidationRules) {
    forms.value[formId].validator.setRules(rules);
  }

  // To get field rules
  function getFieldRules(formId: string, fieldName: string) {
    return forms.value[formId].validator.getRules()[fieldName];
  }

  // To set form field errors
  function setFieldErrors(
    formId: string,
    fieldName: string,
    fieldErrors: string[]
  ) {
    forms.value[formId].validator.setFieldErrors(fieldName, fieldErrors);
  }

  function setCustomFieldNames(
    formId: string,
    customFieldNames: CustomFieldName
  ) {
    forms.value[formId].validator.setCustomFieldName(customFieldNames);
  }

  function getFieldName(formId: string, fieldName: string) {
    return forms.value[formId].validator.getCustomFieldName()[fieldName];
  }

  // Form level custom validator error message
  function setCustomValidatorErrorMessage(
    formId: string,
    customValidatorErrorMessage: CustomValidatorErrorMessage
  ) {
    forms.value[formId].validator.setCustomValidatorErrorMessage({
      ...globalCustomValidatorErrorMessage.value,
      ...customValidatorErrorMessage,
    });
  }

  // Global level custom validator error message
  function setGlobalCustomValidatorErrorMessage(
    customValidatorErrorMessage: CustomValidatorErrorMessage
  ) {
    globalCustomValidatorErrorMessage.value = customValidatorErrorMessage;
  }

  function getError(formId: string, field: string) {
    return forms.value[formId].validator.getError(field);
  }

  function getErrors(formId: string, field: string) {
    return forms.value[formId].validator.getErrorBag()[field];
  }

  function hasError(formId: string, field: string) {
    return typeof forms.value[formId].validator.getError(field) === "string";
  }

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
    setCustomFieldNames,
    getFieldName,
    setCustomValidatorErrorMessage,
    setGlobalCustomValidatorErrorMessage,
    getError,
    getErrors,
    hasError,
  };
};
