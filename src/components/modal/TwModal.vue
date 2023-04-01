<script lang="ts">
export default defineComponent({
  name: "TwModal",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { ModalBackdrop } from "../../type";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
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

function toggleModal() {
  isOpen.value = !isOpen.value;
}
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
function backdropClick() {
  emit("backdrop-click");
  if (props.backdrop === "static") {
    modalContainer.value?.classList.add("tw-shake");
    const styleTimeout = setTimeout(() => {
      modalContainer.value?.classList.remove("tw-shake");
      clearTimeout(styleTimeout);
    }, 1000);
    return;
  }
  toggleModal();
}

defineExpose({ closeModal, openModal, toggleModal });

onMounted(() => {
  watch(isOpen, (newValue) => {
    if (newValue) {
      document.body.classList.add("overflow-hidden");
      emit("on-open");
    } else {
      document.body.classList.remove("overflow-hidden");
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
        enter-active-class="vt-ease-out vt-duration-300"
        enter-from-class="vt-opacity-0"
        enter-to-class="vt-opacity-100"
        leave-active-class="vt-ease-in vt-duration-200"
        leave-from-class="vt-opacity-100"
        leave-to-class="vt-opacity-0"
      >
        <div
          v-show="isOpen"
          @click.self="backdropClick"
          class="vt-fixed vt-inset-0 vt-transform vt-transition-all vt-z-50 vt-bg-gray-900 !vt-bg-opacity-50 vt-pt-12"
          :class="[props.backdropClass]"
        >
          <transition
            enter-active-class="vt-ease-out vt-duration-300"
            enter-from-class="vt-opacity-0 vt-translate-y-4 sm:vt-translate-y-0 sm:vt-scale-95"
            enter-to-class="vt-opacity-100 vt-translate-y-0 sm:vt-scale-100"
            leave-active-class="vt-ease-in vt-duration-200"
            leave-from-class="vt-opacity-100 vt-translate-y-0 sm:vt-scale-100"
            leave-to-class="vt-opacity-0 vt-translate-y-4 sm:vt-translate-y-0 sm:vt-scale-95"
          >
            <div
              v-if="isOpen"
              ref="modalContainer"
              class="vt-overflow-x-hidden vt-overflow-y-auto vt-z-40 vt-outline-none focus:vt-outline-none vt-justify-center vt-flex vt-px-2 vt-duration-50 vt-transition-all"
              @click.self="backdropClick"
            >
              <div
                class="vt-border-0 vt-rounded-lg vt-shadow-lg vt-relative vt-flex vt-flex-col vt-w-full vt-bg-white dark:vt-bg-gray-800 dark:vt-text-gray-300 vt-outline-none focus:vt-outline-none vt-max-h-[80vh]"
                :class="[props.modalWrapperClass]"
                :style="{ width: props.width }"
              >
                <div
                  class="vt-flex vt-items-center vt-justify-between vt-p-5 vt-border-b vt-border-solid vt-border-slate-200 dark:vt-border-gray-700 vt-rounded-t vt-px-6"
                  :class="[props.modalHeaderClass]"
                >
                  <slot name="header"></slot>
                  <slot name="headerCloseButton">
                    <button
                      v-if="props.showCloseIcon"
                      class="vt-duration-200 vt-p-1 vt-ml-auto vt-transition-opacity vt-bg-transparent vt-border-0 vt-text-black vt-opacity-30 hover:vt-opacity-60 vt-float-right vt-text-3xl vt-leading-none vt-font-semibold vt-outline-none focus:vt-outline-none"
                      @click="toggleModal()"
                    >
                      <tw-feather type="x" />
                    </button>
                  </slot>
                </div>
                <div
                  class="vt-relative vt-p-6 vt-flex-auto vt-overflow-y-auto"
                  :class="[props.modalBodyClass]"
                  :style="{ height: bodyHeight }"
                >
                  <slot name="body"></slot>
                </div>
                <div
                  class="vt-flex vt-items-center vt-p-6 vt-border-t dark:vt-border-gray-700 vt-border-solid vt-border-slate-200 vt-rounded-b"
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
