<script setup lang="ts">
import {
  TwButton,
  TwFile,
  TwInput,
  TwMultiSelect,
  TwSelect,
  TwToggle,
  TwTextarea,
} from "@/build";
import { reactive, ref } from "vue";
import TwForm from "@/components/form/TwForm.vue";
import useToast from "@/composables/toast";
import TwErrorMessage from "@/components/form/TwErrorMessage.vue";

const formA = ref();
const toast = useToast();

const formData = reactive({
  fileModel: null as null | Array<any>,
  selectExample: null as null | string,
  multiSelectExample: null as null | Array<any>,
  inputExample: null as null | string,
  textAreaExample: null as null | string,
  toggleExample: null as null | boolean,
  rules: {
    inputExample: ["required", "string"],
    textAreaExample: [
      "test",
      "required",
      "string",
      (value: string) => {
        const minLength = 15;
        if (!value || value.length < minLength) {
          return `Min length is ${minLength}, current length is ${
            value ? value.length : 0
          }`;
        }
      },
    ],
    selectExample: [
      "required",
      (value: string, formData: any) => {
        if (
          formData.multiSelectExample &&
          formData.multiSelectExample.includes("test")
        ) {
          if (value !== "test")
            return "Selected multiselect has test, value must be test";
        }
      },
    ],
    toggleExample: [
      "required",
      (value: string) => {
        if (!value) return "Value must be true";
      },
    ],
  },
});

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

const formError = ref(false);

const submit = async () => {
  const validator = formA.value.validator();
  validator.clearErrors();
  await validator.validate();
  if (validator.fail()) {
    toast.error({
      message: validator.getErrorMessage(),
    });

    formError.value = true;

    setTimeout(() => {
      formError.value = false;
    }, 500);
  }
};

const clear = () => {
  formData.fileModel = [];
  formData.selectExample = null;
  formData.multiSelectExample = null;
  formData.inputExample = null;
  formData.textAreaExample = null;
  formData.toggleExample = null;

  const validator = formA.value.validator();
  validator.clearErrors();
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Form</h2>
    <hr class="my-2 border dark:border-gray-700" />
    <div>
      <TwForm
        class="grid grid-cols-12 gap-2 bg-white dark:bg-gray-900 dark:border-gray-700 dark:border rounded-lg p-2 shadow"
        :class="{
          'tw-shake': formError,
        }"
        name="formA"
        ref="formA"
        @submit="submit"
        :rules="formData.rules"
      >
        <div class="col-span-12">
          <TwFile v-model="formData.fileModel" multiple />
        </div>
        <div class="col-span-12">
          <TwInput
            name="inputExample"
            v-model="formData.inputExample"
            label="Input"
            placeholder="Input Field"
            type="text"
          />
          <TwErrorMessage name="inputExample"></TwErrorMessage>
        </div>
        <div class="col-span-12">
          <TwTextarea
            name="textAreaExample"
            v-model="formData.textAreaExample"
            label="Textarea"
            placeholder="Textarea Field"
            type="text"
          />
          <TwErrorMessage name="textAreaExample"></TwErrorMessage>
        </div>
        <div class="col-span-12">
          <TwSelect
            name="selectExample"
            v-model="formData.selectExample"
            :items="selectionList"
            label="Single Select"
            placeholder="Choose select"
          />
          <TwErrorMessage name="selectExample"></TwErrorMessage>
        </div>
        <div class="col-span-12">
          <TwMultiSelect
            name="multiSelectExample"
            v-model="formData.multiSelectExample"
            :items="selectionList"
            label="Multi Select"
            placeholder="Choose select"
          />
          <TwErrorMessage name="multiSelectExample"></TwErrorMessage>
        </div>
        <div class="col-span-12">
          <TwToggle
            id="toggle"
            name="toggleExample"
            v-model="formData.toggleExample"
            label="Toggle"
          />
          <TwErrorMessage name="toggleExample"></TwErrorMessage>
        </div>
        <div class="col-span-12 flex justify-end gap-1">
          <TwButton
            ripple
            variant="secondary"
            type="button"
            class="px-4"
            @click="clear"
          >
            Reset
          </TwButton>
          <TwButton ripple type="submit" class="px-4"> Submit </TwButton>
        </div>
      </TwForm>
    </div>
  </div>
</template>
