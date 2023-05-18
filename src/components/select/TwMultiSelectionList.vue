<script lang="ts">
export default defineComponent({
  name: "TwMultiSelectionList",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { DropdownItem, DropdownItemValue } from "../../type";
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

function forceCloseDropdown() {
  dropdownSelect.value.closeDropdown();
}
</script>

<template>
  <div v-click-outside="forceCloseDropdown">
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
            <TransitionGroup name="list" appear>
              <li
                v-for="v in computedModelValue"
                :key="v"
                class="vt-inline-block vt-border dark:vt-border-gray-700 dark:vt-bg-gray-800 vt-rounded vt-overflow-hidden dark:vt-text-gray-200"
              >
                <div class="vt-flex vt-items-center vt-gap-2">
                  <div
                    class="vt-text-xs vt-rounded vt-text-gray-800 dark:vt-text-gray-200 vt-p-1 vt-bg-white dark:vt-bg-gray-800 vt-h-full vt-w-full"
                  >
                    {{ v }}
                  </div>
                  <TwButton
                    type="button"
                    variant="none"
                    class="vt-cursor-pointer vt-bg-gray-200 dark:vt-bg-gray-900 !vt-p-1 vt-w-5 vt-h-full vt-rounded-none vt-flex vt-items-center vt-justify-center"
                    @click.stop="removeSelectedValue(v)"
                  >
                    &#10005;
                  </TwButton>
                </div>
              </li>
            </TransitionGroup>
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
          :model-value="computedModelValue"
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
                <template v-if="filterredItems.length > 0">
                  <li
                    v-for="item in filterredItems"
                    :key="'dropdown-' + item.value"
                  >
                    <a
                      class="vt-block vt-p-3 vt-cursor-pointer vt-w-full vt-text-sm vt-select-none vt-transition-all vt-duration-300 vt-ease-in-out vt-text-left focus:vt-bg-gray-600 focus:vt-text-gray-100 focus:vt-outline-gray-700 vt-ring-0 vt-outline-none focus:vt-border-transparent focus:vt-shadow-[0_0_0_0.2rem_rgb(0_123_255_/_25%)]"
                      :class="{
                        'vt-bg-gray-800 vt-text-white':
                          computedModelValue.includes(item.value),
                        'hover:vt-bg-gray-100 dark:hover:vt-bg-gray-800 vt-text-gray-700 dark:vt-text-gray-300':
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
