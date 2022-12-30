<script lang="ts">
export default {
  name: "TwMultiSelect",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { DropdownItem, DropdownItemValue } from "../type";

import { ref } from "vue";
import MultiSelectionList from "../select/TwMultiSelectionList.vue";

export interface Props {
  modelValue: Array<DropdownItemValue>;
  items: Array<DropdownItem>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
});

const inputData = ref(props.modelValue);
</script>

<template>
  <div>
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-200">
      {{ label }}
    </label>
    <div class="relative">
      <MultiSelectionList
        v-bind="$attrs"
        v-model="inputData"
        :items="items"
        :placeholder="props.placeholder"
        :disabled="disabled"
        @update:modelValue="$emit('update:modelValue', inputData)"
      />
      <div
        v-if="disabled"
        class="w-full h-full absolute top-0 left-0 rounded bg-gray-100 bg-opacity-5 cursor-not-allowed"
      ></div>
    </div>
  </div>
</template>
