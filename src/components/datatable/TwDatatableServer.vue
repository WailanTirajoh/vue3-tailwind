<script setup lang="ts">
/**
 * Uncomplete
 * TODO:
 * - create ajax callback
 * - show / hide column
 * - sort column
 * - filter on each column
 */
import { computed } from "vue";
import type { Data, Column, Setting } from "./type";

interface Props {
  // Required props
  data: Array<Data>;
  column: Array<Column>;
  currentPage: number;
  limit: number;
  totalData: number;
  // Optional props
  isLoading?: boolean;
  sortBy?: string;
  sortType?: string;
  summary?: string;
  search?: string;
  setting?: Setting;
  selected?: Array<string | never>;
}

const props = defineProps<Props>();
const emit = defineEmits([
  "on-sort-change",
  "on-enter-search",
  "update:search",
  "update:limit",
  "update:selected",
]);

const totalPage = computed(() => Math.ceil(props.totalData / props.limit));
const showFrom = computed(
  () => 1 + props.currentPage * props.limit - props.limit
);
const showTo = computed(() =>
  props.currentPage * props.limit < props.totalData
    ? props.currentPage * props.limit
    : props.totalData
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

const setting: Setting = props.setting ?? {
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

const clickSort = (key: string) =>
  emit("on-sort-change", key, props.sortType === "asc" ? "desc" : "asc");
const enterSearch = () => emit("on-enter-search");
const thClick = (h: Column) => {
  clickSort(h.field);
  if (h.onColumnClick) {
    h.onColumnClick();
  }
};

const cellClick = (c: Column) => {
  if (c.onCellClick) c.onCellClick();
};
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
        <div
          class="overflow-auto table-fix-head shadow-sm dark:border dark:border-gray-700"
        >
          <table
            class="w-full bg-white k-datatable resizable"
            :summary="summary"
          >
            <thead
              class="bg-gray-100 dark:bg-gray-900 dark:border-b dark:border-gray-700 text-gray-800"
            >
              <tr>
                <th
                  v-if="setting.checkbox"
                  class="p-1 whitespace-nowrap select-none hover:bg-gray-200 dark:hover:bg-black border dark:border-gray-600 px-5"
                ></th>
                <th
                  class="p-2 whitespace-nowrap select-none hover:bg-gray-200 dark:hover:bg-black border dark:border-gray-600 px-10"
                  :class="{
                    asc: sortBy == h.field && sortType == 'asc',
                    desc: sortBy == h.field && sortType == 'desc',
                    sorting: h.sortable,
                  }"
                  :style="{ width: h.width }"
                  @click="thClick(h)"
                  v-for="h in props.column"
                  :key="h.field"
                >
                  {{ h.label }}
                </th>
              </tr>
            </thead>
            <tbody class="text-sm" v-if="data.length > 0">
              <tr
                class="duration-300 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700"
                v-for="(d, i) in data"
                :key="`body-row-${i}`"
              >
                <td
                  class="duration-300 p-1 hover:bg-gray-100 border dark:hover:bg-gray-900 relative dark:border-gray-600"
                  v-if="setting.checkbox"
                  :style="{
                    width: '20px',
                  }"
                >
                  <div class="flex justify-center items-center">
                    <input
                      type="checkbox"
                      :value="d['id']"
                      v-model="selected"
                    />
                  </div>
                </td>
                <TwDatatableTd
                  class="duration-300 p-1 hover:bg-gray-100 border dark:hover:bg-gray-900 relative dark:border-gray-600"
                  :copyText="d[h.field]"
                  v-for="(h, i) in props.column"
                  :key="`datatable-td-${i}`"
                >
                  <slot name="row" :column="h" :data="d" :index="i"> </slot>
                  <div
                    v-if="h.template"
                    v-html="h.template(d, i)"
                    @click="cellClick(h)"
                  ></div>
                  <div v-else @click="cellClick(h)">
                    {{ d[h.field] }}
                  </div>
                </TwDatatableTd>
              </tr>
            </tbody>
            <tbody class="text-sm" v-else>
              <tr
                class="duration-300 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700"
              >
                <td
                  class="duration-300 p-1 hover:bg-gray-100 border dark:hover:bg-gray-900 relative dark:border-gray-600"
                  :colspan="props.column.length + (setting.checkbox ? 1 : 0)"
                >
                  <slot name="empty"></slot>
                </td>
              </tr>
            </tbody>
            <tfoot
              class="bg-gray-100 dark:bg-gray-900 dark:border-b dark:border-gray-700 text-gray-800"
            >
              <tr>
                <th
                  v-if="setting.checkbox"
                  class="p-1 whitespace-nowrap select-none hover:bg-gray-200 dark:hover:bg-black border dark:border-gray-600 px-5"
                  :style="{
                    width: '20px',
                  }"
                ></th>
                <th
                  class="p-2 whitespace-nowrap select-none hover:bg-gray-200 dark:hover:bg-black border dark:border-gray-600"
                  :class="{
                    asc: sortBy == h.field && sortType == 'asc',
                    desc: sortBy == h.field && sortType == 'desc',
                    sorting: h.sortable,
                  }"
                  :style="{ width: h.width }"
                  @click="cellClick(h)"
                  v-for="h in props.column"
                  :key="`tfoot-th-${h.field}`"
                >
                  {{ h.label }}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
        <TwDatatableLoading :show="isLoading" />
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