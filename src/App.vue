<script setup lang="ts">
import FormExample from "@/example/FormExample.vue";
import ButtonExample from "@/example/ButtonExample.vue";
import TabExample from "@/example/TabExample.vue";
import ModalExample from "./example/ModalExample.vue";
import OffcanvasExample from "./example/OffcanvasExample.vue";
</script>

<template>
  <div class="flex justify-center py-4 bg-gray-100 min-h-screen">
    <div class="container grid gap-2">
      <div class="col-span-12">
        <FormExample />
      </div>
      <div class="col-span-12">
        <ButtonExample />
      </div>
      <div class="col-span-12">
        <TabExample />
      </div>
      <div class="col-span-12">
        <ModalExample />
      </div>
      <div class="col-span-12">
        <OffcanvasExample />
      </div>
    </div>
  </div>
</template>
