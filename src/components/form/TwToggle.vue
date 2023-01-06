<script lang="ts">
export default defineComponent({
  name: "TwToggle",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { useForm } from "../../composables/form";
import { computed, defineComponent, inject, onMounted, watch } from "vue";
import { TwFeather } from "..";
import { FieldValidator } from "js-formdata-validator";

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

// Form
const composableForm = useForm();
let fieldValidator: FieldValidator;

const formName = inject("formName", null) as string | null;

watch(computedValue, async () => {
  if (fieldValidator && formName && props.name) {
    composableForm.updateFormData(formName, props.name, computedValue.value);
    if (fieldRules.value) {
      validateField();
    }
  }
});

onMounted(() => {
  fieldValidator = new FieldValidator();
  if (formName && props.name) {
    composableForm.updateFormData(formName, props.name, computedValue.value);
    fieldValidator.setFieldName(props.name);
    fieldValidator.setFieldRules(fieldRules.value);

    const customRules = composableForm.getCustomRules();
    if (customRules) {
      fieldValidator.setCustomRules(customRules);
    }
  }
});

const fieldRules = computed(() => {
  if (fieldValidator && formName && props.name) {
    return composableForm.getFieldRules(formName, props.name);
  }
  return [];
});

async function validateField() {
  if (fieldValidator && formName && props.name && fieldRules.value) {
    fieldValidator.setFieldValue(computedValue.value);
    fieldValidator.setFormData(composableForm.getFormData(formName));
    await fieldValidator.validate();

    const error = fieldValidator.getErrorBag();
    composableForm.setFieldErrors(formName, props.name, error);
  }
}
</script>

<template>
  <label v-if="label" class="font-bold text-gray-700 dark:text-gray-400">
    {{ label }}
  </label>
  <div>
    <div class="flex gap-2 items-center w-full">
      <label :for="id" class="flex items-center cursor-pointer">
        <div class="relative">
          <input
            v-bind="$attrs"
            :id="id"
            v-model="computedValue"
            type="checkbox"
            class="sr-only"
            :disabled="disabled"
            :aria-label="`${id}-checkbox`"
          />
          <div
            class="block w-10 h-6 rounded-full border dark:border-gray-700 shadow-inner"
            :class="[
              {
                'bg-gray-100 dark:bg-gray-600': computedValue,
                'bg-gray-600 dark:bg-gray-600': !computedValue,
              },
              $attrs.class,
            ]"
          ></div>
          <div
            class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition flex items-center justify-center"
            :class="{
              'translate-x-full bg-gray-600 dark:bg-green-600': computedValue,
            }"
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
  </div>
</template>
