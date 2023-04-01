<script lang="ts">
export default defineComponent({
  name: "TwButton",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import type {
  ButtonIconPosition,
  ButtonTextPosition,
  ButtonVariant,
} from "../../type";

import { computed, defineComponent } from "vue";
import TwFeather from "../icon/TwFeather.vue";

export interface Props {
  variant?: ButtonVariant;
  icon?: string;
  disabled?: boolean;
  ripple?: boolean;
  iconPosition?: ButtonIconPosition;
  loading?: boolean;
  buttonTextPosition?: ButtonTextPosition;
}
const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
  ripple: false,
  iconPosition: "left",
  loading: false,
  buttonTextPosition: "left",
});

const COLORS: Record<ButtonVariant, string> = {
  ["primary"]: "vt-bg-gray-800 vt-text-white",
  ["secondary"]: "vt-bg-gray-200 vt-text-gray-800",
  ["danger"]: "vt-bg-red-800 vt-text-white",
  ["success"]: "vt-bg-green-800 vt-text-white",
  ["light"]:
    "vt-bg-white vt-text-gray-800 dark:vt-bg-gray-800 dark:vt-text-white",
  ["warning"]: "vt-bg-yellow-800 vt-text-white",
  ["info"]: "vt-bg-sky-800 vt-text-white",
  ["outline-primary"]:
    "vt-border-2 vt-border-gray-800 vt-text-gray-800 hover:vt-bg-gray-800 hover:vt-text-gray-100",
  ["outline-secondary"]: "vt-border-2 vt-border-gray-200 vt-text-gray-800",
  ["outline-danger"]:
    "vt-border-2 vt-border-red-800 vt-text-gray-800 hover:vt-bg-red-800 hover:vt-text-gray-100",
  ["outline-success"]:
    "vt-border-2 vt-border-green-800 vt-text-gray-800 hover:vt-bg-green-800 hover:vt-text-gray-100",
  ["outline-light"]: "vt-border-2 vt-border-white vt-text-gray-800",
  ["outline-warning"]:
    "vt-border-2 vt-border-yellow-800 vt-text-gray-800 hover:vt-bg-yellow-800 hover:vt-text-gray-100",
  ["outline-info"]:
    "vt-border-2 vt-border-sky-800 vt-text-gray-800 hover:vt-bg-sky-800 hover:vt-text-gray-100",
  ["none"]: "",
};

const ICON_POSITIONS: Record<ButtonIconPosition, string> = {
  ["left"]: "vt-float-left",
  ["right"]: "vt-float-right",
  ["center"]: "",
};

const TEXT_POSITIONS: Record<ButtonTextPosition, string> = {
  ["left"]: "vt-text-left",
  ["right"]: "vt-text-right",
  ["center"]: "vt-text-center",
};

const btnButtonTextPosition = computed(() => {
  return TEXT_POSITIONS[props.buttonTextPosition];
});

const btnIcon = computed(() => {
  return props.loading ? "loader" : props.icon;
});

const btnIconPosition = computed(() => {
  return ICON_POSITIONS[props.iconPosition];
});

const btnColor = computed(() => {
  let color = COLORS[props.variant];
  if (!props.disabled) {
    color += " active:vt-bg-opacity-90 hover:vt-bg-opacity-90";
  }
  return color;
});
</script>

<template>
  <button
    v-bind="$attrs"
    v-ripple="props.ripple"
    :disabled="props.disabled"
    class="vt-outline-primary vt-p-2 vt-relative vt-duration-200 vt-rounded-md vt-ring-0"
    :class="[btnColor, btnButtonTextPosition]"
  >
    <transition
      enter-active-class="vt-ease-out vt-duration-300"
      enter-from-class="vt-opacity-0"
      enter-to-class="vt-opacity-100"
      leave-active-class="vt-ease-in vt-duration-200"
      leave-from-class="vt-opacity-100"
      leave-to-class="vt-opacity-0"
    >
      <div
        class="vt-absolute vt-w-full vt-h-full vt-cursor-not-allowed vt-bg-white -vt-mt-2 -vt-ml-2 vt-rounded !vt-bg-opacity-20"
        v-if="props.disabled || loading"
      />
    </transition>
    <slot name="icon">
      <tw-feather
        v-if="icon || loading"
        :class="[
          btnIconPosition,
          props.iconPosition === 'left'
            ? 'mr-2'
            : props.iconPosition === 'center'
            ? 'mx-2'
            : 'ml-2',
        ]"
        :type="btnIcon"
        :animation="props.loading ? 'spin' : ''"
      />
    </slot>
    <slot />
  </button>
</template>
