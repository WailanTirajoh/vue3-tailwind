<script lang="ts">
export default defineComponent({
  name: "TwAccordion",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { useAnimationOpenClose } from "../../composables/animation";
import { defineComponent, ref } from "vue";

export interface Props {
  data: Array<{
    ref: string;
  }>;
  keepAlive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  keepAlive: false,
});

const activeState = ref<Array<never | string>>([]);

const animationOpenClose = useAnimationOpenClose();

const toggleAccordion = (ref: string): void => {
  activeState.value = activeState.value.includes(ref)
    ? // Remove item when it is active
      activeState.value.filter((item) => item !== ref)
    : // If keep alive then
    props.keepAlive
    ? // Create new array with spreaded state value, and add ref to it
      [...activeState.value, ref]
    : // if not just create array with the single ref
      [ref];
};
</script>

<template>
  <div v-bind="$attrs">
    <slot :active-state="activeState" :toggle-accordion="toggleAccordion">
      <div v-for="data in props.data" :key="data.ref">
        <slot
          :name="`${'header_' + data.ref}`"
          :is-active="activeState.includes(data.ref)"
          :toggle-accordion="toggleAccordion"
          :ref="data.ref"
        />

        <transition
          name="expand"
          @enter="animationOpenClose.animateEnter"
          @after-enter="animationOpenClose.animateAfterEnter"
          @leave="animationOpenClose.animateLeave"
        >
          <div v-show="activeState.includes(data.ref)">
            <slot :name="data.ref" />
          </div>
        </transition>
      </div>
    </slot>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease-in-out;
  overflow: hidden;
}
</style>
