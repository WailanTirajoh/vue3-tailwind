<script lang="ts">
export default defineComponent({
  name: "TwFile",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import UploadSvg from "../svg/TwUpload.vue";
import IconX from "../svg/TwX.vue";

export interface Props {
  modelValue?: Array<string | File> | null;
  label?: string;
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  label: undefined,
  multiple: false,
});

const emit = defineEmits(["update:modelValue", "update:imageUrls"]);

const imageUrls = ref<string[]>((props.modelValue as string[]) ?? []);
const fileElement = ref<HTMLInputElement>();
const files = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

watch(files, (value) => {
  updateImageUrl(value ?? []);
});

function onDrop(e: DragEvent) {
  e.preventDefault();
  if (!e.dataTransfer) return;
  handleChangeFile(e.dataTransfer.files);
  isHover.value = false;
}

function handleInputImage() {
  if (!fileElement.value || !fileElement.value.files) return;
  handleChangeFile(fileElement.value.files);
}

function handleChangeFile(file: FileList) {
  let fileList;
  if (props.multiple) {
    fileList = Array.from(file).concat((files.value as Array<File>) ?? []);
  } else {
    fileList = Array.from(file);
  }
  files.value = fileList;
}

function updateImageUrl(value: Array<string | File>) {
  if (!value) return;
  const urls = Array.from(value).map((file) => {
    if (typeof file === "string") return file;
    else if (file instanceof File) return URL.createObjectURL(file);
    else return "";
  });
  imageUrls.value = urls;
}

function removeImage(index: number) {
  if (!files.value) return;
  files.value = Array.from(files.value).filter((_, i) => i !== index);
}

function removeAllImage() {
  emit("update:modelValue", []);
  imageUrls.value = [];
  files.value = [];
}

const isHover = ref(false);
function onDragOver(e: DragEvent) {
  e.preventDefault();
  isHover.value = true;
}

function onDragLeave(e: DragEvent) {
  e.preventDefault();
  isHover.value = false;
}
</script>

<template>
  <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
    {{ label }}
  </label>
  <slot
    :image-urls="imageUrls"
    :remove-image="removeImage"
    :remove-all-image="removeAllImage"
    :on-drag-over="onDragOver"
    :handle-drop-image="onDrop"
    :handle-input-image="handleInputImage"
  >
    <div v-if="imageUrls && imageUrls.length > 0">
      <div class="w-full flex items-center justify-center mt-2">
        <div
          class="border rounded-t-lg w-full dark:border-gray-700 overflow-auto relative select-none"
        >
          <div class="grid grid-cols-12 justify-left gap-4 p-4">
            <slot
              name="items"
              :image-urls="imageUrls"
              :remove-image="removeImage"
            >
              <template v-if="props.multiple">
                <div
                  class="relative col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
                  v-for="(url, index) in imageUrls"
                  :key="`form-image-${index}`"
                >
                  <img
                    :src="url"
                    class="h-48 object-cover w-full rounded bg-white dark:bg-gray-900 shadow border dark:border-gray-700"
                    alt="preview"
                  />
                  <div
                    class="cursor-pointer absolute top-2 right-2"
                    @click="removeImage(index)"
                  >
                    <div
                      class="hover:bg-gray-50 dark:hover:bg-gray-900 w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-90"
                    >
                      <IconX />
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div
                  class="relative col-span-12 flex items-center justify-center"
                  v-for="(url, index) in imageUrls"
                  :key="`form-image-${index}`"
                >
                  <div class="relative w-96">
                    <img
                      :src="url"
                      class="object-cover rounded bg-white dark:bg-gray-900 shadow border dark:border-gray-700"
                      alt="preview"
                    />
                    <div
                      class="cursor-pointer absolute top-2 right-2"
                      @click="removeImage(index)"
                    >
                      <div
                        class="hover:bg-gray-50 dark:hover:bg-gray-900 w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-90"
                      >
                        <IconX />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </slot>
          </div>
        </div>
      </div>
      <div class="flex w-full items-center justify-center">
        <label
          @dragover="onDragOver"
          @drop="onDrop"
          @dragleave="onDragLeave"
          class="transition-all ease-in-out w-full flex flex-col items-center px-4 py-6 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700 dark:text-gray-300 text-gray-400 rounded-b-lg tracking-wide uppercase border-dashed border-2 border-gray-500 cursor-pointer"
          :class="{
            'bg-gray-200': isHover,
          }"
        >
          <UploadSvg />
          <span class="mt-2 text-base leading-normal">
            <template v-if="!isHover"> Select or Drop file here </template>
            <template v-else> Drop It </template>
          </span>
          <input
            ref="fileElement"
            type="file"
            style="display: none"
            class="hidden"
            accept="image/png, image/gif, image/jpeg"
            :multiple="props.multiple"
            @change="handleInputImage"
          />
        </label>
      </div>
    </div>
    <div v-else class="flex w-full items-center justify-center">
      <label
        @dragover="onDragOver"
        @drop="onDrop"
        @dragleave="onDragLeave"
        class="transition-all ease-in-out w-full flex flex-col items-center px-4 py-6 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700 dark:text-gray-300 text-gray-400 rounded-lg tracking-wide uppercase border-dashed border-2 border-gray-500 cursor-pointer"
        :class="{
          'bg-gray-200': isHover,
        }"
      >
        <UploadSvg />
        <span class="mt-2 text-base leading-normal">
          <template v-if="!isHover"> Select or Drop file here </template>
          <template v-else> Drop It </template>
        </span>
        <input
          ref="fileElement"
          type="file"
          style="display: none"
          class="hidden"
          accept="image/png, image/gif, image/jpeg"
          :multiple="props.multiple"
          @change="handleInputImage"
        />
      </label>
    </div>
  </slot>
</template>
