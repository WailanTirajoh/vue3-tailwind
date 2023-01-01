<script lang="ts">
export default {
  name: "TwInput",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useForm } from "../../composables/form";
import { computed, inject, onMounted, ref, watch } from "vue";
import { FieldValidator } from "js-formdata-validator";

export interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  modelValue?: string | number | null;
  type?: string;
  disabled?: boolean;
  errorClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  errorClass: "",
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get() {
    return props.modelValue;
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
  if (formName && props.name) {
    composableForm.updateFormData(formName, props.name, computedValue.value);
    if (fieldRules.value) {
      validateField();
    }
  }
});

onMounted(() => {
  if (formName && props.name) {
    composableForm.initFormData(formName, props.name);
    fieldValidator.setFieldName(props.name);
    fieldValidator.setFieldRules(fieldRules.value);

    const customRules = composableForm.getCustomRules();
    if (customRules) {
      fieldValidator.setCustomRules(customRules);
    }
  }
});

const fieldRules = computed(() => {
  if (formName && props.name) {
    return composableForm.getFieldRules(formName, props.name);
  }
  return [];
});

const isError = computed(() => {
  if (formName && props.name) {
    return composableForm.hasError(formName, props.name);
  }
  return false;
});

const validateField = async () => {
  if (formName && props.name && fieldRules.value) {
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
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <div>
      <slot :is-error="isError">
        <input
          v-bind="$attrs"
          v-model="computedValue"
          :type="type"
          class="transition ease-in-out border p-2 relative text-sm w-full focus:ring-0 focus:outline-none focus:shadow rounded bg-white dark:bg-gray-800 dark:border-gray-700 h-10 placeholder:italic"
          :class="[
            {
              '!bg-gray-100 dark:!bg-gray-900 cursor-not-allowed': disabled,
            },
            isError ? errorClass : '',
          ]"
          :placeholder="placeholder"
          :disabled="disabled"
        />
      </slot>
    </div>
  </div>
</template>
