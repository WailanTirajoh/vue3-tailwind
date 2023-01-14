<script lang="ts">
export default defineComponent({
  name: "TwMultiSelectionList",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { DropdownItem, DropdownItemValue } from "../type";
import { computed, defineComponent, ref } from "vue";
import TwSelect from "./TwSelect.vue";
import { TwButton, TwInput } from "..";

export interface Props {
  placeholder?: string;
  items: Array<DropdownItem>;
  modelValue?: Array<any>;
  closeOnSelect?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  closeOnSelect: false,
  modelValue: () => [],
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

const computedModelValue = computed(() => props.modelValue ?? []);

function updateValue(value: DropdownItemValue) {
  const tempValue: DropdownItemValue[] = [];
  computedModelValue.value.forEach((v: DropdownItemValue) => tempValue.push(v));
  if (tempValue.includes(value)) tempValue.splice(tempValue.indexOf(value), 1);
  else tempValue.push(value);
  emit("update:modelValue", tempValue);
  closeDropdown();
}

function removeSelectedValue(value: DropdownItemValue) {
  updateValue(value);
}

function clearData() {
  emit("update:modelValue", []);
  closeDropdown();
}

function closeDropdown() {
  if (props.closeOnSelect) dropdownSelect.value.closeDropdown();
}
</script>

<template>
  <div>
    <TwSelect
      ref="dropdownSelect"
      :rounded="true"
      :fixed-height="false"
      @clear-data="clearData"
    >
      <template #bodyText="{ isOpen }">
        <slot
          :model-value="computedModelValue"
          :remove-selected-value="removeSelectedValue"
          :is-open="isOpen"
        >
          <div
            v-if="computedModelValue.length > 0"
            class="p-2 text-left flex gap-1"
          >
            <TransitionGroup
              as="ul"
              name="list"
              class="w-80 fixed inset-x-0 z-50 grid gap-2 break-words pt-3 px-4"
              style="overflow-wrap: anywhere"
              appear
            >
              <li
                v-for="v in computedModelValue"
                :key="v"
                class="inline-block border dark:border-gray-700 dark:bg-gray-800 rounded overflow-hidden dark:text-gray-200"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="text-xs rounded text-gray-800 dark:text-gray-200 p-1 bg-white dark:bg-gray-800 h-full w-full"
                  >
                    {{ v }}
                  </div>
                  <TwButton
                    type="button"
                    variant="none"
                    class="cursor-pointer bg-gray-200 dark:bg-gray-900 !p-1 w-5 h-full rounded-none flex items-center justify-center"
                    @click.stop="removeSelectedValue(v)"
                  >
                    &#10005;
                  </TwButton>
                </div>
              </li>
            </TransitionGroup>
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
          :model-value="computedModelValue"
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
                <TwInput
                  v-model="search"
                  type="text"
                  placeholder="Type something"
                />
              </div>
              <ul class="max-h-52 overflow-y-auto">
                <template v-if="filterredItems.length > 0">
                  <li
                    v-for="item in filterredItems"
                    :key="'dropdown-' + item.value"
                  >
                    <a
                      class="block p-3 cursor-pointer w-full text-sm select-none transition-all duration-300 ease-in-out text-left focus:bg-gray-600 focus:text-gray-100 focus:outline-gray-700"
                      :class="{
                        'bg-gray-800 text-white': computedModelValue.includes(
                          item.value
                        ),
                        'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300':
                          !computedModelValue.includes(item.value),
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

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-leave-active {
  position: absolute;
}
</style>
