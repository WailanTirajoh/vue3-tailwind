<script lang="ts">
export default defineComponent({
  name: "TwToggle",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { TwFeather } from "..";
import { useFormValidator } from "@/composables/formValidator";

export interface Props {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  modelValue?: boolean | null;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeIcon?: string;
  inactiveIcon?: string;
  noIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  placeholder: "",
  activeText: "Active",
  inactiveText: "Inactive",
  activeIcon: "check",
  inactiveIcon: "x",
  noIcon: true,
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get() {
    return props.modelValue ?? false;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const isFocused = ref(false);

const { isError } = useFormValidator({
  fieldName: props.name,
  fieldValue: computedValue,
});
</script>

<template>
  <label
    v-if="label"
    class="vt-font-bold vt-text-gray-700 dark:vt-text-gray-400"
  >
    {{ label }}
  </label>
  <div class="vt-flex vt-gap-2 vt-items-center vt-w-full">
    <label :for="id" class="vt-flex vt-items-center vt-cursor-pointer">
      <div class="vt-relative">
        <input
          v-bind="$attrs"
          :id="id"
          v-model="computedValue"
          type="checkbox"
          class="vt-sr-only"
          @focusin="isFocused = true"
          @focusout="isFocused = false"
          :disabled="disabled"
          :aria-label="`${id}-checkbox`"
        />
        <div
          :data-error="isError"
          :data-focus="isFocused"
          class="vt-block vt-w-10 vt-h-6 vt-rounded-full vt-border dark:vt-border-gray-700 vt-shadow-inner error:vt-border-red-400 error:vt-border error:focus:vt-shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);] dark:error:vt-border-red-400 dark:error:vt-border dark:error:focus:vt-shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);]"
          :aria-label="`${id}-checkbox`"
          tabindex="-1"
          :class="[
            {
              'vt-bg-gray-100 dark:vt-bg-gray-600': computedValue,
              'vt-bg-gray-600 dark:vt-bg-gray-600': !computedValue,
              'vt-ring-0 vt-outline-none vt-border-transparent vt-shadow-[0_0_0_0.2rem_rgb(0_123_255_/_25%)] error:vt-shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);]':
                isFocused,
              '': !isFocused,
            },
            $attrs.class,
          ]"
        ></div>
        <div
          class="vt-absolute vt-left-1 vt-top-1 vt-bg-white vt-w-4 vt-h-4 vt-rounded-full vt-transition vt-flex vt-items-center vt-justify-center"
          :class="{
            'vt-translate-x-full vt-bg-gray-600 dark:vt-bg-green-600':
              computedValue,
          }"
          :aria-label="`${id}-checkbox`"
          tabindex="-1"
        >
          <TwFeather
            v-if="!noIcon"
            size="10"
            class="vt-flex vt-items-center vt-justify-center"
            :type="computedValue ? activeIcon : inactiveIcon"
          />
        </div>
      </div>
    </label>
    <div class="">
      {{ computedValue ? activeText : inactiveText }}
    </div>
  </div>
</template>
