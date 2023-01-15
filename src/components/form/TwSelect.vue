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

const isError = computed(() => {
  if (formName && props.name) {
    return composableForm.hasError(formName, props.name);
  }
  return false;
});

provide("select-error", isError);

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
