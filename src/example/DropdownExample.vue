<script setup lang="ts">
import { TwButton } from "@/components";
import TwDropdown from "@/components/dropdown/TwDropdown.vue";
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Dropdown</h2>
    <hr class="my-2 border dark:border-gray-700" />
    <div class="grid grid-cols-12">
      <div class="col-span-12 flex gap-2">
        <tw-dropdown align="left" width="48">
          <template #trigger>
            <tw-button variant="light"> Dropdown left align </tw-button>
          </template>

          <template #content>
            <div
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-200 text-left hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition"
            >
              <div class="flex gap-2 items-center">
                <div class="">Select 1</div>
              </div>
            </div>
            <div
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-200 text-left hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition"
            >
              <div class="flex gap-2 items-center">
                <div class="">Select 2</div>
              </div>
            </div>
          </template>
        </tw-dropdown>
        <tw-dropdown align="right" width="48">
          <template #trigger>
            <tw-button variant="light"> Dropdown right align </tw-button>
          </template>

          <template #content>
            <div
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-200 text-left hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition"
            >
              <div class="flex gap-2 items-center">
                <div class="">Select 1</div>
              </div>
            </div>
            <div
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-200 text-left hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition"
            >
              <div class="flex gap-2 items-center">
                <div class="">Select 2</div>
              </div>
            </div>
          </template>
        </tw-dropdown>
      </div>
    </div>
  </div>
</template>
