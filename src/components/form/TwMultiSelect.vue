<script lang="ts">
export default {
  name: "TwMultiSelect",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { DropdownItem, DropdownItemValue } from "../type";
import MultiSelectionList from "../select/TwMultiSelectionList.vue";
import { computed, inject, onMounted, watch } from "vue";
import { useForm } from "@/composables/form";
import { FieldValidator } from "js-formdata-validator";

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
  <div>
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-200">
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
  </div>
</template>
