<script setup lang="ts">
import { useTabs } from "@/composables/tabs";
import { generateId } from "@/utils/generateId";
import { computed, inject, onMounted, watch, type Ref } from "vue";
import type { Tab } from "../../type";

const props = defineProps<{
  id?: string | number;
}>();

const tabId = inject("tabId") as Ref<string>;
const tabWrapper = inject("tabWrapper") as Ref<Tab>;

const composableTab = useTabs();

const navigatorId = computed(() => props.id || generateId());

const active = computed(() => {
  return tabWrapper.value.active === props.id;
});

onMounted(() => {
  watch(tabWrapper, () => {
    if (
      tabWrapper.value.childrens &&
      !tabWrapper.value.childrens.includes(navigatorId.value)
    ) {
      composableTab.addTabChildren(tabId.value, navigatorId.value);
    }

    if (!tabWrapper.value.childrens.includes(tabWrapper.value.active)) {
      composableTab.setTabActive(tabId.value, navigatorId.value);
    }
  });
});
</script>
<template>
  <slot :active="active"></slot>
</template>
