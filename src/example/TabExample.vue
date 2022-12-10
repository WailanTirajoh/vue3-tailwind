<script setup lang="ts">
import { ref } from "vue";
import { TwTab } from "@/components";

const verticalTab = ref();
const horizontalTab = ref();
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
const currentTab = ref("tab1");

const handleAfterMove = (newTab: string) => {
  currentTab.value = newTab;
  verticalTab.value.changeTab(currentTab.value);
  horizontalTab.value.changeTab(currentTab.value);
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Tabs</h2>
    <hr class="my-2 border" />
    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-12">
        <h3 class="text-base font-medium mb-2">Horizontal Tab</h3>
        <TwTab
          ref="horizontalTab"
          type="horizontal"
          position="bottom"
          :tabs="tabs"
          :current-tab="currentTab"
          nav-class="px-2 rounded-t gap-2 py-2"
          tab-class="p-2 text-gray-900 rounded"
          line-class="!bg-gray-700 rounded-t"
          tab-active-class="!font-bold"
          body-class="bg-white shadow border rounded-b"
          @after-move="handleAfterMove"
        >
          <template #tab1> Tab 1 template </template>
          <template #tab2> Tab 2 template </template>
          <template #tab3> Tab 3 template </template>
        </TwTab>
      </div>
      <div class="col-span-12">
        <h3 class="text-base font-medium mb-2">Vertical Tab</h3>
        <TwTab
          ref="verticalTab"
          type="vertical"
          position="bottom"
          :tabs="tabs"
          :current-tab="currentTab"
          nav-class="px-2 rounded-l gap-2 py-2"
          tab-class="p-2 text-gray-900 rounded text-left"
          line-class="!bg-gray-700 rounded-r"
          tab-active-class="!font-bold"
          body-class="bg-white shadow rounded-r border"
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
