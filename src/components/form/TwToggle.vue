<script lang="ts">
export default defineComponent({
  name: "TwToggle",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { useForm } from "../../composables/form";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  ref,
  watch,
  type Ref,
} from "vue";
import { TwFeather } from "..";
import { FieldValidator } from "js-formdata-validator";
import type {
  CustomFieldName,
  CustomRules,
  CustomValidatorErrorMessage,
  ValidationRules,
} from "js-formdata-validator/dist/type";

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

let fieldValidator: FieldValidator;
const composableForm = useForm();

const formName = inject("formName", null) as string | null;
const customRules = inject("customRules", null) as Ref<CustomRules> | null;
const customValidatorErrorMessageInject = inject(
  "customValidatorErrorMessage",
  null
) as Ref<CustomValidatorErrorMessage> | null;
const rulesInject = inject("rules", null) as Ref<ValidationRules> | null;
const customFieldNameInject = inject(
  "customFieldName",
  null
) as Ref<CustomFieldName> | null;

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
  if (fieldValidator && formName && props.name) {
    composableForm.updateFormData(formName, props.name, computedValue.value);
    fieldValidator.setFieldName(customFieldName.value);
    fieldValidator.setFieldRules(fieldRules.value);

    if (customValidatorErrorMessageInject) {
      fieldValidator.setCustomValidatorErrorMessage(
        customValidatorErrorMessageInject.value
      );
    }
    if (customRules) {
      fieldValidator.setCustomRules(customRules.value);
      watch(
        customRules,
        (value) => {
          fieldValidator.setCustomRules(value);
        },
        {
          deep: true,
        }
      );
    }
  }
});

const fieldRules = computed(() => {
  if (
    fieldValidator &&
    formName &&
    props.name &&
    rulesInject &&
    rulesInject.value
  ) {
    return rulesInject.value[props.name];
  }
  return [];
});

const customFieldName = computed(() => {
  const FALLBACK = "Field";
  if (
    fieldValidator &&
    formName &&
    props.name &&
    customFieldNameInject &&
    customFieldNameInject.value
  ) {
    return customFieldNameInject.value[props.name] ?? FALLBACK;
  }
  return FALLBACK;
});

const isError = computed(() => {
  if (fieldValidator && formName && props.name) {
    return composableForm.hasError(formName, props.name);
  }
  return false;
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
