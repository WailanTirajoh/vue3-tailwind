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
  ButtontextPosition?: ButtonTextPosition;
}
const props = defineProps<Props>();

const COLORS: Record<ButtonVariant, string> = {
  [ButtonVariant.PRIMARY]: "bg-gray-800 text-white",
  [ButtonVariant.SECONDARY]: "bg-gray-200 text-gray-800",
  [ButtonVariant.DANGER]: "bg-red-800 text-white",
  [ButtonVariant.SUCCESS]: "bg-green-800 text-white",
  [ButtonVariant.LIGHT]: "bg-white text-gray-800",
  [ButtonVariant.WARNING]: "bg-yellow-800 text-white",
  [ButtonVariant.INFO]: "bg-gray-800 text-white",
  [ButtonVariant.NONE]: "",
};

const ICON_POSITIONS: Record<ButtonIconPosition, string> = {
  [ButtonIconPosition.LEFT]: "float-left mr-2",
  [ButtonIconPosition.RIGHT]: "float-right ml-2",
};

const TEXT_POSITIONS: Record<ButtonTextPosition, string> = {
  [ButtonTextPosition.LEFT]: "text-left",
  [ButtonTextPosition.RIGHT]: "text-right",
  [ButtonTextPosition.CENTER]: "text-center",
};

const btnColor = computed(() => {
  let color = COLORS[props.variant ?? ButtonVariant.PRIMARY];
  if (!btnDisabled.value) {
    color += " active:bg-opacity-90 hover:bg-opacity-90";
  }
  return color;
});

const btnButtonTextPosition = computed(() => {
  return TEXT_POSITIONS[props.ButtontextPosition ?? ButtonTextPosition.LEFT];
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
        class="absolute w-full h-full cursor-not-allowed bg-white -mt-2 -ml-2 rounded bg-opacity-10"
        v-if="btnDisabled"
      ></div>
    </transition>
    <TwFeather
      v-if="icon"
      class="mr-2"
      :class="[btnIconPosition]"
      :type="btnIcon"
      :animation="btnLoading ? 'spin' : ''"
    />
    <slot />
  </button>
</template>
