<script lang="ts">
export default {
  name: "TwMultiSelect",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { DropdownItem, DropdownItemValue } from "../type";
import MultiSelectionList from "../select/TwMultiSelectionList.vue";

export interface Props {
  modelValue: Array<DropdownItemValue> | null;
  items: Array<DropdownItem>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}
withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
});
</script>

<template>
  <div>
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-200">
      {{ label }}
    </label>
    <div class="relative">
      <MultiSelectionList
        v-bind="$attrs"
        :model-value="modelValue"
        :items="items"
        :placeholder="placeholder"
        :disabled="disabled"
        @update:modelValue="(value) => $emit('update:modelValue', value)"
      />
      <div
        v-if="disabled"
        class="w-full h-full absolute top-0 left-0 rounded bg-gray-100 bg-opacity-5 cursor-not-allowed"
      ></div>
    </div>
  </div>
</template>
