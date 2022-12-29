<script>
export default {
  name: "TwTab",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";

export type Position = "bottom" | "top" | "left" | "right";
export type Type = "horizontal" | "vertical";
export type Tab = {
  name: string;
  ref: string;
};
export interface Props {
  type?: Type;
  currentTab?: string;
  tabs: Array<Tab>;
  position?: Position;
  navClass?: string;
  tabClass?: string;
  tabActiveClass?: string;
  lineClass?: string;
  bodyClass?: string;
}
const props = defineProps<Props>();

interface TabRefs {
  [key: string]: HTMLElement;
}
const tabRefs = ref<TabRefs>({});
const currentTab = ref(props.currentTab ?? props.tabs[0].ref);
const newTab = ref();
const hlineWidth = ref(0);
const hlineOffset = ref(0);
const vlineHeight = ref(0);
const vlineOffset = ref(0);

const emit = defineEmits(["after-move"]);

const positionLineClass = computed(() => {
  let position = "";
  if (type.value === "horizontal") {
    position = props.position === "top" ? "top-0" : "bottom-0";
  } else {
    position = props.position === "right" ? "right-0" : "left-0";
  }
  return position;
});

const type = computed(() => {
  return props.type ?? "horizontal";
});

watch(currentTab, (newValue) => {
  if (newTab.value === newValue) return;
  move(newValue);
});

const move = (newActiveTab: string) => {
  if (!currentTab.value) return;

  const element = tabRefs.value[newActiveTab];
  if (type.value === "horizontal") {
    setHorizontalLineProperties(element);
  } else {
    setVerticalLineProperties(element);
  }

  emit("after-move", currentTab.value);
};

const setHorizontalLineProperties = (element: HTMLElement) => {
  hlineWidth.value = element.clientWidth;
  hlineOffset.value = element.offsetLeft;
};

const setVerticalLineProperties = (element: HTMLElement) => {
  vlineHeight.value = element.clientHeight;
  vlineOffset.value = element.offsetTop;
};

const changeTab = (ref: string) => {
  currentTab.value = ref;
};

onMounted(async () => {
  move(currentTab.value);
});

defineExpose({ changeTab });
</script>

<template>
  <div v-if="type === 'horizontal'">
    <nav class="relative flex" :class="[navClass]">
      <button
        class="py-1"
        :class="[tabClass, {
        [tabActiveClass as string]: currentTab === tab.ref
      }]"
        :ref="el => { tabRefs[tab.ref] = el as HTMLElement }"
        v-for="tab in tabs"
        :key="tab.name"
        @click="changeTab(tab.ref)"
      >
        {{ tab.name }}
      </button>
      <div
        class="absolute left-0 h-1 bg-gray-900 duration-300 ease"
        :class="[positionLineClass, lineClass]"
        :style="{
          width: `${hlineWidth}px`,
          transform: `translateX(${hlineOffset}px)`,
        }"
      />
    </nav>
    <div class="bg-white rounded-b p-2" :class="[bodyClass]">
      <div v-for="tab in tabs" :key="tab.ref">
        <div v-if="currentTab === tab.ref">
          <slot :name="tab.ref" />
        </div>
      </div>
    </div>
  </div>
  <div class="flex" v-else-if="type === 'vertical'">
    <nav class="relative flex flex-col w-44" :class="[navClass]">
      <button
        class="py-1"
        :class="[tabClass, {
        [tabActiveClass as string]: currentTab === tab.ref
      }]"
        :ref="el => { tabRefs[tab.ref] = el as HTMLElement }"
        v-for="tab in tabs"
        :key="tab.name"
        @click="changeTab(tab.ref)"
      >
        {{ tab.name }}
      </button>
      <div
        class="absolute w-1 top-0 bg-gray-900 duration-300 ease"
        :class="[positionLineClass, lineClass]"
        :style="{
          height: `${vlineHeight}px`,
          transform: `translateY(${vlineOffset}px)`,
        }"
      />
    </nav>
    <div class="bg-white rounded-b p-2 w-full" :class="[bodyClass]">
      <div v-for="tab in tabs" :key="tab.ref">
        <div v-if="currentTab === tab.ref">
          <slot :name="tab.ref" />
        </div>
      </div>
    </div>
  </div>
</template>
