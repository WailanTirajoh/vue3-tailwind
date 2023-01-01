<script lang="ts">
export default {
  name: "TwTextarea",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useForm } from "../../composables/form";
import { computed, inject, onMounted, watch } from "vue";
import { FieldValidator } from "js-formdata-validator";

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
const composableForm = useForm();
const fieldValidator = new FieldValidator();

const formName = inject("formName") as string;

watch(computedValue, async () => {
  if (formName && props.name && fieldRules.value) {
    composableForm.updateFormData(formName, props.name, computedValue.value);
    validateField();
  }
});

onMounted(() => {
  if (formName && props.name) {
    composableForm.initFormData(formName, props.name);
    fieldValidator.setFieldName(props.name);
    fieldValidator.setFieldRules(fieldRules.value);
  }
});

const fieldRules = computed(() => {
  if (formName && props.name) {
    return composableForm.getFieldRules(formName, props.name);
  }
  return [];
});

const validateField = async () => {
  if (formName && props.name && fieldRules.value) {
    fieldValidator.setFieldValue(computedValue.value);

    await fieldValidator.validate();

    const error = fieldValidator.getErrorBag();
    composableForm.setFieldErrors(formName, props.name, error);
  }
};
</script>

<template>
  <div class="">
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <textarea
      v-bind="$attrs"
      v-model="computedValue"
      class="block transition duration-300 ease-in-out border p-2 relative text-sm w-full focus:ring-0 focus:outline-none focus:shadow rounded bg-white dark:bg-gray-800 dark:border-gray-700"
      :class="{
        'bg-gray-100 cursor-not-allowed': disabled,
      }"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>
