<script lang="ts">
export default defineComponent({
  name: "TwForm",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { computed, defineComponent, onBeforeMount, provide, watch } from "vue";
import { useForm } from "../../composables/form";
import { generateId } from "../../utils/generateId";
import type {
  CustomFieldName,
  CustomValidatorErrorMessage,
  ValidationRules,
} from "js-formdata-validator/dist/type";

const props = defineProps<{
  name?: string;
  rules: ValidationRules;
  customFieldName?: CustomFieldName;
  customValidatorErrorMessage?: CustomValidatorErrorMessage;
}>();

const emit = defineEmits(["submit"]);

const formName = computed(() => props.name ?? generateId());
const rules = computed(() => props.rules);
const customFieldName = computed(() => props.customFieldName ?? {});
const customValidatorErrorMessage = computed(
  () => props.customValidatorErrorMessage ?? {}
);
const composableForm = useForm();
const form = computed(() => {
  return composableForm.getForm(formName.value);
});
const customRules = computed(() => {
  return composableForm.getCustomRules();
});
const formValidatorErrorMessage = computed(() => {
  if (form.value && form.value.validator) {
    return form.value.validator.getCustomValidatorErrorMessage();
  }
  return {};
});

// Add form & set initial form rules
onBeforeMount(() => {
  composableForm.addForm(formName.value);
  composableForm.setFormRules(formName.value, rules.value);
  composableForm.setCustomFieldNames(formName.value, customFieldName.value);
  composableForm.setCustomValidatorErrorMessage(
    formName.value,
    customValidatorErrorMessage.value
  );
});

// Update validator rules whenever rules change
watch(rules, (value) => {
  composableForm.setFormRules(formName.value, value);
});

// Update customFieldNames whenever it changes
watch(customFieldName, (value) => {
  composableForm.setCustomFieldNames(formName.value, value);
});

// Update customValidatorErrorMessage whenever it changes
watch(customValidatorErrorMessage, (value) => {
  composableForm.setCustomValidatorErrorMessage(formName.value, value);
});

// Provide form name to be injected by form child components
provide("formName", formName.value);
provide("rules", rules);
provide("customFieldName", customFieldName);
provide("customValidatorErrorMessage", formValidatorErrorMessage);
provide("customRules", customRules);

// Expose validator whenever needed by enduser to use
function validator() {
  if (form.value) {
    return form.value.validator;
  }
  return form.value;
}
defineExpose({ validator });
</script>

<template>
  {{ formValidatorErrorMessage }}
  <form v-bind="$attrs" @submit.prevent="emit('submit')">
    <slot></slot>
  </form>
</template>
