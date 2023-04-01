<script lang="ts">
export default defineComponent({
  name: "TwDatatableTd",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { defineComponent, ref } from "vue";

export interface Props {
  copyText?: string | number | boolean;
}
const props = defineProps<Props>();
const contextMenu = ref({
  isShown: false,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  screenX: 0,
  screenY: 0,
});

function theadContextHandler(e: MouseEvent) {
  if (!props.copyText) return;

  e.preventDefault();
  contextMenu.value.isShown = true;

  // clientX/Y gives the coordinates relative to the viewport in CSS pixels.
  contextMenu.value.clientX = e.clientX;
  contextMenu.value.clientY = e.clientY;

  // pageX/Y gives the coordinates relative to the <html> element in CSS pixels.
  contextMenu.value.pageX = e.pageX;
  contextMenu.value.pageY = e.pageY;

  // screenX/Y gives the coordinates relative to the screen in device pixels.
  contextMenu.value.screenX = e.screenX;
  contextMenu.value.screenY = e.screenY;
}

function theadContextCloseHandler() {
  contextMenu.value.isShown = false;
}

function copyTextToClipboard(text: string | number | boolean | undefined) {
  if (!text) return;
  if (typeof text !== "string") return;
  navigator.clipboard.writeText(text);
  theadContextCloseHandler();
  alert("text coppied!");
}
</script>

<template>
  <td v-bind="$attrs" @contextmenu="theadContextHandler($event)">
    <slot />
    <div
      v-show="contextMenu.isShown"
      class="vt-fixed vt-inset-0 vt-z-40"
      @click="theadContextCloseHandler()"
      @contextmenu.prevent="theadContextCloseHandler()"
      @scroll="theadContextCloseHandler()"
    />
    <div
      v-if="copyText"
      v-show="contextMenu.isShown"
      class="vt-fixed vt-z-50 vt-w-52 vt-bg-white dark:vt-bg-gray-800 vt-rounded-lg vt-cst-shadow vt-border dark:vt-border-gray-700 vt-text-gray-600 dark:vt-text-gray-200 vt-flex vt-flex-col vt-gap-3"
      :style="{
        left: contextMenu.clientX + 'px',
        top: contextMenu.clientY + 'px',
      }"
    >
      <div
        class="vt-bg-white hover:vt-bg-gray-50 dark:vt-bg-gray-800 dark:hover:vt-bg-gray-900 vt-cursor-pointer vt-p-2 vt-rounded"
        @click="copyTextToClipboard(copyText)"
      >
        Copy to clipboard
      </div>
    </div>
  </td>
</template>
