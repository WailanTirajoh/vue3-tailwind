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
  modelValue?: Array<string | File>;
  label?: string;
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  label: undefined,
  multiple: false,
});

const emit = defineEmits(["update:modelValue", "update:imageUrls"]);
const stringModelValue = props.modelValue.filter(
  (mv) => typeof mv === "string"
) as string[];
const imageUrls = ref<string[]>(stringModelValue);

const fileElement = ref<HTMLInputElement>();
const files = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

watch(files, () => {
  updateImageUrl();
});

function handleDropImage(e: DragEvent) {
  e.preventDefault();
  if (!e.dataTransfer) return;
  const fileList = Array.from(e.dataTransfer.files).concat(files.value);
  if (!fileList) return;
  files.value = fileList;
}

function handleInputImage() {
  if (!fileElement.value || !fileElement.value.files) return;
  files.value = Array.from(fileElement.value.files).concat(files.value);
}

function updateImageUrl() {
  if (!files.value) return;
  const urls = Array.from(files.value).map((file) => {
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

function onDragOver(e: DragEvent) {
  e.preventDefault();
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
    :handle-drop-image="handleDropImage"
    :handle-input-image="handleInputImage"
  >
    <div class="" v-if="imageUrls && imageUrls.length > 0">
      <div class="w-full flex items-center justify-center mt-2">
        <div
          class="border rounded-t-lg w-full dark:border-gray-700 max-h-96 overflow-auto relative select-none"
        >
          <div class="grid grid-cols-12 justify-left gap-4 p-4">
            <slot
              name="items"
              :image-urls="imageUrls"
              :remove-image="removeImage"
            >
              <TransitionGroup name="list">
                <div
                  class="relative col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
                  v-for="(url, index) in imageUrls"
                  :key="`form-image-${url}`"
                >
                  <img
                    :src="url"
                    class="h-48 object-cover w-full rounded bg-white dark:bg-gray-900 shadow border"
                    alt="preview"
                  />
                  <div
                    class="cursor-pointer absolute top-2 right-2"
                    @click="removeImage(index)"
                  >
                    <div
                      class="hover:bg-gray-50 w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-90"
                    >
                      <IconX />
                    </div>
                  </div>
                </div>
              </TransitionGroup>
            </slot>
          </div>
        </div>
      </div>
      <div class="flex w-full items-center justify-center">
        <label
          @dragover="onDragOver"
          @drop.prevent="handleDropImage"
          class="transition-all ease-in-out w-full flex flex-col items-center px-4 py-6 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700 dark:text-gray-300 text-gray-400 rounded-b-lg tracking-wide uppercase border-dashed border-2 border-gray-500 cursor-pointer"
        >
          <UploadSvg />
          <span class="mt-2 text-base leading-normal">
            Select or Drop file here
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
        @drop.prevent="handleDropImage"
        class="transition-all ease-in-out w-full flex flex-col items-center px-4 py-6 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700 dark:text-gray-300 text-gray-400 rounded-lg tracking-wide uppercase border-dashed border-2 border-gray-500 cursor-pointer"
      >
        <UploadSvg />
        <span class="mt-2 text-base leading-normal">
          Select or Drop file here
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

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
