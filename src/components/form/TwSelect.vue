<script lang="ts">
export default defineComponent({
  name: "TwSelect",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { DropdownItem } from "../../type";
import TwSelectionList from "../select/TwSelectionList.vue";
import { useForm } from "../../composables/form";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  watch,
} from "vue";
import { FieldValidator } from "js-formdata-validator";
import type {
  CustomFieldName,
  CustomRules,
  CustomValidatorErrorMessage,
  ValidationRules,
} from "js-formdata-validator/dist/type";

export interface Props {
  name?: string;
  modelValue?: string | number | null;
  label?: string;
  placeholder?: string;
  items: Array<DropdownItem>;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: "",
  modelValue: () => "",
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get() {
    return props.modelValue || null;
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
const customValidatorErrorMessageInject = inject(
  "customValidatorErrorMessage",
  null
) as CustomValidatorErrorMessage | null;
const rulesInject = inject("rules", null) as ValidationRules | null;
const customFieldNameInject = inject(
  "customFieldName",
  null
) as CustomFieldName | null;

watch(computedValue, async () => {
  if (fieldValidator && formName && props.name) {
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
    fieldValidator.setFieldName(customFieldName.value);
    fieldValidator.setFieldRules(fieldRules.value);

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
  if (fieldValidator && formName && props.name && rulesInject) {
    return rulesInject[props.name];
  }
  return [];
});

const customFieldName = computed(() => {
  const FALLBACK = "Field";
  if (fieldValidator && formName && props.name && customFieldNameInject) {
    return customFieldNameInject[props.name] ?? FALLBACK;
  }
  return FALLBACK;
});

const isError = computed(() => {
  if (fieldValidator && formName && props.name) {
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
provide("select-error", isError);
</script>

<template>
  <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
    {{ label }}
  </label>
  <div class="relative">
    <TwSelectionList
      v-bind="$attrs"
      v-model="computedValue"
      :items="items"
      :placeholder="placeholder"
      :close-on-select="true"
      :disabled="disabled"
    />
    <div
      v-if="disabled"
      class="w-full h-full absolute top-0 left-0 rounded bg-gray-100 bg-opacity-5 cursor-not-allowed"
    ></div>
  </div>
</template>
