<script>
export default {
  name: "TwDropdownMenu",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { DropdownAlign } from "../type";
import { computed, ref, onMounted, onUnmounted } from "vue";

export interface Props {
  align: DropdownAlign;
  contentClass?: string;
}
const props = defineProps<Props>();

const alignmentClasses = computed(() => {
  const align: Record<DropdownAlign, string> = {
    ["left"]: "origin-top-left left-0",
    ["right"]: "origin-top-right right-0",
  };
  return align[props.align ?? "left"];
});

const isOpen = ref(false);

const closeOnEscape = (e: KeyboardEvent) => {
  if (isOpen.value && e.key === "Escape") isOpen.value = false;
};
onMounted(() => {
  document.addEventListener("keydown", closeOnEscape);
});
onUnmounted(() => {
  document.removeEventListener("keydown", closeOnEscape);
});
</script>

<template>
  <div class="relative inline-block">
    <div class="inline-block" @click="isOpen = !isOpen">
      <slot name="trigger" />
    </div>
    <div v-show="isOpen" class="fixed inset-0 z-40" @click="isOpen = false" />
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="isOpen"
        class="absolute z-50 mt-4 rounded-md shadow-lg w-48 overflow-hidden"
        :class="[alignmentClasses]"
        style="display: none"
        @click="isOpen = false"
      >
        <div
          class="rounded-md ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800"
          :class="contentClass"
        >
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>
