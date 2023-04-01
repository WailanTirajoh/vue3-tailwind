<script lang="ts">
export default defineComponent({
  name: "TwToastItem",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useToast } from "@/composables/toast";
import type { ToastType } from "../../type";
import { TwFeather } from "..";

export interface Props {
  id: string;
  message?: string;
  html?: string;
  lifetime?: number;
  type: ToastType;
  jsonMessage?: object | null;
  title?: string | null;
  showLifetime?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  message: "",
  html: "",
  lifetime: 5000,
  jsonMessage: null,
  title: null,
  showLifetime: true,
});

const type = ref(props.type);
const isShown = ref(false);
const lifetime = ref(props.lifetime);
const interval = ref();
const hover = ref(false);
const toast = useToast();

const classType = computed(() => {
  switch (props.type) {
    case "success":
      return { "vt-border-t-green-600 dark:vt-border-t-gray-600": true };
    case "info":
      return { "vt-border-t-sky-400 dark:vt-border-t-sky-600": true };
    case "error":
      return {
        "vt-border-t-red-600 dark:vt-border-t-gray-600": true,
        error: true,
      };
    case "warning":
      return { "vt-border-t-yellow-600 dark:vt-border-t-gray-600": true };
    default:
      return { "vt-border-t-green-600 dark:vt-border-t-gray-600": true };
  }
});

const iconType = computed(() => {
  switch (props.type) {
    case "success":
      return "check-circle";
    case "info":
      return "message-circle";
    case "error":
      return "alert-circle";
    case "warning":
      return "alert-circle";
    default:
      return "help-circle";
  }
});

const textColor = computed(() => {
  switch (props.type) {
    case "success":
      return "vt-text-green-800 dark:vt-text-gray-300";
    case "info":
      return "vt-text-sky-800 dark:vt-text-gray-300";
    case "error":
      return "vt-text-red-800 dark:vt-text-gray-300";
    case "warning":
      return "vt-text-yellow-800 dark:vt-text-gray-300";
    default:
      return "vt-text-gray-800 dark:vt-text-gray-300";
  }
});

const lifetimePercent = computed(() => (lifetime.value / props.lifetime) * 100);

const barStyle = computed(() => `width: ${lifetimePercent.value}%`);

onMounted(() => {
  isShown.value = true;
  interval.value = setInterval(() => {
    if (!hover.value) lifetime.value -= 10;
    if (lifetime.value < 1) {
      removeToast();
    }
  }, 10);
});

function removeToast() {
  clearInterval(interval.value);
  toast.removeToast(props.id);
}
</script>

<template>
  <div :class="type">
    <transition name="toast">
      <div
        class="vt-text-center vt-relative vt-text-gray-800 dark:vt-text-gray-300"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
      >
        <div
          class="vt-py-3 vt-pt-1 vt-px-2 vt-shadow vt-bg-opacity-95 vt-rounded vt-relative vt-max-h-60 vt-overflow-y-auto vt-bg-white dark:vt-bg-gray-700 vt-border-t-8"
          :class="classType"
        >
          <div
            class="vt-text-black vt-opacity-50 vt-cursor-pointer vt-rounded-full vt-absolute vt-top-2 vt-right-2"
            @click="removeToast()"
          >
            <TwFeather
              class="vt-text-gray-900 dark:vt-text-gray-300"
              type="x"
            />
          </div>
          <div class="vt-flex vt-items-center vt-gap-3 vt-text-left">
            <template v-if="iconType">
              <TwFeather
                class="vt-font-bold vt-text-lg"
                :class="textColor"
                :type="iconType"
              />
            </template>
            <div class="vt-text-left vt-pr-4">
              <template v-if="title">
                <div
                  :class="textColor"
                  class="vt-font-bold vt-text-lg vt-text-gray-900 dark:vt-text-gray-300"
                >
                  {{ title }}
                </div>
              </template>
              <template v-if="message">
                <div>
                  {{ message }}
                </div>
              </template>
            </div>
            <template v-if="jsonMessage">
              <ul class="vt-flex vt-flex-col vt-gap-2">
                <li
                  v-for="(tmessage, key) in jsonMessage"
                  :key="'errmes' + key"
                  class="vt-p-2 vt-rounded vt-text-left vt-border"
                >
                  <strong>{{ key }}:</strong> {{ tmessage }}
                </li>
              </ul>
            </template>
          </div>
        </div>
        <div
          v-if="showLifetime"
          class="vt-bg-gray-900 dark:vt-bg-gray-300 vt-bg-opacity-40 vt-h-[0.35rem] vt-absolute vt-bottom-0 vt-rounded-b-md vt-mx-auto"
          :class="{
            'vt-rounded-br-none': lifetimePercent < 95,
          }"
          :style="barStyle"
        ></div>
      </div>
    </transition>
  </div>
</template>
