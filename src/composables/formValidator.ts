import { FieldValidator } from "js-formdata-validator";
import type {
  CustomFieldName,
  CustomRules,
  CustomValidatorErrorMessage,
  ValidationRule,
  ValidationRules,
} from "js-formdata-validator/dist/type";
import {
  computed,
  inject,
  watch,
  type ComputedRef,
  type Ref,
  type WritableComputedRef,
} from "vue";
import { useForm } from "./form";

export interface FormValidatorProps {
  fieldName?: string;
  fieldValue: WritableComputedRef<any>;
}

export const useFormValidator = ({
  fieldName,
  fieldValue,
}: FormValidatorProps) => {
  // The field validator instance / null if has no field name / form wrapper
  let fieldValidator: FieldValidator | null;

  // Composable Form
  const composableForm = useForm();

  // Form Wrapper Name / Form Wrapper ID (Data provided from TwForm / The Form Wrapper)
  const formName = inject("formName", null) as string | null;

  // Form Wrapper Custom Rules (Data provided from TwForm / The Form Wrapper)
  const customRules = inject("customRules", null) as Ref<CustomRules> | null;

  // Form Wrapper Custom Validator Error Message (Data provided from TwForm / The Form Wrapper)
  const customValidatorErrorMessageInject = inject(
    "customValidatorErrorMessage",
    null
  ) as Ref<CustomValidatorErrorMessage> | null;

  // Form Wrapper Rules (Data provided from TwForm / The Form Wrapper)
  const rulesInject = inject("rules", null) as Ref<ValidationRules> | null;

  // Form Wrapper Custom Field Name (Data provided from TwForm / The Form Wrapper)
  const customFieldNameInject = inject(
    "customFieldName",
    null
  ) as Ref<CustomFieldName> | null;

  let isError: ComputedRef<boolean> | undefined;
  let fieldRules: ComputedRef<Array<ValidationRule>> | undefined;
  let customFieldName: ComputedRef<string> | undefined;

  // Watch field value whenever it change, update form data & validate field if it has rules
  watch(fieldValue, async () => {
    if (fieldValidator && formName && fieldName) {
      composableForm.updateFormData(formName, fieldName, fieldValue.value);
      if (fieldRules && fieldRules.value) {
        // validateField();
      }
    }
  });

  // // Initialize field validator, set custom validator error message if any,
  // // set custom rules if any and watch changes on custom rules
  // if (formName && fieldName) {
  //   fieldValidator = new FieldValidator();

  //   if (fieldValidator) {
  //     composableForm.updateFormData(formName, fieldName, fieldValue.value);
  //     isError = computed(() => {
  //       if (formName && fieldName && fieldValidator) {
  //         return composableForm.hasError(formName, fieldName);
  //       }
  //       return false;
  //     });

  //     fieldRules = computed(() => {
  //       if (formName && fieldName && rulesInject && rulesInject.value) {
  //         return rulesInject.value[fieldName];
  //       }
  //       return [];
  //     });

  //     customFieldName = computed(() => {
  //       const FALLBACK = "Field";
  //       if (fieldName && customFieldNameInject && customFieldNameInject.value) {
  //         return customFieldNameInject.value[fieldName] ?? FALLBACK;
  //       }
  //       return FALLBACK;
  //     });

  //     fieldValidator.setFieldName(customFieldName.value);
  //     fieldValidator.setFieldRules(fieldRules.value);

  //     if (customValidatorErrorMessageInject) {
  //       fieldValidator.setCustomValidatorErrorMessage(
  //         customValidatorErrorMessageInject.value
  //       );
  //     }

  //     if (customRules) {
  //       fieldValidator.setCustomRules(customRules.value);
  //     }
  //   }
  // }

  // // Validate field whenever it has form wrapper, field name, and field rules
  // async function validateField() {
  //   if (
  //     fieldValidator &&
  //     formName &&
  //     fieldName &&
  //     fieldRules &&
  //     fieldRules.value
  //   ) {
  //     fieldValidator.setFieldValue(fieldValue.value);
  //     fieldValidator.setFormData(composableForm.getFormData(formName));
  //     await fieldValidator.validate();

  //     const error = fieldValidator.getErrorBag();
  //     composableForm.setFieldErrors(formName, fieldName, error);
  //   }
  // }

  return {
    isError: isError,
  };
};
