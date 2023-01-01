<script lang="ts">
export default {
  name: "TwRadio",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useForm } from "../../composables/form";
import { computed, inject, onMounted, watch } from "vue";
import type { RadioOption } from "../type";

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

// Form
const composableForm = useForm();

const formName = inject("formName") as string;

watch(computedValue, async () => {
  if (formName && props.name) {
    composableForm.updateFormData(formName, props.name, computedValue.value);
  }
});

onMounted(() => {
  if (formName && props.name) {
    composableForm.initFormData(formName, props.name);
  }
});
</script>

<template>
  <div class="">
    <label class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <label
      :for="`${option.label}-${id}`"
      v-for="option in options"
      :key="`${option.label}-${id}`"
      class="font-bold text-gray-700 dark:text-gray-400 block"
    >
      <input
        v-bind="$attrs"
        v-model="computedValue"
        type="radio"
        :name="id"
        :id="`${option.label}-${id}`"
        :disabled="disabled"
        :value="option.value"
      />
      {{ option.label }}
    </label>
  </div>
</template>
