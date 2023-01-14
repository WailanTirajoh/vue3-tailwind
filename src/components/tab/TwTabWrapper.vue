<script setup lang="ts">
import { computed, onMounted, provide, type ComputedRef } from "vue";
import { useTabs } from "@/composables/tabs";
import { generateId } from "@/utils/generateId";
import type { Tab } from "../../type";

const composableTab = useTabs();

const props = defineProps<{
  id?: string;
}>();

const tabId = computed(() => {
  return props.id || generateId();
});

const tabWrapper = computed(() =>
  composableTab.getTab(tabId.value)
) as ComputedRef<Tab>;

provide("tabId", tabId);
provide("tabWrapper", tabWrapper);

onMounted(() => {
  composableTab.addTabs(tabId.value);
});
</script>

<template>
  <slot :tab-wrapper="tabWrapper" />
</template>
