<script setup lang="ts">
import type { DropdownItem } from "../type";
import { computed, ref } from "vue";
import TwDropdownSelect from "./TwSelect.vue";

export interface Props {
  placeholder?: string;
  items: Array<DropdownItem>;
  modelValue?: string | number | null;
  closeOnSelect?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  closeOnSelect: false,
  disabled: false,
});

const emit = defineEmits(["click", "update:modelValue"]);

const search = ref();
const dropdownSelect = ref();

const filterredItems = computed(() => {
  return props.items.filter((item) => {
    if (!search.value) return true;
    return item.label.toLowerCase().includes(search.value.toLowerCase());
  });
});
const valueText = computed(() => {
  const index = props.items.findIndex(
    (item) => item.value === props.modelValue
  );
  if (index > -1) {
    return props.items[index].label;
  }
  return "";
});

const updateValue = (value: any) => {
  emit("update:modelValue", value);
  if (props.closeOnSelect) dropdownSelect.value.closeDropdown();
};
</script>

<template>
  <div>
    <TwDropdownSelect
      ref="dropdownSelect"
      :rounded="true"
      :disabled="disabled"
      @clear-data="updateValue(null)"
    >
      <template #body>
        <div v-if="modelValue" class="p-2 text-left dark:text-gray-200">
          {{ valueText }}
        </div>
        <div v-else class="p-2 text-gray-400 italic text-left">
          {{ placeholder }}
        </div>
      </template>
      <template #list>
        <div class="w-full p-2">
          <input
            v-model="search"
            class="block w-full rounded text-gray-600 dark:text-gray-300 text-xs focus:border-transparent focus:ring-0 focus:outline-none p-3 bg-gray-100 dark:bg-gray-700"
            type="text"
            placeholder="Type something"
          />
        </div>
        <div class="max-h-52 overflow-y-auto">
          <template v-if="items.length === 0">
            <button
              class="p-3 w-full text-sm text-center overflow-hidden break-words"
            >
              No Data
            </button>
          </template>
          <template v-else-if="filterredItems.length > 0">
            <button
              v-for="item in filterredItems"
              :key="'dropdown-' + item.value"
              class="p-3 cursor-pointer w-full text-sm text-left"
              :class="{
                'bg-gray-800 dark:bg-gray-700 text-white':
                  modelValue === item.value,
                'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-400':
                  modelValue !== item.value,
              }"
              @click="updateValue(item.value)"
            >
              {{ item.label }}
            </button>
          </template>
          <template v-else>
            <button
              class="p-3 w-full text-sm text-center overflow-hidden break-words"
            >
              No matching data for key "{{ search }}"
            </button>
          </template>
        </div>
      </template>
    </TwDropdownSelect>
  </div>
</template>
