<script lang="ts">
export default {
  name: "TwInput",
};
</script>

<script setup lang="ts">
import { useForm } from "@/composables/form";
import { computed, inject, onMounted, watch } from "vue";

export interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  modelValue?: string | number | null;
  type?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get() {
    return props.modelValue;
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
    <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <div>
      <input
        v-bind="$attrs"
        v-model="computedValue"
        :type="type"
        class="transition ease-in-out border p-2 relative text-sm w-full focus:ring-0 focus:outline-none focus:shadow rounded bg-white dark:bg-gray-800 dark:border-gray-700 h-10 placeholder:italic"
        :class="{
          '!bg-gray-100 dark:!bg-gray-900 cursor-not-allowed': disabled,
        }"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
