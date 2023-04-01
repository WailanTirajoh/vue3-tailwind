<script lang="ts">
export default defineComponent({
  name: "TwToast",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { Toast } from "../../type";
import { computed, defineComponent, ref } from "vue";
import TwToastItem from "./TwToastItem.vue";

export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "";
export interface Props {
  toasts: Array<Toast | never>;
  position?: Position;
  wrapperClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  position: "top-right",
});

const position = ref(props.position);

const classPosition = computed(() => {
  if (props.position === "bottom-left") {
    return "vt-mr-auto vt-bottom-4 vt-ml-4";
  }
  if (props.position === "bottom-right") {
    return "vt-ml-auto vt-bottom-4 vt-mr-4";
  }
  if (props.position === "top-right") {
    return "vt-ml-auto vt-top-4 vt-mr-4";
  }
  if (props.position === "top-left") {
    return "vt-ml-auto vt-top-4 vt-ml-4";
  }
  return "";
});
</script>

<template>
  <Teleport to="body">
    <transition-group
      tag="ul"
      name="list"
      class="vt-w-80 vt-fixed vt-inset-x-0 vt-z-50 vt-grid vt-gap-2 vt-break-words vt-pt-3 vt-px-4"
      :class="[classPosition, position, wrapperClass]"
      style="overflow-wrap: anywhere"
      appear
    >
      <slot
        name="toast"
        :toasts="toasts"
        :classes="[classPosition, position, wrapperClass]"
      >
        <tw-toast-item
          v-for="toast in props.toasts"
          :id="toast?.id"
          :key="`toast-${toast.id}`"
          class="vt-w-full"
          :message="toast.message"
          :type="toast.type"
          :lifetime="toast.lifetime"
          :json-message="toast.jsonMessage"
          :html="toast.html"
          :title="toast.title"
        />
      </slot>
    </transition-group>
  </Teleport>
</template>

<style scoped>
/* Bottom Right */
.bottom-right .list-move,
.bottom-right .list-enter-active,
.bottom-right .list-leave-active {
  transition: all 0.5s ease;
}

.bottom-right .list-enter-from,
.bottom-right .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.bottom-right .list-leave-active {
  position: absolute;
}

/* Bottom Left */
.bottom-left .list-move,
.bottom-left .list-enter-active,
.bottom-left .list-leave-active {
  transition: all 0.5s ease;
}

.bottom-left .list-enter-from,
.bottom-left .list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.bottom-left .list-leave-active {
  position: absolute;
}

/* Top Right */
.top-right .list-move,
.top-right .list-enter-active,
.top-right .list-leave-active {
  transition: all 0.5s ease;
}

.top-right .list-enter-from,
.top-right .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.top-right .list-leave-active {
  position: absolute;
}

/* Top Left */
.top-left .list-move,
.top-left .list-enter-active,
.top-left .list-leave-active {
  transition: all 0.5s ease;
}

.top-left .list-enter-from,
.top-left .list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.top-left .list-leave-active {
  position: absolute;
}
</style>
