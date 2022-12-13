<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { TwFeather } from "..";

export interface Props {
  fullHeight?: boolean;
  width?: string;
}
const props = withDefaults(defineProps<Props>(), {
  fullHeight: true,
  width: "800px",
});
const emit = defineEmits(["on-close", "on-open"]);

const isOpen = ref(false);
const bodyHeight = computed(() => {
  if (props.fullHeight) {
    return "75vh";
  }
  return "auto";
});

const toggleModal = () => {
  isOpen.value = !isOpen.value;
};

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      emit("on-open");
      document.body.style.overflow = "hidden";
    } else {
      emit("on-close");
      document.body.style.overflow = "";
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div>
    <span @click="toggleModal()">
      <slot name="trigger"></slot>
    </span>
    <teleport to="body">
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="isOpen"
          @click.self="toggleModal"
          class="fixed inset-0 transform transition-all z-10 bg-gray-900 bg-opacity-50 pt-12"
        >
          <transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              v-if="isOpen"
              class="overflow-x-hidden overflow-y-auto z-40 outline-none focus:outline-none justify-center flex px-2"
              @click.self="toggleModal"
            >
              <div
                class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none max-h-[80vh]"
                :style="{ width: props.width }"
              >
                <div
                  class="flex items-center justify-between p-5 border-b border-solid border-slate-200 dark:border-gray-700 rounded-t px-6"
                >
                  <slot name="header"></slot>
                  <button
                    class="duration-200 p-1 ml-auto transition-opacity bg-transparent border-0 text-black opacity-30 hover:opacity-60 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    @click="toggleModal()"
                  >
                    <tw-feather type="x" />
                  </button>
                </div>
                <div
                  class="relative p-6 flex-auto overflow-y-auto"
                  :style="{ height: bodyHeight }"
                >
                  <slot name="body"></slot>
                </div>
                <div
                  class="flex items-center p-6 border-t dark:border-gray-700 border-solid border-slate-200 rounded-b"
                >
                  <slot name="footer"></slot>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </teleport>
  </div>
</template>
