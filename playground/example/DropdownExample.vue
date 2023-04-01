<script setup lang="ts">
import { TwButton, TwDropdownMenu } from "../../src/build";
</script>

<template>
  <div>
    <h2 class="vt-text-2xl vt-font-bold">Dropdown Menu</h2>
    <hr class="vt-my-2 vt-border dark:vt-border-gray-700" />
    <div class="vt-grid vt-grid-cols-12">
      <div class="vt-col-span-12 vt-flex vt-gap-2">
        <tw-dropdown-menu align="left" width="48">
          <template #trigger>
            <tw-button variant="light"> Dropdown left align </tw-button>
          </template>

          <template #content>
            <div
              class="vt-block vt-w-full vt-px-4 vt-py-2 vt-text-sm vt-leading-5 vt-text-gray-700 dark:vt-text-gray-200 vt-text-left hover:vt-bg-gray-100 dark:hover:vt-bg-gray-900 focus:vt-outline-none focus:vt-bg-gray-100 dark:focus:vt-bg-gray-800 vt-transition"
            >
              <div class="vt-flex vt-gap-2 vt-items-center">
                <div class="">Select 1</div>
              </div>
            </div>
            <div
              class="vt-block vt-w-full vt-px-4 vt-py-2 vt-text-sm vt-leading-5 vt-text-gray-700 dark:vt-text-gray-200 vt-text-left hover:vt-bg-gray-100 dark:hover:vt-bg-gray-900 focus:vt-outline-none focus:vt-bg-gray-100 dark:focus:vt-bg-gray-800 vt-transition"
            >
              <div class="vt-flex vt-gap-2 vt-items-center">
                <div class="">Select 2</div>
              </div>
            </div>
          </template>
        </tw-dropdown-menu>
        <tw-dropdown-menu align="right" width="48">
          <template #trigger>
            <tw-button variant="light"> Dropdown right align </tw-button>
          </template>

          <template #content>
            <div
              class="vt-block vt-w-full vt-px-4 vt-py-2 vt-text-sm vt-leading-5 vt-text-gray-700 dark:vt-text-gray-200 vt-text-left hover:vt-bg-gray-100 dark:hover:vt-bg-gray-900 focus:vt-outline-none focus:vt-bg-gray-100 dark:focus:vt-bg-gray-800 vt-transition"
            >
              <div class="vt-flex vt-gap-2 vt-items-center">
                <div class="">Select 1</div>
              </div>
            </div>
            <div
              class="vt-block vt-w-full vt-px-4 vt-py-2 vt-text-sm vt-leading-5 vt-text-gray-700 dark:vt-text-gray-200 vt-text-left hover:vt-bg-gray-100 dark:hover:vt-bg-gray-900 focus:vt-outline-none focus:vt-bg-gray-100 dark:focus:vt-bg-gray-800 vt-transition"
            >
              <div class="vt-flex vt-gap-2 vt-items-center">
                <div class="">Select 2</div>
              </div>
            </div>
          </template>
        </tw-dropdown-menu>
      </div>
    </div>
  </div>
</template>
