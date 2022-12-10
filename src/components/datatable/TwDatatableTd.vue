<script setup lang="ts">
import { ref } from "vue";

interface Props {
  copyText: string | number | boolean;
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

const theadContextHandler = (e: MouseEvent) => {
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
};
const theadContextCloseHandler = () => {
  contextMenu.value.isShown = false;
};
const copyTextToClipboard = (text: string | number | boolean) => {
  if (!text) return;
  if (typeof text !== "string") return;
  navigator.clipboard.writeText(text);
  theadContextCloseHandler();
  alert("text coppied!");
};
</script>

<template>
  <td @contextmenu="theadContextHandler($event)">
    <slot />
    <div
      v-show="contextMenu.isShown"
      class="fixed inset-0 z-40"
      @click="theadContextCloseHandler()"
      @contextmenu.prevent="theadContextCloseHandler()"
      @scroll="theadContextCloseHandler()"
    />
    <div
      v-if="copyText"
      v-show="contextMenu.isShown"
      class="fixed z-50 w-52 bg-white rounded-lg cst-shadow border text-gray-600 flex flex-col gap-3"
      :style="{
        left: contextMenu.clientX + 'px',
        top: contextMenu.clientY + 'px',
      }"
    >
      <div
        class="bg-white hover:bg-gray-50 cursor-pointer p-2 rounded"
        @click="copyTextToClipboard(copyText)"
      >
        Copy to clipboard
      </div>
    </div>
  </td>
</template>
