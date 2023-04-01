<script lang="ts">
export default defineComponent({
  name: "TwDropdownMenu",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { DropdownAlign } from "../../type";
import { computed, ref, onMounted, onUnmounted, defineComponent } from "vue";

export interface Props {
  align: DropdownAlign;
  contentClass?: string;
}
const props = defineProps<Props>();

const alignClass: Record<DropdownAlign, string> = {
  ["left"]: "vt-origin-top-left vt-left-0",
  ["right"]: "vt-origin-top-right vt-right-0",
};

const alignmentClasses = computed(() => {
  return alignClass[props.align ?? "left"];
});

const isOpen = ref(false);

function closeOnEscape(e: KeyboardEvent) {
  if (isOpen.value && e.key === "Escape") isOpen.value = false;
}

onMounted(() => {
  document.addEventListener("keydown", closeOnEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", closeOnEscape);
});
</script>

<template>
  <div class="vt-relative vt-inline-block">
    <div class="vt-inline-block" @click="isOpen = !isOpen">
      <slot name="trigger" />
    </div>
    <div
      v-show="isOpen"
      class="vt-fixed vt-inset-0 z-40"
      @click="isOpen = false"
    />
    <transition
      enter-active-class="vt-transition vt-ease-out vt-duration-200"
      enter-from-class="vt-transform vt-opacity-0 vt-scale-95"
      enter-to-class="vt-transform vt-opacity-100 vt-scale-100"
      leave-active-class="vt-transition vt-ease-in vt-duration-75"
      leave-from-class="vt-transform vt-opacity-100 vt-scale-100"
      leave-to-class="vt-transform vt-opacity-0 vt-scale-95"
    >
      <div
        v-show="isOpen"
        class="vt-absolute vt-z-50 vt-mt-2 vt-rounded-md vt-shadow-lg vt-w-48 vt-overflow-hidden"
        :class="[alignmentClasses]"
        style="display: none"
        @click="isOpen = false"
      >
        <div
          class="vt-rounded-md vt-ring-1 vt-ring-black vt-ring-opacity-5 vt-bg-white dark:vt-bg-gray-800"
          :class="contentClass"
        >
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>
