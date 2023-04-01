<script setup lang="ts">
import { TwButton, TwFeather, TwAccordion } from "../../src/build";

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
      class="vt-bg-white dark:vt-bg-gray-700 vt-rounded vt-overflow-hidden vt-shadow"
      :data="accordion"
    >
      <template #header_example1="{ toggleAccordion, ref, isActive }">
        <div
          class="vt-bg-gray-100 dark:vt-bg-gray-800 dark:vt-text-gray-200 dark:vt-border-gray-700 vt-text-gray-800 vt-p-4 vt-flex vt-justify-between vt-items-center vt-cursor-pointer vt-border-b-2 vt-border-gray-200"
          @click="toggleAccordion(ref)"
        >
          <div>Header</div>
          <TwButton variant="none" class="vt-flex vt-items-center vt-p-0">
            <TwFeather
              class="vt-transition-all vt-duration-400"
              type="chevron-down"
              :class="{
                'vt-rotate-180': isActive,
              }"
            ></TwFeather>
          </TwButton>
        </div>
      </template>
      <template #example1>
        <div class="vt-p-4">Example 1</div>
      </template>
      <template #header_example2="{ toggleAccordion, ref, isActive }">
        <div
          class="vt-bg-gray-100 dark:vt-bg-gray-800 dark:vt-text-gray-200 dark:vt-border-gray-700 vt-text-gray-800 vt-p-4 vt-flex vt-justify-between vt-items-center vt-cursor-pointer"
          @click="toggleAccordion(ref)"
        >
          <div>Header 2</div>
          <TwButton variant="none" class="vt-flex vt-items-center vt-p-0">
            <TwFeather
              class="vt-transition-all vt-duration-400"
              type="chevron-down"
              :class="{
                'vt-rotate-180': isActive,
              }"
            ></TwFeather>
          </TwButton>
        </div>
      </template>
      <template #example2>
        <div class="vt-p-4">Example 2</div>
      </template>
    </TwAccordion>
  </div>
</template>
