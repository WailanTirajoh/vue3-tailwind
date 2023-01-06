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
import type { ValidationRules } from "js-formdata-validator/dist/type";

const props = defineProps<{
  name?: string;
  rules: ValidationRules;
}>();

const emit = defineEmits(["submit"]);

const formName = computed(() => props.name ?? generateId());
const rules = computed(() => props.rules);
const composableForm = useForm();
const form = computed(() => {
  return composableForm.getForm(formName.value);
});

// Add form & set initial form rules
onBeforeMount(() => {
  composableForm.addForm(formName.value);
  composableForm.setFormRules(formName.value, rules.value);
});

// Update validator rules whenever rules change
watch(rules, (value) => {
  composableForm.setFormRules(formName.value, value);
});

// Provide form name to be injected by form child components
provide("formName", formName.value);

function validator() {
  if (form.value) {
    return form.value.validator;
  }
  return form.value;
}
defineExpose({ validator });
</script>

<template>
  <form v-bind="$attrs" @submit.prevent="emit('submit')">
    <slot></slot>
  </form>
</template>
