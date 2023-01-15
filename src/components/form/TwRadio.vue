<script lang="ts">
export default defineComponent({
  name: "TwRadio",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { useForm } from "../../composables/form";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  watch,
  type Ref,
} from "vue";
import type { RadioOption } from "../../type";
import { FieldValidator } from "js-formdata-validator";
import type {
  CustomFieldName,
  CustomRules,
  CustomValidatorErrorMessage,
  ValidationRules,
} from "js-formdata-validator/dist/type";

export interface Props {
  name?: string;
  label: string;
  id: string;
  modelValue?: string | number;
  type?: string;
  disabled?: boolean;
  options: RadioOption[];
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
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
</script>

<template>
  <label class="font-bold text-gray-700 dark:text-gray-400">
    {{ label }}
  </label>
  <label
    :for="`${option.label}-${id}`"
    v-for="option in options"
    :key="`${option.label}-${id}`"
    class="font-bold text-gray-700 dark:text-gray-400 block"
    :class="[$attrs.class]"
  >
    <input
      v-bind="$attrs"
      v-model="computedValue"
      type="radio"
      :name="id"
      :id="`${option.label}-${id}`"
      :disabled="disabled"
      :value="option.value"
      :data-error="isError"
    />
    {{ option.label }}
  </label>
</template>
