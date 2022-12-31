<script lang="ts">
export default {
  name: "TwForm",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { computed, onBeforeMount, provide } from "vue";
import { useForm } from "../../composables/form";
import { generateId } from "../../utils/generateId";
import type { ValidationRules } from "js-formdata-validator/dist/type";
const props = defineProps<{
  name?: string;
  rules: ValidationRules;
}>();

const formName = computed(() => props.name ?? generateId());

provide("formName", formName.value);

const composableForm = useForm();

const form = computed(() => {
  return composableForm.getForm(formName.value);
});

const emit = defineEmits(["submit"]);

const validator = () => {
  return form.value.validator;
};

defineExpose({ validator });

onBeforeMount(() => {
  composableForm.addForm(formName.value);
  composableForm.setFormRules(formName.value, props.rules);
});
</script>

<template>
  <form v-bind="$attrs" @submit.prevent="emit('submit')">
    <slot></slot>
  </form>
</template>
