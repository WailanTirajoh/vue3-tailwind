<script setup lang="ts">
/**
 * Uncomplete
 * TODO:
 * - create ajax callback
 * - show / hide column
 * - sort column
 * - filter on each column
 */
import { computed, onMounted, ref, watch } from "vue";
import type { DatatableData, DatatableColumn, DatatableSetting } from "../type";
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
const props = defineProps<Props>();
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
    return props.selected ?? [];
  },
  set(value: Array<string>) {
    emit("update:selected", value);
  },
});

const updateCurrentPage = (page: number) => {
  offset.value = (page - 1) * limit.value;
};

const setting: DatatableSetting = props.setting ?? {
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
};

const clickSort = (key: string) => {
  emit("on-sort-change", key, props.sortType === "asc" ? "desc" : "asc");
};

const enterSearch = () => {
  emit("on-enter-search");
  emit("update:offset", 0);
  fetchResult();
};

const columnClick = (h: DatatableColumn) => {
  clickSort(h.field);
  if (h.onColumnClick) {
    h.onColumnClick();
  }
  fetchResult();
};

const fetchResult = async () => {
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
};

const cellClick = (column: DatatableColumn) => {
  if (column.onCellClick) column.onCellClick();
};

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
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 flex justify-between items-center gap-8 text-xs">
      <div class="flex gap-2 items-center">
        <div>Show</div>
        <div>
          <select
            v-model="limit"
            class="p-2 rounded bg-white dark:bg-gray-900 appearance-none focus:border-transparent focus:ring-0 focus:outline-none custor-pointer"
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
      <div class="w-full md:w-48 flex items-center">
        <input
          v-model="search"
          type="text"
          class="block w-full rounded text-gray-600 border dark:border-gray-700 focus:ring-0 focus:outline-none p-2 bg-white dark:bg-gray-900 font-normal"
          placeholder="Type something and press enter . . ."
          @keyup.enter="enterSearch()"
        />
      </div>
    </div>
    <div class="col-span-12">
      <div class="relative">
        <div class="overflow-auto table-fix-head">
          <table
            class="w-full k-datatable resizable rounded-lg border-separate border-spacing-y-4"
            :summary="summary"
          >
            <thead
              class="bg-gray-100 dark:bg-gray-900 dark:border-b dark:border-gray-700 text-gray-800"
            >
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
                    class="select-none"
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
            <tbody class="text-sm">
              <template v-if="data.length > 0">
                <tr
                  class="duration-300 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                  v-for="(d, i) in data"
                  :key="`body-row-${i}`"
                >
                  <TwDatatableTd
                    class="duration-300 p-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 relative dark:border-gray-600 first:rounded-l-lg last:rounded-r-lg py-4"
                    style="box-shadow: 20px 3px 20px #0000000b"
                    v-if="setting.checkbox"
                    :style="{
                      width: '20px',
                    }"
                  >
                    <div class="flex justify-center items-center px-2">
                      <input
                        type="checkbox"
                        :value="d['id']"
                        v-model="selected"
                      />
                    </div>
                  </TwDatatableTd>
                  <TwDatatableTd
                    class="duration-300 p-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 relative dark:border-gray-600 first:rounded-l-lg last:rounded-r-lg py-4"
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
              <tempalte v-else>
                <tr
                  class="duration-300 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700"
                >
                  <td
                    class="duration-300 p-1 hover:bg-gray-100 border dark:hover:bg-gray-900 relative dark:border-gray-600"
                    :colspan="props.column.length + (setting.checkbox ? 1 : 0)"
                  >
                    <slot name="empty">
                      <div class="p-2 rounded">No Data Available</div>
                    </slot>
                  </td>
                </tr>
              </tempalte>
            </tbody>
          </table>
        </div>
        <TwDatatableLoading :show="isFetching" />
      </div>
    </div>
    <div class="col-span-12">
      <div v-if="totalData > 0" class="flex items-center justify-between">
        <div class="text-xs">
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
            class="text-xs shadow-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.k-datatable .sorting {
  position: relative;
  cursor: pointer;
}

.k-datatable .sorting::after {
  content: "\2304";
  font-size: 0.6rem;
  top: 0.75rem;
  position: absolute;
  right: 0.5rem;
  opacity: 0.35;
}

.k-datatable .sorting::before {
  content: "\2303";
  font-size: 0.6rem;
  top: 0.75rem;
  position: absolute;
  right: 0.5rem;
  opacity: 0.35;
}

.k-datatable .sorting.desc::after {
  opacity: 1;
}

.k-datatable .sorting.asc::before {
  opacity: 1;
}
</style>
