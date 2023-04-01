<script lang="ts">
export default defineComponent({
  name: "TwDatatableLoading",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { defineComponent } from "vue";
import TwDatatableCircleSpinner from "./TwDatatableCircleSpinner.vue";

export interface Props {
  show?: boolean;
}
withDefaults(defineProps<Props>(), {
  show: false,
});
</script>

<template>
  <transition
    enter-active-class="vt-transition vt-ease-out vt-duration-200"
    enter-class="vt-transform vt-opacity-0 vt-scale-95"
    enter-to-class="vt-transform vt-opacity-100 vt-scale-100"
    leave-active-class="vt-transition vt-ease-in vt-duration-75"
    leave-class="vt-transform vt-opacity-100 vt-scale-100"
    leave-to-class="vt-transform vt-opacity-0 vt-scale-95"
  >
    <div
      v-if="show"
      class="vt-text-xs vt-absolute vt-top-1/3 vt-left-1/2 vt-grid vt-gap-3 vt-z-10 vt-p-4"
    >
      <div class="vt-flex vt-justify-center">
        <div
          class="vt-rounded-full vt-glassmorphism vt-w-14 vt-h-14 vt-flex vt-items-center vt-justify-center"
        >
          <TwDatatableCircleSpinner />
        </div>
      </div>
      <div class="vt-text-center vt-text-gray-900">Please Wait</div>
    </div>
  </transition>
</template>
