<script lang="ts">
export default defineComponent({
  name: "TwSelectionList",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { DropdownItem } from "../../type";
import { computed, defineComponent, ref } from "vue";
import TwSelect from "./TwSelect.vue";
import { TwInput } from "..";

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

function updateValue(value: any) {
  emit("update:modelValue", value);
  if (props.closeOnSelect) dropdownSelect.value.closeDropdown();
}
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
          <div
            v-if="modelValue"
            class="vt-p-2 vt-text-left dark:vt-text-gray-200"
          >
            {{ valueText }}
          </div>
          <div v-else class="vt-p-2 vt-text-gray-400 vt-italic vt-text-left">
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
            enter-from-class="vt-transform vt-opacity-0 vt-scale-95"
            enter-active-class="vt-transition vt-ease-out vt-duration-200"
            enter-to-class="vt-transform vt-opacity-100 vt-scale-100"
            leave-from-class="vt-transform vt-opacity-100 vt-scale-100"
            leave-active-class="vt-transition vt-ease-in vt-duration-75"
            leave-to-class="vt-transform vt-opacity-0 vt-scale-95"
          >
            <div
              v-if="isOpen"
              class="vt-absolute vt-bg-white dark:vt-bg-gray-900 vt-w-full vt-z-10 vt-shadow-lg vt-rounded-b vt-overflow-hidden vt-border vt-border-t-0 vt-border-gray-100 dark:vt-border-gray-700"
            >
              <div class="vt-w-full vt-p-2">
                <TwInput
                  v-model="search"
                  type="text"
                  placeholder="Type something"
                />
              </div>
              <ul class="vt-max-h-52 vt-overflow-y-auto">
                <template v-if="items.length === 0">
                  <li
                    class="vt-p-3 vt-w-full vt-text-sm vt-text-center vt-overflow-hidden vt-break-words"
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
                      class="vt-block vt-p-3 vt-cursor-pointer vt-w-full vt-text-sm vt-select-none vt-transition-all vt-duration-300 vt-ease-in-out vt-text-left focus:vt-bg-gray-600 focus:vt-text-gray-100 focus:vt-outline-gray-700 vt-ring-0 vt-outline-none focus:vt-border-transparent focus:vt-shadow-[0_0_0_0.2rem_rgb(0_123_255_/_25%)]"
                      :class="{
                        'vt-bg-gray-800 dark:vt-bg-gray-700 vt-text-white':
                          modelValue === item.value,
                        'hover:vt-bg-gray-100 dark:hover:vt-bg-gray-800 vt-text-gray-700 dark:vt-text-gray-400':
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
                    class="vt-p-3 vt-w-full vt-text-sm vt-text-center vt-overflow-hidden vt-break-words"
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
