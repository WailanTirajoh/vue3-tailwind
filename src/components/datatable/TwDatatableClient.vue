<script lang="ts">
export default defineComponent({
  name: "TwDatatableClient",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type {
  DatatableData,
  DatatableColumn,
  DatatableSetting,
} from "../../type";
import { ref, computed, watch, defineComponent } from "vue";
import TwDatatableLoading from "./TwDatatableLoading.vue";
import TwDatatablePagination from "./TwDatatablePagination.vue";
import TwDatatableTd from "./TwDatatableTd.vue";

export interface Props {
  data: Array<DatatableData>;
  column: Array<DatatableColumn>;
  limit: number;
  currentPage?: number;
  totalData?: number;
  isLoading?: boolean;
  search?: string;
  setting?: DatatableSetting;
  selected?: Array<string | never>;
  sortBy?: string;
  sortType?: string;
  summary?: string;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalData: undefined,
  isLoading: false,
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
  sortBy: undefined,
  sortType: "asc",
  summary: "",
});

const emit = defineEmits([
  "on-change-sort",
  "on-enter-search",
  "update:search",
  "update:limit",
  "update:selected",
  "update:sortBy",
  "update:sortType",
  "datatable:column-hook",
]);

const search = ref(props.search);
const currentPage = ref(props.currentPage);
const sortBy = ref(props.sortBy ?? Object.keys(props.column[0])[0]);
const sortType = ref(props.sortType);
const checkAll = ref(false);

const filteredData = computed(() => {
  return props.data.filter((obj) => {
    return Object.keys(obj).some((key) => {
      return (
        typeof obj[key] === "string" &&
        obj[key].toLowerCase().includes(search.value.toLowerCase())
      );
    });
  });
});
const totalData = computed(() => filteredData.value.length);
const totalPage = computed(() => Math.ceil(totalData.value / props.limit));
const showFrom = computed(
  () => 1 + currentPage.value * props.limit - props.limit
);
const showTo = computed(() =>
  currentPage.value * props.limit < totalData.value
    ? currentPage.value * props.limit
    : totalData.value
);

const data = computed(() => {
  let d = filteredData.value;

  // Filter
  d = d.filter((obj) => {
    return Object.keys(obj).some((key) => {
      return (
        typeof obj[key] === "string" &&
        obj[key].toLowerCase().includes(search.value.toLowerCase())
      );
    });
  });

  // Sort Column
  d = d.sort((a, b) => {
    let computedA, computedB;
    switch (typeof a[sortBy.value]) {
      case "string":
        computedA = a[sortBy.value].toLowerCase();
        computedB = b[sortBy.value].toLowerCase();
        break;
      default:
        computedA = a[sortBy.value];
        computedB = b[sortBy.value];
    }

    if (computedA < computedB) return -1;
    if (computedA > computedB) return 1;
    return 0;
  });

  // Sort Type
  if (sortType.value === "desc") d = d.reverse();

  // Limit
  d = d.slice(showFrom.value - 1, showTo.value);

  return d;
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

// update v-model values
watch(sortBy, (value) => emit("update:sortBy", value));
watch(sortType, (value) => emit("update:sortType", value));
watch(search, (value) => emit("update:search", value));
watch(selected, (value) => {
  if (value.length === props.data.length) checkAll.value = true;
  else checkAll.value = false;
});

function clickSort(key: string) {
  emit("on-change-sort", key, props.sortType === "asc" ? "desc" : "asc");
}

function enterSearch() {
  emit("on-enter-search");
}

function columnClick(column: DatatableColumn) {
  if (column.onColumnClick) column.onColumnClick();
  if (column.sortable) {
    clickSort(column.field);
    updateSort(column);
  }
}

function cellClick(cellClick: DatatableColumn) {
  if (cellClick.onCellClick) cellClick.onCellClick();
}

function updateSort(h: DatatableColumn) {
  sortBy.value = h.field;
  sortType.value = sortType.value === "asc" ? "desc" : "asc";
}

function updateCurrentPage(page: number) {
  currentPage.value = page;
}

function checkAllClick() {
  if (checkAll.value) selected.value = [];
  else selected.value = props.data.map((data) => data.id);
}
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
              :key="v.value"
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
          class="vt-block vt-w-full vt-rounded vt-text-gray-600 vt-border dark:vt-border-gray-700 focus:vt-ring-0 focus:vt-outline-none vt-p-2 dark:vt-bg-gray-900 vt-font-normal"
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
                  >
                    <div
                      class="vt-flex vt-justify-center vt-items-center vt-px-2"
                    >
                      <input
                        type="checkbox"
                        v-model="checkAll"
                        @click="checkAllClick"
                      />
                    </div>
                  </th>
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
              <tbody class="vt-text-sm" v-if="data.length > 0">
                <tr
                  class="vt-duration-300 hover:vt-bg-gray-50 dark:vt-bg-gray-800 dark:hover:vt-bg-gray-700 dark:vt-border-gray-700"
                  v-for="(d, i) in data"
                  :key="`body-${i}`"
                >
                  <td
                    class="vt-duration-300 vt-p-1 vt-bg-white dark:vt-bg-gray-800 dark:hover:vt-bg-gray-700 vt-relative dark:vt-border-gray-600 first:vt-rounded-l-lg last:vt-rounded-r-lg vt-py-4"
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
                  </td>
                  <TwDatatableTd
                    class="vt-duration-300 vt-p-1 vt-bg-white dark:vt-bg-gray-800 dark:hover:vt-bg-gray-700 vt-relative dark:vt-border-gray-600 first:vt-rounded-l-lg last:vt-rounded-r-lg vt-py-4"
                    style="box-shadow: 20px 3px 20px #0000000b"
                    :copyText="d[h.field] ?? ''"
                    v-for="h in props.column"
                    :key="`body-${i}-${h.field}`"
                  >
                    <slot
                      name="row"
                      :column="h"
                      :data="d"
                      :index="i"
                      @click="cellClick"
                    >
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
              </tbody>
              <tbody class="vt-text-sm" v-else>
                <tr
                  class="vt-duration-300 hover:vt-bg-gray-50 dark:vt-bg-gray-800 dark:hover:vt-bg-gray-900 dark:vt-border-gray-700"
                >
                  <td
                    class="vt-duration-300 vt-p-1 hover:vt-bg-gray-100 vt-border dark:hover:vt-bg-gray-900 vt-relative dark:vt-border-gray-600"
                    :colspan="props.column.length + (setting.checkbox ? 1 : 0)"
                  >
                    <slot name="empty"></slot>
                  </td>
                </tr>
              </tbody>
            </slot>
          </table>
        </div>
        <TwDatatableLoading :show="isLoading" />
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
            class="vt-text-xs"
          />
        </div>
      </div>
    </div>
  </div>
</template>
