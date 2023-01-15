<script lang="ts">
export default defineComponent({
  name: "TwMultiSelect",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { DropdownItem, DropdownItemValue } from "../../type";
import MultiSelectionList from "../select/TwMultiSelectionList.vue";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  watch,
  type Ref,
} from "vue";
import { useForm } from "@/composables/form";
import { FieldValidator } from "js-formdata-validator";
import type {
  CustomFieldName,
  CustomRules,
  CustomValidatorErrorMessage,
  ValidationRules,
} from "js-formdata-validator/dist/type";

export interface Props {
  name?: string;
  modelValue: Array<DropdownItemValue> | null;
  items: Array<DropdownItem>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get() {
    return props.modelValue ?? [];
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// Form
let fieldValidator: FieldValidator = new FieldValidator();
const composableForm = useForm();

const formName = inject("formName", null) as string | null;
const customRules = inject("customRules", null) as Ref<CustomRules> | null;
const customValidatorErrorMessageInject = inject(
  "customValidatorErrorMessage",
  null
) as Ref<CustomValidatorErrorMessage> | null;
const rulesInject = inject("rules", null) as Ref<ValidationRules> | null;
const customFieldNameInject = inject(
  "customFieldName",
  null
) as Ref<CustomFieldName> | null;

watch(computedValue, async () => {
  if (fieldValidator && formName && props.name) {
    composableForm.updateFormData(formName, props.name, computedValue.value);
    if (fieldRules.value) {
      validateField();
    }
  }
});

onMounted(() => {
  if (fieldValidator && formName && props.name) {
    composableForm.updateFormData(formName, props.name, computedValue.value);
    fieldValidator.setFieldName(customFieldName.value);
    fieldValidator.setFieldRules(fieldRules.value);

    if (customValidatorErrorMessageInject) {
      fieldValidator.setCustomValidatorErrorMessage(
        customValidatorErrorMessageInject.value
      );
    }
  }
  if (customRules) {
    fieldValidator.setCustomRules(customRules.value);
    watch(
      customRules,
      (value) => {
        fieldValidator.setCustomRules(value);
      },
      {
        deep: true,
      }
    );
  }
});

const fieldRules = computed(() => {
  if (
    fieldValidator &&
    formName &&
    props.name &&
    rulesInject &&
    rulesInject.value
  ) {
    return rulesInject.value[props.name];
  }
  return [];
});

const customFieldName = computed(() => {
  const FALLBACK = "Field";
  if (
    fieldValidator &&
    formName &&
    props.name &&
    customFieldNameInject &&
    customFieldNameInject.value
  ) {
    return customFieldNameInject.value[props.name] ?? FALLBACK;
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
    <MultiSelectionList
      v-bind="$attrs"
      v-model="computedValue"
      :items="items"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <div
      v-if="disabled"
      class="w-full h-full absolute top-0 left-0 rounded bg-gray-100 bg-opacity-5 cursor-not-allowed"
    ></div>
  </div>
</template>
