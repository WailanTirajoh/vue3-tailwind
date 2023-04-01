<script lang="ts">
export default defineComponent({
  name: "TwOffcanvas",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { OffcanvasPosition } from "../../type";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { TwFeather } from "@/components";

export interface Props {
  position?: OffcanvasPosition;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  position: "right",
});

const emit = defineEmits(["on-close", "on-open", "backdrop-click"]);

const isOpen = ref(false);

const height = computed(() => {
  if (["right", "left"].includes(props.position)) {
    return props.height;
  }
  return props.height ?? "500px";
});

const width = computed(() => {
  if (["right", "left"].includes(props.position)) {
    return props.width ?? "400px";
  }
  return props.width ?? "100%";
});

const classMap: Record<OffcanvasPosition, string> = {
  ["right"]: "vt-top-0 vt-right-0",
  ["top"]: "vt-left-0 vt-top-0",
  ["bottom"]: "vt-left-0 vt-bottom-0",
  ["left"]: "vt-top-0 vt-left-0",
};

const classPosition = computed(() => classMap[props.position]);

function openOffCanvas() {
  isOpen.value = true;
}
function closeOffCanvas() {
  isOpen.value = false;
}
function toggleOffCanvas() {
  isOpen.value = !isOpen.value;
}

// Expose open / close so we can programaticaly close / open canvas base of ref
defineExpose({ openOffCanvas, closeOffCanvas, toggleOffCanvas });

onMounted(() => {
  watch(isOpen, (newValue) => {
    if (newValue) {
      document.body.classList.add("vt-overflow-hidden");
      emit("on-open");
    } else {
      document.body.classList.remove("vt-overflow-hidden");
      emit("on-close");
    }
  });
});
</script>

<template>
  <span @click="openOffCanvas()">
    <slot name="trigger"></slot>
  </span>
  <Teleport to="body">
    <transition name="slide-fade">
      <div
        v-if="isOpen"
        class="vt-fixed vt-z-50 vt-flex vt-flex-col vt-max-w-full vt-bg-white dark:vt-bg-gray-800 dark:vt-text-gray-300 vt-bg-clip-padding vt-transition-all vt-duration-300 vt-ease-in-out vt-h-full vt-shadow-2xl"
        :class="[classPosition, position]"
        :style="{
          width: width,
          height: height,
          maxWidth: '100vw',
          maxHeight: '100vh',
        }"
      >
        <slot name="header">
          <div
            class="vt-flex vt-justify-between vt-p-4 vt-border-b-2 dark:vt-border-gray-700 vt-border-b-gray-200 vt-items-center"
          >
            <slot name="headerTitle"></slot>
            <slot name="headerButton">
              <button
                class="vt-duration-200 vt-p-1 vt-ml-auto vt-bg-transparent vt-border-0 vt-text-black dark:vt-text-gray-50 vt-opacity-30 hover:vt-opacity-80 vt-float-right vt-text-3xl vt-leading-none vt-font-semibold vt-outline-none focus:vt-outline-none"
                @click="closeOffCanvas()"
              >
                <TwFeather type="x" />
              </button>
            </slot>
          </div>
        </slot>
        <slot :close-off-canvas="closeOffCanvas" :is-open="isOpen" />
      </div>
    </transition>
    <transition
      enter-active-class="vt-ease-out vt-duration-300"
      enter-from-class="vt-opacity-0"
      enter-to-class="vt-opacity-100"
      leave-active-class="vt-ease-in vt-duration-200"
      leave-from-class="vt-opacity-100"
      leave-to-class="vt-opacity-0"
    >
      <slot name="backdrop">
        <div
          v-if="isOpen"
          class="vt-fixed vt-inset-0 vt-transform vt-transition-all vt-z-10"
        >
          <div
            class="vt-absolute vt-inset-0 vt-bg-gray-900 vt-opacity-50"
            @click="
              closeOffCanvas();
              emit('backdrop-click');
            "
          ></div>
        </div>
      </slot>
    </transition>
  </Teleport>
</template>

<style scoped>
.left.slide-fade-enter-from {
  transform: translateX(-100%);
}

.left.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.left.slide-fade-leave-active-to {
  transition: all 0.5s ease-in-out;
}

.left.slide-fade-enter,
.left.slide-fade-leave-to {
  transform: translateX(-100%);
}

.right.slide-fade-enter-from {
  transform: translateX(100%);
}

.right.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.right.slide-fade-leave-active-to {
  transition: all 0.5s ease-in-out;
}

.right.slide-fade-enter,
.right.slide-fade-leave-to {
  transform: translateX(100%);
}

.top.slide-fade-enter-from {
  transform: translateY(-100%);
}

.top.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.top.slide-fade-leave-active-to {
  transition: all 0.5s ease-in-out;
}

.top.slide-fade-enter,
.top.slide-fade-leave-to {
  transform: translateY(-100%);
}

.bottom.slide-fade-enter-from {
  transform: translateY(100%);
}

.bottom.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.bottom.slide-fade-leave-active-to {
  transition: all 0.5s ease-in-out;
}

.bottom.slide-fade-enter,
.bottom.slide-fade-leave-to {
  transform: translateY(100%);
}
</style>
