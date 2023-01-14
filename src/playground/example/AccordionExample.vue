<script setup lang="ts">
import { TwButton, TwFeather, TwAccordion } from "@/build";

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
    <TwAccordion
      class="bg-white dark:bg-gray-700 rounded overflow-hidden shadow"
      :data="accordion"
    >
      <template #header_example1="{ toggleAccordion, ref, isActive }">
        <div
          class="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 text-gray-800 p-4 flex justify-between items-center cursor-pointer border-b-2 border-gray-200"
          @click="toggleAccordion(ref)"
        >
          <div>Header</div>
          <TwButton variant="none" class="flex items-center p-0">
            <TwFeather
              class="transition-all duration-400"
              type="chevron-down"
              :class="{
                'rotate-180': isActive,
              }"
            ></TwFeather>
          </TwButton>
        </div>
      </template>
      <template #example1>
        <div class="p-4">Example 1</div>
      </template>
      <template #header_example2="{ toggleAccordion, ref, isActive }">
        <div
          class="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 text-gray-800 p-4 flex justify-between items-center cursor-pointer"
          @click="toggleAccordion(ref)"
        >
          <div>Header 2</div>
          <TwButton variant="none" class="flex items-center p-0">
            <TwFeather
              class="transition-all duration-400"
              type="chevron-down"
              :class="{
                'rotate-180': isActive,
              }"
            ></TwFeather>
          </TwButton>
        </div>
      </template>
      <template #example2>
        <div class="p-4">Example 2</div>
      </template>
    </TwAccordion>
  </div>
</template>
