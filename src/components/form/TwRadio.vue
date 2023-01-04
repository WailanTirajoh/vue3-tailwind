<script lang="ts">
export default {
  name: "TwRadio",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useForm } from "../../composables/form";
import { computed, inject, onMounted, watch } from "vue";
import type { RadioOption } from "../type";
import { FieldValidator } from "js-formdata-validator";

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
const composableForm = useForm();
const fieldValidator = new FieldValidator();

const formName = inject("formName", null) as string | null;

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
    fieldValidator.setFieldName(props.name);
    fieldValidator.setFieldRules(fieldRules.value);

    const customRules = composableForm.getCustomRules();
    if (customRules) {
      fieldValidator.setCustomRules(customRules);
    }
  }
});

const fieldRules = computed(() => {
  if (fieldValidator && formName && props.name) {
    return composableForm.getFieldRules(formName, props.name);
  }
  return [];
});

const validateField = async () => {
  if (fieldValidator && formName && props.name && fieldRules.value) {
    fieldValidator.setFieldValue(computedValue.value);
    fieldValidator.setFormData(composableForm.getFormData(formName));
    await fieldValidator.validate();

    const error = fieldValidator.getErrorBag();
    composableForm.setFieldErrors(formName, props.name, error);
  }
};
</script>

<template>
  <div class="">
    <label class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <label
      :for="`${option.label}-${id}`"
      v-for="option in options"
      :key="`${option.label}-${id}`"
      class="font-bold text-gray-700 dark:text-gray-400 block"
    >
      <input
        v-bind="$attrs"
        v-model="computedValue"
        type="radio"
        :name="id"
        :id="`${option.label}-${id}`"
        :disabled="disabled"
        :value="option.value"
      />
      {{ option.label }}
    </label>
  </div>
</template>
