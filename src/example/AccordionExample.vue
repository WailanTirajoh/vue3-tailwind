<script setup lang="ts">
import { TwFeather } from "@/components";
import TwAccordion from "@/components/accordion/TwAccordion.vue";

const accordion = [
  {
    ref: "example1",
  },
  {
    ref: "example2",
  },
];
</script>

<template>
  <div>
    <TwAccordion class="bg-white rounded overflow-hidden" :data="accordion">
      <template #header_example1="{ toggleAccordion, ref, isActive }">
        <div
          class="bg-sky-100 text-sky-600 p-4 flex justify-between items-center cursor-pointer"
          @click="toggleAccordion(ref)"
        >
          <div>Header</div>
          <button class="flex items-center">
            <TwFeather
              class="transition-all duration-400"
              type="chevron-down"
              :class="{
                'rotate-180': isActive,
              }"
            ></TwFeather>
          </button>
        </div>
      </template>
      <template #example1>
        <div class="p-4">Example 1</div>
      </template>
      <template #header_example2="{ toggleAccordion, ref, isActive }">
        <div
          class="bg-sky-100 text-sky-600 p-4 flex justify-between items-center cursor-pointer"
          @click="toggleAccordion(ref)"
        >
          <div>Header 2</div>
          <button class="flex items-center">
            <TwFeather
              class="transition-all duration-400"
              type="chevron-down"
              :class="{
                'rotate-180': isActive,
              }"
            ></TwFeather>
          </button>
        </div>
      </template>
      <template #example2>
        <div class="p-4">Example 2</div>
      </template>
    </TwAccordion>
  </div>
</template>
