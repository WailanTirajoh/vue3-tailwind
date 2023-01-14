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

import { TwToggle, TwDialog } from "../components";
import { onMounted, ref, watch } from "vue";

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
      class="bg-white border-b p-4 sticky top-0 z-10 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
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
      class="flex justify-center py-4 bg-gray-300 min-h-screen dark:bg-gray-800"
    >
      <div class="grid gap-2">
        <div
          class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
        >
          <AccordionExample />
        </div>
        <div
          class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
        >
          <FormExample />
        </div>
        <div
          class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
        >
          <ButtonExample />
        </div>
        <div
          class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
        >
          <TabExample />
        </div>
        <div
          class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
        >
          <ModalExample />
        </div>
        <div
          class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
        >
          <OffcanvasExample />
        </div>
        <div
          class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
        >
          <DropdownExample />
        </div>
        <div
          class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
        >
          <ToastExample />
        </div>
        <div
          class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
        >
          <DatatableServerExample />
        </div>
        <div
          class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
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
