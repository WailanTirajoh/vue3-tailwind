<script setup lang="ts">
export type Option = {
  label: string;
  value: any;
};
export interface Props {
  label: string;
  id: string;
  modelValue?: string | number;
  type?: string;
  disabled?: boolean;
  options: Option[];
}
withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="">
    <label class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <label
      :for="`${option.label}-${id}`"
      v-for="option in options"
      :key="`${option.label}-${id}`"
      class="font-bold text-gray-700 dark:text-gray-400 block"
    >
      <input
        type="radio"
        :name="id"
        :value="option.value"
        :id="`${option.label}-${id}`"
        :disabled="disabled"
        :checked="option.value === modelValue"
        @input="emit('update:modelValue', option.value)"
      />
      {{ option.label }}
    </label>
  </div>
</template>