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
  ["primary"]: "bg-gray-800 text-white",
  ["secondary"]: "bg-gray-200 text-gray-800",
  ["danger"]: "bg-red-800 text-white",
  ["success"]: "bg-green-800 text-white",
  ["light"]: "bg-white text-gray-800 dark:bg-gray-800 dark:text-white",
  ["warning"]: "bg-yellow-800 text-white",
  ["info"]: "bg-sky-800 text-white",
  ["outline-primary"]:
    "border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-gray-100",
  ["outline-secondary"]: "border-2 border-gray-200 text-gray-800",
  ["outline-danger"]:
    "border-2 border-red-800 text-gray-800 hover:bg-red-800 hover:text-gray-100",
  ["outline-success"]:
    "border-2 border-green-800 text-gray-800 hover:bg-green-800 hover:text-gray-100",
  ["outline-light"]: "border-2 border-white text-gray-800",
  ["outline-warning"]:
    "border-2 border-yellow-800 text-gray-800 hover:bg-yellow-800 hover:text-gray-100",
  ["outline-info"]:
    "border-2 border-sky-800 text-gray-800 hover:bg-sky-800 hover:text-gray-100",
  ["none"]: "",
};

const ICON_POSITIONS: Record<ButtonIconPosition, string> = {
  ["left"]: "float-left",
  ["right"]: "float-right",
  ["center"]: "",
};

const TEXT_POSITIONS: Record<ButtonTextPosition, string> = {
  ["left"]: "text-left",
  ["right"]: "text-right",
  ["center"]: "text-center",
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
    color += " active:bg-opacity-90 hover:bg-opacity-90";
  }
  return color;
});
</script>

<template>
  <button
    v-bind="$attrs"
    v-ripple="props.ripple"
    :disabled="props.disabled"
    class="p-2 relative duration-200 rounded-md ring-0 outline-none focus:border-transparent focus:shadow-[0_0_0_0.2rem_rgb(0_123_255_/_25%)]"
    :class="[btnColor, btnButtonTextPosition]"
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
        class="absolute w-full h-full cursor-not-allowed bg-white -mt-2 -ml-2 rounded !bg-opacity-20"
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
