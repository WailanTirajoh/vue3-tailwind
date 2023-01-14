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
    <div class="fixed top-0 left-0 z-50">
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0"
      >
        <div
          class="flex items-center justify-center h-screen w-screen bg-gray-400 bg-opacity-70"
          v-if="dialog.isShown.value"
        ></div>
      </transition>
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          class="flex items-center justify-center h-screen w-screen absolute top-0"
          @click.self="dialog.reject"
          v-if="dialog.isShown.value"
        >
          <div class="bg-white rounded shadow-lg w-96 overflow-hidden -mt-10">
            <div class="border-b p-2 border-t-4 border-t-gray-800 flex gap-4">
              <div class="icon flex items-center">
                <TwFeather
                  class="text-gray-600"
                  size="50"
                  :type="dialog.dialog.icon"
                />
              </div>
              <div class="py-2">
                <div class="title text-gray-800 font-bold flex items-center">
                  {{ dialog.dialog.title }}
                </div>
                <div
                  class="description text-gray-500 italic"
                  v-if="dialog.dialog.description"
                  v-html="dialog.dialog.description"
                ></div>
              </div>
            </div>
            <div class="footer flex justify-center gap-2 p-2">
              <TwButton
                ref="rejectButton"
                ripple
                class="w-12"
                button-text-position="center"
                variant="secondary"
                @click="dialog.reject"
              >
                {{ dialog.dialog.rejectText }}
              </TwButton>
              <TwButton
                ref="confirmButton"
                ripple
                class="w-12"
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
