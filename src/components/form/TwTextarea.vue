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
  <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
    {{ label }}
  </label>
  <textarea
    v-bind="$attrs"
    v-model="computedValue"
    :data-error="isError"
    class="block transition ease-in-out border p-2 relative text-sm w-full rounded bg-white h-10 placeholder:italic text-gray-600 dark:text-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-0 focus:outline-none focus:border-transparent focus:shadow-[0_0_0_0.2rem_rgb(0_123_255_/_25%)] error:border-red-400 error:border error:focus:shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);] dark:error:border-red-400 dark:error:border dark:error:focus:shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);] disabled:bg-gray-100 disabled:cursor-not-allowed"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>
