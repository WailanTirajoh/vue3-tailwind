<script setup lang="ts">
import { TwButton, TwModal } from "@/components";
</script>
<template>
  <h2 class="text-2xl font-bold">Modal</h2>
  <hr class="my-2 border" />
  <TwModal :full-height="false">
    <template #button>
      <TwButton> Modal </TwButton>
    </template>
    <template #header>
      <div>Header</div>
    </template>
    <template #body>
      <div>Body</div>
    </template>
    <template #footer>
      <div>Footer</div>
    </template>
  </TwModal>
</template>
