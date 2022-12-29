<script lang="ts">
export default {
  name: "TwSelectionList",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { DropdownItem } from "../type";
import { computed, ref } from "vue";
import TwSelect from "./TwSelect.vue";

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
    <TwSelect
      ref="dropdownSelect"
      :rounded="true"
      :disabled="disabled"
      @clear-data="updateValue(null)"
    >
      <template #bodyText="{ isOpen }">
        <slot :is-open="isOpen" :model-value="modelValue">
          <div v-if="modelValue" class="p-2 text-left dark:text-gray-200">
            {{ valueText }}
          </div>
          <div v-else class="p-2 text-gray-400 italic text-left">
            {{ placeholder }}
          </div>
        </slot>
      </template>
      <template #list="{ isOpen }">
        <slot
          name="dropdownList"
          :is-open="isOpen"
          :update-value="updateValue"
          :model-value="modelValue"
        >
          <transition
            enter-from-class="transform opacity-0 scale-95"
            enter-active-class="transition ease-out duration-200"
            enter-to-class="transform opacity-100 scale-100"
            leave-from-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isOpen"
              class="absolute bg-white dark:bg-gray-900 w-full z-10 shadow-lg rounded-b overflow-hidden border border-t-0 border-gray-100 dark:border-gray-700"
            >
              <div class="w-full p-2">
                <input
                  v-model="search"
                  class="block w-full rounded text-gray-600 dark:text-gray-300 text-xs p-3 bg-gray-100 dark:bg-gray-700"
                  type="text"
                  placeholder="Type something"
                />
              </div>
              <ul class="max-h-52 overflow-y-auto">
                <template v-if="items.length === 0">
                  <li
                    class="p-3 w-full text-sm text-center overflow-hidden break-words"
                  >
                    No Data
                  </li>
                </template>
                <template v-else-if="filterredItems.length > 0">
                  <li
                    v-for="item in filterredItems"
                    :key="'dropdown-' + item.value"
                  >
                    <a
                      class="p-3 cursor-pointer w-full text-sm text-left block"
                      :class="{
                        'bg-gray-800 dark:bg-gray-700 text-white':
                          modelValue === item.value,
                        'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-400':
                          modelValue !== item.value,
                      }"
                      href="#"
                      @click.prevent="updateValue(item.value)"
                    >
                      {{ item.label }}
                    </a>
                  </li>
                </template>
                <template v-else>
                  <li
                    class="p-3 w-full text-sm text-center overflow-hidden break-words"
                  >
                    No matching data for key "{{ search }}"
                  </li>
                </template>
              </ul>
            </div>
          </transition>
        </slot>
      </template>
    </TwSelect>
  </div>
</template>
