<script lang="ts">
export default defineComponent({
  name: "TwMultiSelect",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type { DropdownItem, DropdownItemValue } from "../../type";
import MultiSelectionList from "../select/TwMultiSelectionList.vue";
import { computed, defineComponent, provide } from "vue";
import { useFormValidator } from "@/composables/formValidator";

export interface Props {
  name?: string;
  modelValue: Array<DropdownItemValue> | null;
  items: Array<DropdownItem>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get() {
    return props.modelValue ?? [];
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
  <label
    v-if="label"
    class="vt-font-bold vt-text-gray-700 dark:vt-text-gray-400"
  >
    {{ label }}
  </label>
  <div class="vt-relative">
    <MultiSelectionList
      v-bind="$attrs"
      v-model="computedValue"
      :items="items"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <div
      v-if="disabled"
      class="vt-w-full vt-h-full vt-absolute vt-top-0 vt-left-0 vt-rounded vt-bg-gray-100 vt-bg-opacity-5 vt-cursor-not-allowed"
    ></div>
  </div>
</template>
