<script lang="ts">
export default defineComponent({
  name: "TwSelect",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { defineComponent, inject, ref } from "vue";
import { TwButton } from "..";
export interface Props {
  rounded?: boolean;
  showClearData?: boolean;
  dropdownBg?: string;
  dropdownBorder?: string;
  fixedHeight?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  rounded: false,
  showClearData: true,
  dropdownBg: "bg-gray-100",
  dropdownBorder: "",
  fixedHeight: true,
  disabled: false,
});

const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

function openDropdown() {
  isOpen.value = false;
}

const selectError = inject("select-error", false);

defineExpose({ toggleDropdown, closeDropdown, openDropdown });
</script>

<template>
  <div class="relative">
    <slot :is-open="isOpen">
      <div
        class="flex rounded-t dark:text-gray-300 error:border error:border-red-400 rounded"
        :data-error="selectError"
        :class="{
          'bg-white shadow-lg dark:bg-gray-900 border border-b-0 border-gray-100 dark:border-gray-700':
            isOpen,
        }"
      >
        <div
          class="flex items-center justify-between text-gray-700 w-full text-sm border-r-0 rounded-l h-10 cursor-pointer"
          :class="{
            'bg-white border dark:bg-gray-800 dark:border-gray-700': !isOpen,
            'rounded-l-md': !rounded,
            'bg-gray-100': disabled,
          }"
          @click="toggleDropdown"
        >
          <slot name="bodyText" :is-open="isOpen" />
          <slot
            name="bodyClearButton"
            :show-clear-data="showClearData"
            :disabled="disabled"
          >
            <TwButton
              type="button"
              variant="none"
              v-show="showClearData"
              class="flex items-center hover:bg-gray-200 dark:hover:bg-gray-900 rounded-full justify-center transition-all ease-in-out p-2"
              :disabled="disabled"
              @click.stop="$emit('clear-data')"
              aria-label="clear-data"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path
                  d="M4.97917 3.99992L7.22917 1.77075C7.35417 1.64575 7.35417 1.41659 7.22917 1.29159L6.70833 0.770752C6.58333 0.645752 6.35417 0.645752 6.22917 0.770752L4 3.02075L1.75 0.770752C1.625 0.645752 1.39583 0.645752 1.27083 0.770752L0.75 1.29159C0.625 1.41659 0.625 1.64575 0.75 1.77075L3 3.99992L0.75 6.24992C0.625 6.37492 0.625 6.60408 0.75 6.72908L1.27083 7.24992C1.39583 7.37492 1.625 7.37492 1.75 7.24992L4 4.99992L6.22917 7.24992C6.35417 7.37492 6.58333 7.37492 6.70833 7.24992L7.22917 6.72908C7.35417 6.60408 7.35417 6.37492 7.22917 6.24992L4.97917 3.99992Z"
                  fill="#BDBDBD"
                />
              </svg>
            </TwButton>
          </slot>
        </div>
        <slot
          name="bodyDropdownButton"
          :is-open="isOpen"
          :disabled="disabled"
          :toggle-dropdown="toggleDropdown"
        >
          <TwButton
            type="button"
            variant="none"
            aria-label="dropdown-select-button"
            class="p-1 px-3 flex items-center justify-center cursor-pointer transition-colors !rounded-r !rounded-l-none"
            :class="[
              !isOpen ? dropdownBg : '',
              dropdownBorder,
              {
                'border hover:bg-gray-200 shadow-none bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900':
                  !isOpen,
                'rounded-r-md': !rounded,
              },
            ]"
            :disabled="disabled"
            @click="toggleDropdown"
          >
            <div
              class="transition-all"
              :class="{
                'rotate-180': isOpen,
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="5"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M9.52051 1.16667L9.12467 0.75C9.02051 0.645833 8.85384 0.645833 8.77051 0.75L4.99967 4.52083L1.20801 0.75C1.12467 0.645833 0.958008 0.645833 0.853841 0.75L0.458008 1.16667C0.353841 1.25 0.353841 1.41667 0.458008 1.52083L4.81217 5.875C4.91634 5.97917 5.06217 5.97917 5.16634 5.875L9.52051 1.52083C9.62467 1.41667 9.62467 1.25 9.52051 1.16667Z"
                  fill="#757575"
                />
              </svg>
            </div>
          </TwButton>
        </slot>
      </div>
    </slot>
    <div class="relative">
      <slot name="list" :is-open="isOpen" />
    </div>
  </div>
</template>

<style scoped>
.min-h-10 {
  min-height: 2.5rem;
}
</style>
