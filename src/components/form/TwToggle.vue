<script setup lang="ts">
import { ref } from "vue";

export interface Props {
  id: string;
  label: string;
  placeholder?: string;
  modelValue?: boolean;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  placeholder: "",
  activeText: "Active",
  inactiveText: "Inactive",
});
const emit = defineEmits(["update:modelValue"]);
const inputData = ref(props.modelValue);
</script>

<template>
  <div class="">
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <div>
      <div class="flex gap-2 items-center w-full">
        <label :for="id" class="flex items-center cursor-pointer bor">
          <div class="relative">
            <input
              :id="id"
              v-model="inputData"
              type="checkbox"
              class="sr-only"
              @input="emit('update:modelValue', !inputData)"
              :disabled="disabled"
            />
            <div
              class="block w-10 h-6 rounded-full border shadow-inner"
              :class="{
                'bg-gray-100': inputData,
                'bg-gray-600': !inputData,
              }"
            ></div>
            <div
              class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"
              :class="{
                'translate-x-full bg-gray-600': inputData,
              }"
            ></div>
          </div>
        </label>
        <div class="">
          {{ inputData ? activeText : inactiveText }}
        </div>
      </div>
    </div>
  </div>
</template>
