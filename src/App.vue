<script setup lang="ts">
import { ref } from "vue";
import FormFile from "./components/form/TwFile.vue";

const fileModel = ref([]);
</script>

<template>
  <div class="flex justify-center py-4 bg-gray-100 h-screen">
    <div class="container">
      <div class="grid grid-cols-12">
        <div class="col-span-12">
          <FormFile v-model="fileModel" />
        </div>
        <div class="col-span-12">
          <div class="">Result:</div>
          <pre>{{ fileModel }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
