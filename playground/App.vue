<script setup lang="ts">
import FormExample from "./example/FormExample.vue";
import ButtonExample from "./example/ButtonExample.vue";
import TabExample from "./example/TabExample.vue";
import ModalExample from "./example/ModalExample.vue";
import OffcanvasExample from "./example/OffcanvasExample.vue";
import DatatableClientExample from "./example/DatatableClientExample.vue";
import DatatableServerExample from "./example/DatatableServerExample.vue";
import ToastExample from "./example/ToastExample.vue";
import DropdownExample from "./example/DropdownExample.vue";
import AccordionExample from "./example/AccordionExample.vue";

import { TwToggle, TwDialog } from "../src/build";
import { onMounted, ref, watch } from "vue";
import CalendarExample from "./example/CalendarExample.vue";

const dark = ref(false);
watch(dark, (value) => {
  if (value) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

onMounted(async () => {
  const windowPreferenceDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (windowPreferenceDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
</script>

<template>
  <div>
    <div
      class="vt-bg-white vt-border-b vt-p-4 vt-sticky vt-top-0 vt-z-10 dark:vt-bg-gray-900 dark:vt-border-gray-700 dark:vt-text-gray-300"
    >
      <TwToggle
        id="toggle-dark"
        v-model="dark"
        :no-icon="false"
        active-text=""
        inactive-text=""
        active-icon="moon"
        inactive-icon="sun"
      />
    </div>
    <div
      class="vt-flex vt-justify-center vt-py-4 vt-bg-gray-300 vt-min-h-screen dark:vt-bg-gray-800"
    >
      <div class="vt-grid vt-gap-2">
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <CalendarExample />
        </div>
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <AccordionExample />
        </div>
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <FormExample />
        </div>
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <ButtonExample />
        </div>
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <TabExample />
        </div>
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <ModalExample />
        </div>
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <OffcanvasExample />
        </div>
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <DropdownExample />
        </div>
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <ToastExample />
        </div>
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <DatatableServerExample />
        </div>
        <div
          class="vt-col-span-12 vt-p-4 vt-rounded-lg vt-shadow-xl vt-bg-gray-100 dark:vt-bg-gray-900 dark:vt-text-gray-300"
        >
          <DatatableClientExample />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <TwDialog title="Are you sure you want to submit this?"></TwDialog>
    </Teleport>
  </div>
</template>
