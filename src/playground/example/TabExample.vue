<script setup lang="ts">
import { ref } from "vue";
import { TwTab, useBreakpoints } from "@/build";

const breakPoints = useBreakpoints();
const horizontalTabBottom = ref();
const tabs = ref([
  {
    name: "Tab 1",
    ref: "tab1",
  },
  {
    name: "Tab 2",
    ref: "tab2",
  },
  {
    name: "Tab 3",
    ref: "tab3",
  },
]);
const activeTab = ref("tab1");

const handleAfterMove = (newTab: string) => {
  activeTab.value = newTab;
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Tabs</h2>
    <hr class="my-2 border dark:border-gray-700" />
    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-12">
        <TwTab
          ref="horizontalTabBottom"
          :type="breakPoints.width.value < 768 ? 'horizontal' : 'vertical'"
          :position="breakPoints.width.value < 768 ? 'bottom' : 'right'"
          :tabs="tabs"
          :current-tab="activeTab"
          nav-class="px-2 rounded-t gap-2 py-2"
          tab-class="p-2 text-gray-900 dark:text-gray-300 rounded"
          :line-class="
            breakPoints.width.value
              ? '!bg-gray-700 rounded-t'
              : '!bg-gray-700 rounded-l'
          "
          tab-active-class="!font-bold"
          body-class="bg-white dark:bg-gray-800 shadow border rounded dark:border-gray-700"
          @after-move="handleAfterMove"
        >
          <template #tab1> Tab 1 template </template>
          <template #tab2> Tab 2 template </template>
          <template #tab3> Tab 3 template </template>
        </TwTab>
      </div>
    </div>
  </div>
</template>
