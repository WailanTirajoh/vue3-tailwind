<script lang="ts">
export default defineComponent({
  name: "TwDialog",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";
import { TwButton, TwFeather } from "..";
import { useDialog } from "../../composables/dialog";

const dialog = useDialog();

const confirmButton = ref();
const rejectButton = ref();

onMounted(() => {
  watch(dialog.isShown, (value) => {
    nextTick(() => {
      if (value) rejectButton.value.$el.focus();
    });
  });
});
</script>

<template>
  <slot
    :reject="dialog.reject"
    :confirm="dialog.confirm"
    :is-shown="dialog.isShown"
    :dialog="dialog.dialog"
  >
    <div class="vt-fixed vt-top-0 vt-left-0 vt-z-50">
      <transition
        enter-active-class="vt-ease-out vt-duration-300"
        enter-from-class="vt-opacity-0 vt-translate-y-4 sm:vt-translate-y-0"
        enter-to-class="vt-opacity-100 vt-translate-y-0 sm:vt-scale-100"
        leave-active-class="vt-ease-in vt-duration-200"
        leave-from-class="vt-opacity-100 vt-translate-y-0 sm:vt-scale-100"
        leave-to-class="vt-opacity-0 vt-translate-y-4 sm:vt-translate-y-0"
      >
        <div
          class="vt-flex vt-items-center vt-justify-center vt-h-screen vt-w-screen vt-bg-gray-400 vt-bg-opacity-70"
          v-if="dialog.isShown.value"
        ></div>
      </transition>
      <transition
        enter-active-class="vt-ease-out vt-duration-300"
        enter-from-class="vt-opacity-0 vt-translate-y-4 sm:vt-translate-y-0 sm:vt-scale-95"
        enter-to-class="vt-opacity-100 vt-translate-y-0 sm:vt-scale-100"
        leave-active-class="vt-ease-in vt-duration-200"
        leave-from-class="vt-opacity-100 vt-translate-y-0 sm:vt-scale-100"
        leave-to-class="vt-opacity-0 vt-translate-y-4 sm:vt-translate-y-0 sm:vt-scale-95"
      >
        <div
          class="vt-flex vt-items-center vt-justify-center vt-h-screen vt-w-screen vt-absolute vt-top-0"
          @click.self="dialog.reject"
          v-if="dialog.isShown.value"
        >
          <div
            class="vt-bg-white vt-rounded vt-shadow-lg vt-w-96 vt-overflow-hidden -vt-mt-10"
          >
            <div
              class="vt-border-b vt-p-2 vt-border-t-4 vt-border-t-gray-800 vt-flex vt-gap-4"
            >
              <div class="vt-icon vt-flex vt-items-center">
                <TwFeather
                  class="vt-text-gray-600"
                  size="50"
                  :type="dialog.dialog.icon"
                />
              </div>
              <div class="vt-py-2">
                <div
                  class="vt-title vt-text-gray-800 vt-font-bold vt-flex vt-items-center"
                >
                  {{ dialog.dialog.title }}
                </div>
                <div
                  class="vt-description vt-text-gray-500 vt-italic"
                  v-if="dialog.dialog.description"
                  v-html="dialog.dialog.description"
                ></div>
              </div>
            </div>
            <div class="vt-footer vt-flex vt-justify-center vt-gap-2 vt-p-2">
              <TwButton
                ref="rejectButton"
                ripple
                class="vt-w-12"
                button-text-position="center"
                variant="secondary"
                @click="dialog.reject"
              >
                {{ dialog.dialog.rejectText }}
              </TwButton>
              <TwButton
                ref="confirmButton"
                ripple
                class="vt-w-12"
                button-text-position="center"
                @click="dialog.confirm"
              >
                {{ dialog.dialog.acceptText }}
              </TwButton>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </slot>
</template>
