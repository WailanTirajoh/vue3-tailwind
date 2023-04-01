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
  <label
    v-if="label"
    class="vt-font-bold vt-text-gray-700 dark:vt-text-gray-400"
  >
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
      <div class="vt-w-full vt-flex vt-items-center vt-justify-center vt-mt-2">
        <div
          class="vt-border vt-rounded-t-lg vt-w-full dark:vt-border-gray-700 vt-overflow-auto vt-relative vt-select-none"
        >
          <div class="vt-grid vt-grid-cols-12 vt-justify-left vt-gap-4 vt-p-4">
            <slot
              name="items"
              :image-urls="imageUrls"
              :remove-image="removeImage"
            >
              <template v-if="props.multiple">
                <div
                  class="vt-relative vt-col-span-6 sm:vt-col-span-4 md:vt-col-span-3 lg:vt-col-span-2"
                  v-for="(url, index) in imageUrls"
                  :key="`form-image-${index}`"
                >
                  <img
                    :src="url"
                    class="vt-h-48 vt-object-cover vt-w-full vt-rounded vt-bg-white dark:vt-bg-gray-900 vt-shadow vt-border dark:vt-border-gray-700"
                    alt="preview"
                  />
                  <div
                    class="vt-cursor-pointer vt-absolute vt-top-2 vt-right-2"
                    @click="removeImage(index)"
                  >
                    <div
                      class="hover:vt-bg-gray-50 dark:hover:vt-bg-gray-900 vt-w-8 vt-h-8 vt-rounded-full vt-flex vt-items-center vt-justify-center hover:vt-bg-opacity-90"
                    >
                      <IconX />
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div
                  class="vt-relative vt-col-span-12 vt-flex vt-items-center vt-justify-center"
                  v-for="(url, index) in imageUrls"
                  :key="`form-image-${index}`"
                >
                  <div class="vt-relative vt-w-96">
                    <img
                      :src="url"
                      class="vt-object-cover vt-rounded vt-bg-white dark:vt-bg-gray-900 vt-shadow vt-border dark:vt-border-gray-700"
                      alt="preview"
                    />
                    <div
                      class="vt-cursor-pointer vt-absolute vt-top-2 vt-right-2"
                      @click="removeImage(index)"
                    >
                      <div
                        class="hover:vt-bg-gray-50 dark:hover:vt-bg-gray-900 vt-w-8 vt-h-8 vt-rounded-full vt-flex vt-items-center vt-justify-center hover:vt-bg-opacity-90"
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
      <div class="vt-flex vt-w-full vt-items-center vt-justify-center">
        <label
          @dragover="onDragOver"
          @drop="onDrop"
          @dragleave="onDragLeave"
          class="vt-transition-all vt-ease-in-out vt-w-full vt-flex vt-flex-col vt-items-center vt-px-4 vt-py-6 vt-bg-white hover:vt-bg-gray-100 dark:vt-bg-gray-800 dark:hover:vt-bg-gray-900 dark:vt-border-gray-700 dark:vt-text-gray-300 vt-text-gray-400 vt-rounded-b-lg vt-tracking-wide vt-uppercase vt-border-dashed vt-border-2 vt-border-gray-500 vt-cursor-pointer"
          :class="{
            'vt-bg-gray-200': isHover,
          }"
        >
          <UploadSvg />
          <span class="vt-mt-2 vt-text-base vt-leading-normal">
            <template v-if="!isHover"> Select or Drop file here </template>
            <template v-else> Drop It </template>
          </span>
          <input
            ref="fileElement"
            type="file"
            style="display: none"
            class="vt-hidden"
            accept="image/png, image/gif, image/jpeg"
            :multiple="props.multiple"
            @change="handleInputImage"
          />
        </label>
      </div>
    </div>
    <div v-else class="vt-flex vt-w-full vt-items-center vt-justify-center">
      <label
        @dragover="onDragOver"
        @drop="onDrop"
        @dragleave="onDragLeave"
        class="vt-transition-all vt-ease-in-out vt-w-full vt-flex vt-flex-col vt-items-center vt-px-4 vt-py-6 vt-bg-white hover:vt-bg-gray-100 dark:vt-bg-gray-800 dark:hover:vt-bg-gray-900 dark:vt-border-gray-700 dark:vt-text-gray-300 vt-text-gray-400 vt-rounded-lg vt-tracking-wide vt-uppercase vt-border-dashed vt-border-2 vt-border-gray-500 vt-cursor-pointer"
        :class="{
          'vt-bg-gray-200': isHover,
        }"
      >
        <UploadSvg />
        <span class="vt-mt-2 vt-text-base vt-leading-normal">
          <template v-if="!isHover"> Select or Drop file here </template>
          <template v-else> Drop It </template>
        </span>
        <input
          ref="fileElement"
          type="file"
          style="display: none"
          class="vt-hidden"
          accept="image/png, image/gif, image/jpeg"
          :multiple="props.multiple"
          @change="handleInputImage"
        />
      </label>
    </div>
  </slot>
</template>
