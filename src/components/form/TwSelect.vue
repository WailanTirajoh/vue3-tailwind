<script lang="ts">
export default defineComponent({
  name: "TwSelect",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { DropdownItem } from "../../type";
import TwSelectionList from "../select/TwSelectionList.vue";
import { computed, defineComponent, provide } from "vue";
import { useFormValidator } from "@/composables/formValidator";

export interface Props {
  name?: string;
  modelValue?: string | number | null;
  label?: string;
  placeholder?: string;
  items: Array<DropdownItem>;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: "",
  modelValue: () => "",
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get() {
    return props.modelValue || null;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const { isError } = useFormValidator({
  fieldName: props.name,
  fieldValue: computedValue,
});
provide("select-error", isError);
</script>

<template>
  <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
    {{ label }}
  </label>
  <div class="relative">
    <TwSelectionList
      v-bind="$attrs"
      v-model="computedValue"
      :items="items"
      :placeholder="placeholder"
      :close-on-select="true"
      :disabled="disabled"
    />
    <div
      v-if="disabled"
      class="w-full h-full absolute top-0 left-0 rounded bg-gray-100 bg-opacity-5 cursor-not-allowed"
    ></div>
  </div>
</template>
