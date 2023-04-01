<script lang="ts">
export default defineComponent({
  name: "TwTextarea",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { computed, defineComponent } from "vue";
import { useFormValidator } from "@/composables/formValidator";

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

const { isError } = useFormValidator({
  fieldName: props.name,
  fieldValue: computedValue,
});
</script>

<template>
  <label
    v-if="label"
    class="vt-font-bold vt-text-gray-700 dark:vt-text-gray-400"
  >
    {{ label }}
  </label>
  <textarea
    v-bind="$attrs"
    v-model="computedValue"
    :data-error="isError"
    class="vt-block vt-transition vt-ease-in-out vt-border vt-p-2 vt-relative vt-text-sm vt-w-full vt-rounded vt-bg-white vt-h-10 placeholder:vt-italic vt-text-gray-600 dark:vt-text-gray-200 dark:vt-border-gray-700 dark:vt-bg-gray-800 vt-outline-primary error:vt-border-red-400 error:vt-border error:focus:vt-shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);] dark:error:vt-border-red-400 dark:error:vt-border dark:error:focus:vt-shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);] disabled:vt-bg-gray-100 disabled:vt-cursor-not-allowed"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>
