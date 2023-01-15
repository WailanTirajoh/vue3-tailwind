<script lang="ts">
export default defineComponent({
  name: "TwTextarea",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { useForm } from "../../composables/form";
import { computed, defineComponent, inject, onMounted, watch } from "vue";
import { FieldValidator } from "js-formdata-validator";
import type {
  CustomFieldName,
  CustomRules,
  CustomValidatorErrorMessage,
  ValidationRules,
} from "js-formdata-validator/dist/type";

export interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  modelValue?: string | number | null;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  placeholder: "",
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get() {
    return props.modelValue ?? "";
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// Form
let fieldValidator: FieldValidator;
const composableForm = useForm();

const formName = inject("formName", null) as string | null;
const customRules = inject("customRules", null) as CustomRules | null;
const rulesInject = inject("rules", null) as ValidationRules | null;
const customFieldNameInject = inject(
  "customFieldName",
  null
) as CustomFieldName | null;
const customValidatorErrorMessageInject = inject(
  "customValidatorErrorMessage",
  null
) as CustomValidatorErrorMessage | null;

watch(computedValue, async () => {
  if (formName && props.name) {
    composableForm.updateFormData(formName, props.name, computedValue.value);
    if (fieldRules.value) {
      validateField();
    }
  }
});

onMounted(() => {
  fieldValidator = new FieldValidator();
  if (fieldValidator && formName && props.name) {
    composableForm.updateFormData(formName, props.name, computedValue.value);
    fieldValidator.setFieldName(props.name);
    fieldValidator.setFieldRules(fieldRules.value);
    fieldValidator.setFieldName(customFieldName.value);

    if (customValidatorErrorMessageInject) {
      fieldValidator.setCustomValidatorErrorMessage(
        customValidatorErrorMessageInject
      );
    }

    if (customRules) {
      fieldValidator.setCustomRules(customRules);
    }
  }
});

const fieldRules = computed(() => {
  if (formName && props.name && rulesInject) {
    return rulesInject[props.name];
  }
  return [];
});

const customFieldName = computed(() => {
  const FALLBACK = "Field";
  if (formName && props.name && customFieldNameInject) {
    return customFieldNameInject[props.name] ?? FALLBACK;
  }
  return FALLBACK;
});

const isError = computed(() => {
  if (formName && props.name) {
    return composableForm.hasError(formName, props.name);
  }
  return false;
});

async function validateField() {
  if (fieldValidator && formName && props.name && fieldRules.value) {
    fieldValidator.setFieldValue(computedValue.value);
    fieldValidator.setFormData(composableForm.getFormData(formName));
    await fieldValidator.validate();

    const error = fieldValidator.getErrorBag();
    composableForm.setFieldErrors(formName, props.name, error);
  }
}
</script>

<template>
  <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
    {{ label }}
  </label>
  <textarea
    v-bind="$attrs"
    v-model="computedValue"
    :data-error="isError"
    class="block transition ease-in-out border p-2 relative text-sm w-full rounded bg-white h-10 placeholder:italic text-gray-600 dark:text-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-0 focus:outline-none focus:border-transparent focus:shadow-[0_0_0_0.2rem_rgb(0_123_255_/_25%)] error:border-red-400 error:border error:focus:shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);] dark:error:border-red-400 dark:error:border dark:error:focus:shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);] disabled:bg-gray-100 disabled:cursor-not-allowed"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>
