<script lang="ts">
export default {
  name: "TwErrorMessage",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { useForm } from "../../composables/form";
import { computed, inject } from "vue";

export interface Props {
  name: string;
}
const props = defineProps<Props>();
const formName = inject("formName") as string;

const composableForm = useForm();
const errors = computed(() => {
  return composableForm.getErrors(formName, props.name);
});
</script>

<template>
  <div v-bind="$attrs" class="text-red-400 text-sm italic" v-if="errors">
    {{ errors.join(", ") }}
  </div>
</template>
