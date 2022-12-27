<script setup lang="ts">
import type { DropdownItem, DropdownItemValue } from "../type";
import { computed, ref } from "vue";
import TwDropdownSelect from "./TwSelect.vue";

export interface Props {
  placeholder?: string;
  items: Array<DropdownItem>;
  modelValue: readonly DropdownItemValue[];
  closeOnSelect?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  closeOnSelect: false,
});

const emit = defineEmits(["update:modelValue"]);

const dropdownSelect = ref();
const search = ref();

const filterredItems = computed(() => {
  return props.items.filter(({ label }) => {
    if (!search.value) return true;
    return label.toLowerCase().includes(search.value.toLowerCase());
  });
});

const updateValue = (value: DropdownItemValue) => {
  const tempValue: DropdownItemValue[] = [];
  props.modelValue.forEach((v: DropdownItemValue) => tempValue.push(v));
  if (tempValue.includes(value)) tempValue.splice(tempValue.indexOf(value), 1);
  else tempValue.push(value);
  emit("update:modelValue", tempValue);
  closeDropdown();
};

const removeSelectedValue = (value: DropdownItemValue) => {
  updateValue(value);
};

const clearData = () => {
  emit("update:modelValue", []);
  closeDropdown();
};

const closeDropdown = () => {
  if (props.closeOnSelect) dropdownSelect.value.closeDropdown();
};
</script>

<template>
  <div>
    <TwDropdownSelect
      ref="dropdownSelect"
      :rounded="true"
      :fixed-height="false"
      @clear-data="clearData"
    >
      <template #body>
        <div v-if="modelValue.length > 0" class="p-2 text-left flex gap-1">
          <div
            v-for="v in modelValue"
            :key="v"
            class="inline-block border dark:border-gray-700 dark:bg-gray-800 rounded overflow-hidden dark:text-gray-200"
          >
            <div class="flex items-center gap-2">
              <div
                class="text-xs rounded text-gray-800 dark:text-gray-200 p-1 bg-white dark:bg-gray-800 h-full w-full"
              >
                {{ v }}
              </div>
              <div
                class="cursor-pointer bg-gray-200 dark:bg-gray-900 p-1 w-5 h-full"
                @click.stop="removeSelectedValue(v)"
              >
                &#10005;
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-2 text-gray-400 italic text-left">
          {{ placeholder }}
        </div>
      </template>
      <template #list>
        <div class="w-full p-2">
          <input
            v-model="search"
            class="block w-full rounded text-gray-600 text-xs focus:border-transparent focus:ring-0 focus:outline-none p-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            type="text"
            placeholder="Type something"
          />
        </div>
        <div class="max-h-52 overflow-y-auto">
          <template v-if="filterredItems.length > 0">
            <button
              v-for="item in filterredItems"
              :key="'dropdown-' + item.value"
              class="p-3 cursor-pointer w-full text-sm select-none transition-all duration-300 ease-in-out text-left"
              :class="{
                'bg-gray-800 text-white': modelValue.includes(item.value),
                'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300':
                  !modelValue.includes(item.value),
              }"
              @click="updateValue(item.value)"
            >
              {{ item.label }}
            </button>
          </template>
          <template v-else>
            <div
              class="p-3 w-full text-sm text-center overflow-hidden break-words"
            >
              No matching data for key "{{ search }}"
            </div>
          </template>
        </div>
      </template>
    </TwDropdownSelect>
  </div>
</template>