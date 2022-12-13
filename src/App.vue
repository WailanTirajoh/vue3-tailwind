<script setup lang="ts">
import FormExample from "@/example/FormExample.vue";
import ButtonExample from "@/example/ButtonExample.vue";
import TabExample from "@/example/TabExample.vue";
import ModalExample from "./example/ModalExample.vue";
import OffcanvasExample from "./example/OffcanvasExample.vue";
import DatatableClientExample from "./example/DatatableClientExample.vue";
import ToastExample from "./example/ToastExample.vue";
import DropdownExample from "./example/DropdownExample.vue";
</script>

<template>
  <div class="flex justify-center py-4 bg-gray-300 min-h-screen">
    <div class="grid gap-2">
      <div class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100">
        <FormExample />
      </div>
      <div class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100">
        <ButtonExample />
      </div>
      <div class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100">
        <TabExample />
      </div>
      <div class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100">
        <ModalExample />
      </div>
      <div class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100">
        <OffcanvasExample />
      </div>
      <div class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100">
        <ToastExample />
      </div>
      <div class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100">
        <DropdownExample />
      </div>
      <div class="col-span-12 p-4 rounded-lg shadow-xl bg-gray-100">
        <DatatableClientExample />
      </div>
    </div>
  </div>
</template>
