<script setup lang="ts">
import { computed } from "vue";
import { ButtonIconPosition, ButtonTextPosition, ButtonVariant } from "../type";
import TwFeather from "../icon/TwFeather.vue";

export interface Props {
  classes?: Array<string>;
  variant?: ButtonVariant;
  icon?: string;
  disabled?: boolean;
  ripple?: boolean;
  iconPosition?: ButtonIconPosition;
  loading?: boolean;
  buttonTextPosition?: ButtonTextPosition;
}
const props = defineProps<Props>();

const COLORS: Record<ButtonVariant, string> = {
  [ButtonVariant.PRIMARY]: "bg-gray-800 text-white",
  [ButtonVariant.SECONDARY]: "bg-gray-200 text-gray-800",
  [ButtonVariant.DANGER]: "bg-red-800 text-white",
  [ButtonVariant.SUCCESS]: "bg-green-800 text-white",
  [ButtonVariant.LIGHT]: "bg-white text-gray-800",
  [ButtonVariant.WARNING]: "bg-yellow-800 text-white",
  [ButtonVariant.INFO]: "bg-sky-800 text-white",
  [ButtonVariant.OUTLINE_PRIMARY]:
    "border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-gray-100",
  [ButtonVariant.OUTLINE_SECONDARY]: "border-2 border-gray-200 text-gray-800",
  [ButtonVariant.OUTLINE_DANGER]:
    "border-2 border-red-800 text-gray-800 hover:bg-red-800 hover:text-gray-100",
  [ButtonVariant.OUTLINE_SUCCESS]:
    "border-2 border-green-800 text-gray-800 hover:bg-green-800 hover:text-gray-100",
  [ButtonVariant.OUTLINE_LIGHT]: "border-2 border-white text-gray-800",
  [ButtonVariant.OUTLINE_WARNING]:
    "border-2 border-yellow-800 text-gray-800 hover:bg-yellow-800 hover:text-gray-100",
  [ButtonVariant.OUTLINE_INFO]:
    "border-2 border-sky-800 text-gray-800 hover:bg-sky-800 hover:text-gray-100",
  [ButtonVariant.NONE]: "",
};

const ICON_POSITIONS: Record<ButtonIconPosition, string> = {
  [ButtonIconPosition.LEFT]: "float-left",
  [ButtonIconPosition.RIGHT]: "float-right",
};

const TEXT_POSITIONS: Record<ButtonTextPosition, string> = {
  [ButtonTextPosition.LEFT]: "text-left",
  [ButtonTextPosition.RIGHT]: "text-right",
  [ButtonTextPosition.CENTER]: "text-center",
};

const btnButtonTextPosition = computed(() => {
  return TEXT_POSITIONS[props.buttonTextPosition ?? ButtonTextPosition.LEFT];
});

const btnLoading = computed(() => {
  return props.loading;
});

const btnIcon = computed(() => {
  return btnLoading.value ? "loader" : props.icon;
});
const btnIconPosition = computed(() => {
  return ICON_POSITIONS[props.iconPosition ?? ButtonIconPosition.LEFT];
});
const btnClasses = computed(() => {
  if (!props.classes) return [];
  return props.classes;
});
const btnDisabled = computed(() => {
  return props.disabled ?? false;
});
const btnRipple = computed(() => {
  return props.ripple;
});
const btnColor = computed(() => {
  let color = COLORS[props.variant ?? ButtonVariant.PRIMARY];
  if (!btnDisabled.value) {
    color += " active:bg-opacity-90 hover:bg-opacity-90";
  }
  return color;
});
</script>

<template>
  <button
    v-ripple="btnRipple"
    v-bind="$attrs"
    :disabled="btnDisabled"
    class="p-2 rounded-md relative duration-200"
    :class="[btnColor, ...btnClasses, btnButtonTextPosition]"
  >
    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="absolute w-full h-full cursor-not-allowed bg-white -mt-2 -ml-2 rounded bg-opacity-20"
        v-if="btnDisabled || loading"
      ></div>
    </transition>
    <tw-feather
      v-if="icon || loading"
      :class="[btnIconPosition]"
      :type="btnIcon"
      :animation="btnLoading ? 'spin' : ''"
    />
    <div v-if="$slots.hasOwnProperty('default')" class="mx-2 inline-block">
      <slot />
    </div>
  </button>
</template>
