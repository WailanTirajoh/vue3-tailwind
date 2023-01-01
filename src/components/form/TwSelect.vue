<script lang="ts">
export default {
  name: "TwSelect",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { DropdownItem } from "../type";
import SelectionList from "../select/TwSelectionList.vue";
import { useForm } from "../../composables/form";
import { computed, inject, onMounted, watch } from "vue";
import { FieldValidator } from "js-formdata-validator";

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
  <div>
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <div class="relative">
      <SelectionList
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
  </div>
</template>
