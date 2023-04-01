<script setup lang="ts">
import { useTabs } from "@/composables/tabs";
import { computed, inject, ref, type Ref } from "vue";
import type { Tab, TabChildren, TabRefs } from "../../type";

const tabWrapper = inject("tabWrapper") as Ref<Tab>;
const tabId = inject("tabId") as Ref<string>;

const hlineWidth = ref(0);
const hlineOffset = ref(0);
const vlineHeight = ref(0);
const vlineOffset = ref(0);

const props = withDefaults(
  defineProps<{
    type?: "vertical" | "horizontal";
    lineClass?: Array<string> | string;
  }>(),
  {
    type: "horizontal",
    lineClass: "",
  }
);

const composableTab = useTabs();

function changeTab(tab: TabChildren) {
  move(tab.toString());
  composableTab.setTabActive(tabId.value, tab);
}
const tabRefs = ref<TabRefs>({});

const emit = defineEmits(["after-move"]);

function move(newActiveTab: string) {
  if (!tabWrapper.value.active) return;

  const element = tabRefs.value[newActiveTab];
  if (props.type === "horizontal") {
    setHorizontalLineProperties(element);
  } else {
    setVerticalLineProperties(element);
  }

  emit("after-move", tabWrapper.value.active);
}

function setHorizontalLineProperties(element: HTMLElement) {
  console.log(element);
  hlineWidth.value = element.clientWidth;
  hlineOffset.value = element.offsetLeft;
}

function setVerticalLineProperties(element: HTMLElement) {
  vlineHeight.value = element.clientHeight;
  vlineOffset.value = element.offsetTop;
}

const lineStyle = computed(() => {
  if (props.type === "horizontal") {
    return {
      width: `${hlineWidth.value}px`,
      transform: `translateX(${hlineOffset.value}px)`,
    };
  }

  return {
    height: `${vlineHeight.value}px`,
    transform: `translateY(${vlineOffset.value}px)`,
  };
});
</script>

<template>
  <nav class="vt-relative vt-flex vt-flex-col vt-w-44">
    <ul
      :class="{
        'vt-flex': props.type === 'horizontal',
      }"
    >
      <li v-for="tab in tabWrapper.childrens" :key="tab">
        <a
          href="#"
          class="vt-block"
          :ref="el => { tabRefs[tab] = el as HTMLElement }"
          @click.prevent="changeTab(tab)"
        >
          <slot :name="`${tab}`" :active="tabWrapper.active === tab">
            {{ tab }}</slot
          >
        </a>
      </li>
      <div
        class="vt-absolute vt-w-1 vt-h-1 vt-bottom-0 vt-bg-gray-900 vt-duration-300 vt-ease"
        :class="[
          {
            'vt-bottom-0': props.type === 'horizontal',
            'vt-top-0': props.type === 'vertical',
          },
          lineClass,
        ]"
        :style="lineStyle"
      />
    </ul>
  </nav>
</template>
