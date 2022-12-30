<script lang="ts">
export default {
  name: "TwSelect",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { DropdownItem } from "../type";
import SelectionList from "../select/TwSelectionList.vue";

export interface Props {
  modelValue?: string | number | null;
  label?: string;
  placeholder?: string;
  items: Array<DropdownItem>;
  disabled?: boolean;
}
withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: "",
  modelValue: () => "",
});
</script>

<template>
  <div>
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <div class="relative">
      <SelectionList
        v-bind="$attrs"
        :model-value="modelValue"
        :items="items"
        :placeholder="placeholder"
        :close-on-select="true"
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
