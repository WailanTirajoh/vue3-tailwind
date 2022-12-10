<script setup lang="ts">
import { ref } from "vue";
import TwFile from "./components/form/TwFile.vue";
import TwInput from "./components/form/TwInput.vue";
import TwMultiSelect from "./components/form/TwMultiSelect.vue";
import TwSelect from "./components/form/TwSelect.vue";
import TwToggle from "./components/form/TwToggle.vue";

const fileModel = ref([]);
const selectExample = ref();
const multiSelectExample = ref([]);
const inputExample = ref();
const toggleExample = ref();

const selectionList = [
  {
    label: "test",
    value: "test",
  },
  {
    label: "test2",
    value: "test2",
  },
  {
    label: "test3",
    value: "test3",
  },
];
</script>

<template>
  <div class="flex justify-center py-4 bg-gray-100 h-screen">
    <div class="container">
      <div class="grid grid-cols-12">
        <div class="col-span-12">
          <TwFile v-model="fileModel" />
          <div class="">Result:</div>
          <pre>{{ fileModel }}</pre>
        </div>
        <div class="col-span-12 my-2">
          <hr />
        </div>
        <div class="col-span-12">
          <TwInput
            v-model="inputExample"
            label="Input"
            placeholder="Input Field"
            type="text"
          />
          <div class="">Result:</div>
          <pre>{{ inputExample }}</pre>
        </div>
        <div class="col-span-12 my-2">
          <hr />
        </div>
        <div class="col-span-12">
          <TwSelect
            v-model="selectExample"
            :items="selectionList"
            label="Single Select"
            placeholder="Choose select"
          />
          <div class="">Result:</div>
          <pre>{{ selectExample }}</pre>
        </div>
        <div class="col-span-12 my-2">
          <hr />
        </div>
        <div class="col-span-12">
          <TwMultiSelect
            v-model="multiSelectExample"
            :items="selectionList"
            label="Multi Select"
            placeholder="Choose select"
          />
          <div class="">Result:</div>
          <pre>{{ multiSelectExample }}</pre>
        </div>
        <div class="col-span-12 my-2">
          <hr />
        </div>
        <div class="col-span-12">
          <TwToggle v-model="toggleExample" label="Toggle" />
          <div class="">Result:</div>
          <pre>{{ toggleExample }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
