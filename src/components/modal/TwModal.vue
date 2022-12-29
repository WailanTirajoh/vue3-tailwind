<script lang="ts">
export default {
  name: "TwModal",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { ModalBackdrop } from "@/components/type";

import { computed, onMounted, ref, watch } from "vue";
import { TwFeather } from "..";

export interface Props {
  fullHeight?: boolean;
  width?: string;
  backdrop?: ModalBackdrop;
  showCloseIcon?: boolean;
  modalWrapperClass?: string;
  modalHeaderClass?: string;
  modalBodyClass?: string;
  modalFooterClass?: string;
  backdropClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  fullHeight: true,
  width: "800px",
  backdrop: "",
  showCloseIcon: true,
  modalWrapperClass: "",
  modalHeaderClass: "",
  modalBodyClass: "",
  modalFooterClass: "",
  backdropClass: "",
});

const emit = defineEmits(["on-close", "on-open", "backdrop-click"]);

const isOpen = ref(false);
const bodyHeight = computed(() => (props.fullHeight ? "75vh" : "auto"));
const modalContainer = ref<HTMLElement>();

const toggleModal = () => (isOpen.value = !isOpen.value);
const closeModal = () => (isOpen.value = false);
const openModal = () => (isOpen.value = true);
const backdropClick = () => {
  emit("backdrop-click");
  if (props.backdrop === "static") {
    modalContainer.value?.classList.add("scale-105");
    const styleTimeout = setTimeout(() => {
      modalContainer.value?.classList.remove("scale-105");
      clearTimeout(styleTimeout);
    }, 100);
    return;
  }
  toggleModal();
};

defineExpose({ closeModal, openModal });

onMounted(() => {
  watch(isOpen, (newValue) => {
    if (newValue) {
      document.body.style.overflow = "hidden";
      emit("on-open");
    } else {
      document.body.style.overflow = "auto";
      emit("on-close");
    }
  });
});
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
          @click.self="backdropClick"
          class="fixed inset-0 transform transition-all z-50 bg-gray-900 !bg-opacity-50 pt-12"
          :class="[props.backdropClass]"
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
              ref="modalContainer"
              class="overflow-x-hidden overflow-y-auto z-40 outline-none focus:outline-none justify-center flex px-2 duration-50 transition-all"
              @click.self="backdropClick"
            >
              <div
                class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 dark:text-gray-300 outline-none focus:outline-none max-h-[80vh]"
                :class="[props.modalWrapperClass]"
                :style="{ width: props.width }"
              >
                <div
                  class="flex items-center justify-between p-5 border-b border-solid border-slate-200 dark:border-gray-700 rounded-t px-6"
                  :class="[props.modalHeaderClass]"
                >
                  <slot name="header"></slot>
                  <slot name="headerCloseButton">
                    <button
                      v-if="props.showCloseIcon"
                      class="duration-200 p-1 ml-auto transition-opacity bg-transparent border-0 text-black opacity-30 hover:opacity-60 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      @click="toggleModal()"
                    >
                      <tw-feather type="x" />
                    </button>
                  </slot>
                </div>
                <div
                  class="relative p-6 flex-auto overflow-y-auto"
                  :class="[props.modalBodyClass]"
                  :style="{ height: bodyHeight }"
                >
                  <slot name="body"></slot>
                </div>
                <div
                  class="flex items-center p-6 border-t dark:border-gray-700 border-solid border-slate-200 rounded-b"
                  :class="[props.modalFooterClass]"
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
