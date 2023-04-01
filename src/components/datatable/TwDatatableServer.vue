<script lang="ts">
export default defineComponent({
  name: "TwDatatableServer",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
/**
 * Uncomplete
 * TODO:
 * - create ajax callback
 * - show / hide column
 * - sort column
 * - filter on each column
 */
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import type {
  DatatableData,
  DatatableColumn,
  DatatableSetting,
} from "../../type";
import TwDatatablePagination from "./TwDatatablePagination.vue";
import TwDatatableLoading from "./TwDatatableLoading.vue";
import TwDatatableTd from "./TwDatatableTd.vue";

export interface Props {
  // Required props
  column: Array<DatatableColumn>;
  limit: number;
  offset: number;
  fetchData: () => Promise<{
    totalData: number;
    data: Array<DatatableData>;
  }>;
  // Optional props
  isLoading?: boolean;
  sortBy?: string;
  sortType?: string;
  summary?: string;
  search?: string;
  setting?: DatatableSetting;
  selected?: Array<string | never>;
}

const data = ref<Array<DatatableData>>([]);
const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  sortBy: "",
  sortType: "asc",
  summary: "",
  search: "",
  setting: () => ({
    checkbox: false,
    limitOption: [
      {
        label: "5",
        value: 5,
      },
      {
        label: "10",
        value: 10,
      },
      {
        label: "50",
        value: 50,
      },
      {
        label: "100",
        value: 100,
      },
      {
        label: "200",
        value: 200,
      },
    ],
  }),
  selected: () => [],
});
const emit = defineEmits([
  "on-sort-change",
  "on-enter-search",
  "update:search",
  "update:limit",
  "update:offset",
  "update:selected",
]);

const isFetching = ref(false);
const totalData = ref(0);

const totalPage = computed(() => Math.ceil(totalData.value / props.limit));
const currentPage = computed(() => props.offset / props.limit + 1);
const showFrom = computed(
  () => 1 + currentPage.value * props.limit - props.limit
);

const showTo = computed(() =>
  currentPage.value * props.limit < totalData.value
    ? currentPage.value * props.limit
    : totalData.value
);

// v-model props
const search = computed({
  get() {
    return props.search ?? "";
  },
  set(value: string) {
    emit("update:search", value);
  },
});

const limit = computed({
  get() {
    return props.limit;
  },
  set(value: number) {
    emit("update:limit", value);
    emit("update:offset", 0);
  },
});

const offset = computed({
  get() {
    return props.offset;
  },
  set(value: number) {
    emit("update:offset", value);
  },
});

const selected = computed({
  get() {
    return props.selected;
  },
  set(value: Array<string>) {
    emit("update:selected", value);
  },
});

function updateCurrentPage(page: number) {
  offset.value = (page - 1) * limit.value;
}

function clickSort(key: string) {
  emit("on-sort-change", key, props.sortType === "asc" ? "desc" : "asc");
}

function enterSearch() {
  emit("on-enter-search");
  emit("update:offset", 0);
  fetchResult();
}

function columnClick(h: DatatableColumn) {
  clickSort(h.field);
  if (h.onColumnClick) {
    h.onColumnClick();
  }
  fetchResult();
}

async function fetchResult() {
  try {
    isFetching.value = true;
    const response = await props.fetchData();
    data.value = response.data;
    totalData.value = response.totalData;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`Fetch Data Error:`, e.message);
      console.error(e);
    }
  } finally {
    isFetching.value = false;
  }
}

function cellClick(column: DatatableColumn) {
  if (column.onCellClick) column.onCellClick();
}

watch(limit, () => {
  fetchResult();
});

watch(offset, () => {
  fetchResult();
});

onMounted(async () => {
  fetchResult();
});
</script>

<template>
  <div class="vt-grid vt-grid-cols-12 vt-gap-4">
    <div
      class="vt-col-span-12 vt-flex vt-justify-between vt-items-center vt-gap-8 vt-text-xs"
    >
      <div class="vt-flex vt-gap-2 vt-items-center">
        <div>Show</div>
        <div>
          <select
            v-model="limit"
            class="vt-p-2 vt-rounded vt-border dark:vt-bg-gray-900 vt-appearance-none focus:vt-border dark:vt-border-gray-700 focus:vt-ring-0 focus:vt-outline-none vt-custor-pointer"
          >
            <option
              :value="v.value"
              v-for="v in setting.limitOption"
              :key="v.label"
            >
              {{ v.label }}
            </option>
          </select>
        </div>
        <div>entries</div>
      </div>
      <div>
        <input
          v-model="search"
          type="text"
          class="vt-block vt-w-full vt-rounded vt-text-gray-600 vt-border dark:vt-border-gray-700 focus:vt-ring-0 focus:vt-outline-none vt-p-2 vt-bg-white dark:vt-bg-gray-900 vt-font-normal"
          placeholder="Type something and press enter . . ."
          @keyup.enter="enterSearch()"
        />
      </div>
    </div>
    <div class="vt-col-span-12">
      <div class="vt-relative">
        <div class="vt-overflow-auto vt-table-fix-head">
          <table
            class="vt-tw-datatable vt-resizable vt-w-full vt-rounded-lg vt-border-separate vt-border-spacing-y-4"
            :summary="summary"
          >
            <slot name="thead" :data="data" :column="props.column">
              <thead>
                <tr>
                  <th
                    v-if="setting.checkbox"
                    :style="{
                      width: '20px',
                    }"
                  ></th>
                  <slot
                    name="column"
                    :column="props.column"
                    :sort-type="sortType"
                    :sort-by="sortBy"
                  >
                    <th
                      class="vt-select-none"
                      :class="{
                        asc: sortBy == h.field && sortType == 'asc',
                        desc: sortBy == h.field && sortType == 'desc',
                        sorting: h.sortable,
                      }"
                      :style="{ width: h.width }"
                      @click="columnClick(h)"
                      v-for="h in props.column"
                      :key="h.field"
                    >
                      {{ h.label }}
                    </th>
                  </slot>
                </tr>
              </thead>
            </slot>
            <slot name="tbody" :data="data" :column="props.column">
              <tbody class="vt-text-sm">
                <template v-if="data.length > 0">
                  <tr
                    class="vt-duration-300 hover:vt-bg-gray-50 dark:vt-bg-gray-800 dark:hover:vt-bg-gray-700 dark:vt-border-gray-700"
                    v-for="(d, i) in data"
                    :key="`body-row-${i}`"
                  >
                    <TwDatatableTd
                      class="vt-duration-300 vt-p-1 vt-bg-white hover:vt-bg-gray-50 dark:vt-bg-gray-800 dark:hover:vt-bg-gray-700 vt-relative dark:vt-border-gray-600 first:vt-rounded-l-lg last:vt-rounded-r-lg vt-py-4"
                      style="box-shadow: 20px 3px 20px #0000000b"
                      v-if="setting.checkbox"
                      :style="{
                        width: '20px',
                      }"
                    >
                      <div
                        class="vt-flex vt-justify-center vt-items-center vt-px-2"
                      >
                        <input
                          type="checkbox"
                          :value="d['id']"
                          v-model="selected"
                        />
                      </div>
                    </TwDatatableTd>
                    <TwDatatableTd
                      class="vt-duration-300 vt-p-1 vt-bg-white hover:vt-bg-gray-50 dark:vt-bg-gray-800 dark:hover:vt-bg-gray-700 vt-relative dark:vt-border-gray-600 first:vt-rounded-l-lg last:vt-rounded-r-lg vt-py-4"
                      :copyText="d[h.field]"
                      v-for="(h, i) in props.column"
                      :key="`datatable-td-${i}`"
                    >
                      <slot name="row" :column="h" :data="d" :index="i">
                        <div
                          v-if="h.template"
                          v-html="h.template(d, i)"
                          @click="cellClick(h)"
                        ></div>
                        <div v-else @click="cellClick(h)">
                          {{ d[h.field] }}
                        </div>
                      </slot>
                    </TwDatatableTd>
                  </tr>
                </template>
                <template v-else>
                  <tr
                    class="vt-duration-300 vt-bg-white hover:vt-bg-gray-50 dark:vt-bg-gray-800 dark:hover:vt-bg-gray-900 dark:vt-border-gray-700"
                  >
                    <TwDatatableTd
                      class="vt-duration-300 vt-p-1 vt-bg-white hover:vt-bg-gray-50 dark:vt-bg-gray-800 dark:hover:vt-bg-gray-700 vt-relative dark:vt-border-gray-600 first:vt-rounded-l-lg last:vt-rounded-r-lg vt-py-4"
                      :colspan="
                        props.column.length + (setting.checkbox ? 1 : 0)
                      "
                    >
                      <slot name="empty">
                        <div class="vt-p-2 vt-rounded">No Data Available</div>
                      </slot>
                    </TwDatatableTd>
                  </tr>
                </template>
              </tbody>
            </slot>
          </table>
        </div>
        <TwDatatableLoading :show="isFetching" />
      </div>
    </div>
    <div class="vt-col-span-12">
      <div
        v-if="totalData > 0"
        class="vt-flex vt-items-center vt-justify-between"
      >
        <div class="vt-text-xs">
          Showing from {{ showFrom }} to {{ showTo }} of total
          {{ totalData }} data
        </div>
        <div>
          <TwDatatablePagination
            :current-page="currentPage"
            :total-data="totalData"
            :total-page="totalPage"
            :is-loading="isLoading"
            :per-page="limit"
            @change-current-page="updateCurrentPage"
            class="vt-text-xs vt-shadow-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>
