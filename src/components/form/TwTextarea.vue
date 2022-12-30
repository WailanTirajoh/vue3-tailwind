<script lang="ts">
export default {
  name: "TwTextarea",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref } from "vue";

export interface Props {
  label: string;
  placeholder?: string;
  modelValue?: string | number;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  placeholder: "",
});
const emit = defineEmits(["update:modelValue"]);
const inputData = ref(props.modelValue);
</script>

<template>
  <div class="">
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <textarea
      v-bind="$attrs"
      v-model="inputData"
      class="block transition duration-300 ease-in-out border p-2 relative text-sm w-full focus:ring-0 focus:outline-none focus:shadow rounded bg-white dark:bg-gray-800 dark:border-gray-700"
      :class="{
        'bg-gray-100 cursor-not-allowed': disabled,
      }"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="emit('update:modelValue', inputData)"
    />
  </div>
</template>
