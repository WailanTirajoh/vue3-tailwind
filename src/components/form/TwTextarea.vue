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
let fieldValidator: FieldValidator;

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
  fieldValidator = new FieldValidator();
  if (formName && props.name) {
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
    class="block transition ease-in-out border p-2 relative text-sm w-full rounded bg-white h-10 placeholder:italic text-gray-600 dark:text-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-0 focus:outline-none focus:border-transparent focus:shadow-[0_0_0_0.2rem_rgb(0_123_255_/_25%)]"
    :class="{
      'bg-gray-100 cursor-not-allowed': disabled,
    }"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>
