<script lang="ts">
export default defineComponent({
  name: "TwRadio",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { computed, defineComponent } from "vue";
import { useFormValidator } from "@/composables/formValidator";
import type { RadioOption } from "@/type";

export interface Props {
  name?: string;
  label: string;
  id: string;
  modelValue?: string | number;
  type?: string;
  disabled?: boolean;
  options: RadioOption[];
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
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
</script>

<template>
  <label class="vt-font-bold vt-text-gray-700 dark:vt-text-gray-400">
    {{ label }}
  </label>
  <label
    :for="`${option.label}-${id}`"
    v-for="option in options"
    :key="`${option.label}-${id}`"
    class="vt-font-bold vt-text-gray-700 dark:vt-text-gray-400 vt-block"
    :class="[$attrs.class]"
  >
    <input
      v-bind="$attrs"
      v-model="computedValue"
      type="radio"
      class="vt-outline-primary vt-rounded-full"
      :name="id"
      :id="`${option.label}-${id}`"
      :disabled="disabled"
      :value="option.value"
      :data-error="isError"
    />
    {{ option.label }}
  </label>
</template>
