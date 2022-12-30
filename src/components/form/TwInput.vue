<script lang="ts">
export default {
  name: "TwInput",
};
</script>

<script setup lang="ts">
export interface Props {
  label: string;
  placeholder: string;
  modelValue?: string | number | null;
  type?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="">
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <div>
      <input
        v-bind="$attrs"
        :value="props.modelValue"
        :type="type"
        class="transition ease-in-out border p-2 relative text-sm w-full focus:ring-0 focus:outline-none focus:shadow rounded bg-white dark:bg-gray-800 dark:border-gray-700 h-10 placeholder:italic"
        :class="{
          '!bg-gray-100 dark:!bg-gray-900 cursor-not-allowed': disabled,
        }"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="
          emit(
            'update:modelValue',
            ($event.currentTarget as HTMLInputElement).value
          )
        "
      />
    </div>
  </div>
</template>
