<script lang="ts">
export default defineComponent({
  name: "TwDatatablePagination",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { computed, defineComponent } from "vue";

export interface Props {
  currentPage: number;
  totalData: number;
  totalPage: number;
  isLoading?: boolean;
  eachSide?: number;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  eachSide: 3,
});

const emit = defineEmits(["change-current-page"]);

const arrEachSide = computed(() => {
  const each = [];
  let eachSide = props.eachSide;
  while (eachSide > 0) {
    each.push(eachSide);
    eachSide--;
  }
  return each;
});

function changeCurrentPage(page: number) {
  emit("change-current-page", page);
}
</script>

<template>
  <div class="vt-flex">
    <button
      aria-label="pagination-prev-button"
      class="vt-p-1 vt-flex vt-justify-center vt-items-center vt-w-8 vt-h-8 vt-transition-all vt-ease-in-out"
      :class="{
        'vt-cursor-not-allowed': currentPage - 1 < 1,
        'vt-cursor-wait': isLoading,
      }"
      :disabled="currentPage - 1 < 1 || isLoading"
      @click="changeCurrentPage(currentPage - 1)"
    >
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
        <path
          d="M5.50033 9.52084L5.91699 9.12501C6.00033 9.02084 6.00033 8.85418 5.91699 8.77084L2.14616 5.00001L5.91699 1.20834C6.00033 1.12501 6.00033 0.958344 5.91699 0.854177L5.50033 0.458343C5.39616 0.354176 5.25033 0.354176 5.14616 0.458343L0.771159 4.81251C0.687826 4.91668 0.687826 5.06251 0.771159 5.16668L5.14616 9.52084C5.25033 9.62501 5.39616 9.62501 5.50033 9.52084Z"
          fill="#757575"
        />
      </svg>
    </button>
    <button
      class="vt-p-1 vt-flex vt-justify-center vt-items-center vt-w-8 vt-h-8 vt-transition-all vt-ease-in-out vt-overflow-hidden"
      :class="{
        '': currentPage != 1,
        'vt-bg-white dark:vt-bg-gray-700 vt-rounded-lg': currentPage == 1,
        'vt-cursor-wait': isLoading,
      }"
      :disabled="isLoading"
      @click="changeCurrentPage(1)"
    >
      1
    </button>
    <template v-if="totalPage > 2">
      <template v-if="totalPage - eachSide <= currentPage">
        <div v-for="index in arrEachSide" :key="index">
          <button
            v-if="totalPage - index > 1"
            class="vt-p-1 vt-flex vt-justify-center vt-items-center vt-w-8 vt-h-8 vt-transition-all vt-ease-in-out vt-overflow-hidden"
            :class="{
              '': currentPage != totalPage - index,
              'vt-bg-white dark:vt-bg-gray-700 vt-rounded-lg':
                currentPage == totalPage - index,
              'vt-cursor-wait': isLoading,
            }"
            :disabled="isLoading"
            @click="changeCurrentPage(totalPage - index)"
          >
            {{ totalPage - index }}
          </button>
        </div>
      </template>
      <template v-else>
        <div v-for="index in eachSide" :key="index">
          <button
            v-if="index - 2 + currentPage > 1"
            class="vt-p-1 vt-flex vt-justify-center vt-items-center vt-w-8 vt-h-8 vt-transition-all vt-ease-in-out vt-overflow-hidden"
            :class="{
              '': currentPage != index - 2 + currentPage,
              'vt-bg-white dark:vt-bg-gray-700 vt-rounded-lg':
                currentPage == index - 2 + currentPage,
              'vt-cursor-wait': isLoading,
            }"
            :disabled="isLoading"
            @click="changeCurrentPage(index - 2 + currentPage)"
          >
            {{ index - 2 + currentPage }}
          </button>
        </div>
        <button
          v-if="currentPage === 1"
          class="vt-p-2 vt-flex vt-justify-center vt-items-center vt-w-8 vt-h-8 vt-transition-all vt-ease-in-out"
          :class="{
            'vt-cursor-wait': isLoading,
          }"
          :disabled="isLoading"
          @click="changeCurrentPage(3)"
        >
          3
        </button>
        <button
          v-if="currentPage === 2 || currentPage === 1"
          class="vt-p-2 vt-flex vt-justify-center vt-items-center vt-w-8 vt-h-8 vt-transition-all vt-ease-in-out"
          :class="{
            'vt-cursor-wait': isLoading,
          }"
          :disabled="isLoading"
          @click="changeCurrentPage(4)"
        >
          4
        </button>
      </template>
    </template>
    <button
      v-if="totalPage - 1 > 0"
      class="vt-p-1 vt-flex vt-justify-center vt-items-center vt-w-8 vt-h-8 vt-transition-all vt-ease-in-out vt-overflow-hidden"
      :class="{
        '': currentPage != totalPage,
        'vt-bg-white dark:vt-bg-gray-700 vt-rounded-lg':
          currentPage == totalPage,
        'vt-cursor-wait': isLoading,
      }"
      :disabled="isLoading"
      @click="changeCurrentPage(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      aria-label="pagination-next-button"
      class="vt-p-1 vt-flex vt-justify-center vt-items-center vt-w-8 vt-h-8 vt-transition-all vt-ease-in-out"
      :class="{
        'vt-cursor-not-allowed': currentPage + 1 > totalPage,
        'vt-cursor-wait': isLoading,
      }"
      :disabled="currentPage + 1 > totalPage || isLoading"
      @click="changeCurrentPage(currentPage + 1)"
    >
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
        <path
          d="M0.499674 0.479156L0.0830078 0.87499C-0.000325521 0.979156 -0.000325521 1.14582 0.0830078 1.22916L3.85384 4.99999L0.0830078 8.79166C-0.000325521 8.87499 -0.000325521 9.04166 0.0830078 9.14582L0.499674 9.54166C0.603841 9.64582 0.749674 9.64582 0.853841 9.54166L5.22884 5.18749C5.31217 5.08332 5.31217 4.93749 5.22884 4.83332L0.853841 0.479156C0.749674 0.37499 0.603841 0.37499 0.499674 0.479156Z"
          fill="#757575"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.vt-text-red-cst {
  color: #339eff;
}

.dark .vt-text-red-cst {
  color: #ebebeb;
}
</style>
