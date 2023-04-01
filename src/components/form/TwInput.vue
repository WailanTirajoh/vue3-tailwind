<script lang="ts">
export default defineComponent({
  name: "TwInput",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { useFormValidator } from "../../composables/formValidator";
import { computed, defineComponent, onMounted, ref } from "vue";

export interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  modelValue?: string | number | null;
  type?: string;
  disabled?: boolean;
  errorClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  errorClass: "",
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
  <div>
    <slot :is-error="isError">
      <input
        v-bind="$attrs"
        v-model="computedValue"
        :type="type"
        :data-error="isError"
        class="vt-transition vt-ease-in-out vt-border vt-p-2 vt-relative vt-text-sm vt-w-full vt-rounded vt-bg-white vt-h-10 placeholder:vt-italic vt-block vt-text-gray-600 dark:vt-text-gray-200 dark:vt-border-gray-700 dark:vt-bg-gray-800 vt-outline-primary disabled:!vt-bg-gray-100 dark:disabled:!vt-bg-gray-900 disabled:vt-cursor-not-allowed error:vt-border-red-400 error:vt-border error:focus:vt-shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);] dark:error:vt-border-red-400 dark:error:vt-border dark:error:focus:vt-shadow-[0_0_0_0.2rem_rgb(255_0_0_/_25%);]"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </slot>
  </div>
</template>
