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
  <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
    {{ label }}
  </label>
  <div class="flex gap-2 items-center w-full">
    <label :for="id" class="flex items-center cursor-pointer">
      <div class="relative">
        <input
          v-bind="$attrs"
          :id="id"
          v-model="computedValue"
          type="checkbox"
          class="sr-only"
          @focusin="isFocused = true"
          @focusout="isFocused = false"
          :disabled="disabled"
          :aria-label="`${id}-checkbox`"
        />
        <div
          :data-error="isError"
          :data-focus="isFocused"
          class="block w-10 h-6 rounded-full border dark:border-gray-700 shadow-inner error:border-red-400 error:border error:focus:shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);] dark:error:border-red-400 dark:error:border dark:error:focus:shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);]"
          :aria-label="`${id}-checkbox`"
          tabindex="-1"
          :class="[
            {
              'bg-gray-100 dark:bg-gray-600': computedValue,
              'bg-gray-600 dark:bg-gray-600': !computedValue,
              'ring-0 outline-none border-transparent shadow-[0_0_0_0.2rem_rgb(0_123_255_/_25%)] error:shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);]':
                isFocused,
              '': !isFocused,
            },
            $attrs.class,
          ]"
        ></div>
        <div
          class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition flex items-center justify-center"
          :class="{
            'translate-x-full bg-gray-600 dark:bg-green-600': computedValue,
          }"
          :aria-label="`${id}-checkbox`"
          tabindex="-1"
        >
          <TwFeather
            v-if="!noIcon"
            size="10"
            class="flex items-center justify-center"
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
