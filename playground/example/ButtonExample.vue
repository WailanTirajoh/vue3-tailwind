<script setup lang="ts">
import type {
  ButtonIconPosition,
  ButtonTextPosition,
  ButtonVariant,
} from "../../src/build";
import { TwToggle, TwRadio, TwInput, TwButton } from "../../src/build";
import { computed, ref } from "vue";

const buttonVariants = computed(() =>
  [
    "primary",
    "secondary",
    "danger",
    "success",
    "light",
    "warning",
    "info",
    "outline-primary",
    "outline-secondary",
    "outline-danger",
    "outline-success",
    "outline-light",
    "outline-warning",
    "outline-info",
    "none",
  ].map((value) => ({
    label: value,
    value: value,
  }))
);
const buttonTextPositions = computed(() =>
  ["left", "right", "center"].map((value) => ({
    label: value,
    value: value,
  }))
);
const buttonIconPositions = computed(() =>
  ["left", "right"].map((value) => ({
    label: value,
    value: value,
  }))
);
interface Options {
  variant: ButtonVariant;
  ripple: boolean;
  icon: string;
  disabled: boolean;
  iconPosition: ButtonIconPosition;
  loading: boolean;
  buttonTextPosition: ButtonTextPosition;
  text: string;
}
const options = ref<Options>({
  variant: "primary",
  ripple: true,
  icon: "user",
  disabled: false,
  iconPosition: "left",
  loading: false,
  buttonTextPosition: "left",
  text: "Hi there!",
});
</script>

<template>
  <div>
    <h2 class="vt-text-2xl vt-font-bold">Button</h2>
    <hr class="vt-my-2 vt-border dark:vt-border-gray-700" />
    <div class="vt-grid vt-grid-cols-12">
      <div class="vt-col-span-12">
        <tw-button
          :variant="options.variant"
          :icon="options.icon"
          :disabled="options.disabled"
          :ripple="options.ripple"
          :icon-position="options.iconPosition"
          :loading="options.loading"
          :button-text-position="options.buttonTextPosition"
        >
          {{ options.text }}
        </tw-button>
      </div>
      <div class="vt-col-span-12">
        <hr class="vt-my-2 dark:vt-border-gray-700" />
        <h3 class="vt-text-xl vt-font-semibold">Props</h3>
        <div
          class="vt-grid vt-grid-cols-12 vt-gap-x-4 vt-border-2 vt-p-2 vt-rounded-lg vt-shadow-inner vt-bg-gray-200 dark:vt-bg-gray-800 dark:vt-border-gray-700"
        >
          <div class="vt-col-span-12 md:vt-col-span-6 lg:vt-col-span-3">
            <tw-toggle
              id="toggle-button-loading"
              v-model="options.loading"
              label="Loading"
            ></tw-toggle>
            <tw-toggle
              id="toggle-button-ripple"
              v-model="options.ripple"
              label="Ripple"
            ></tw-toggle>
            <tw-toggle
              id="toggle-button-disabled"
              v-model="options.disabled"
              label="Disabled"
            ></tw-toggle>
          </div>
          <div class="vt-col-span-12 md:vt-col-span-6 lg:vt-col-span-3">
            <tw-radio
              label="Variant"
              id="radio-button-variant"
              v-model="options.variant"
              :options="buttonVariants"
            ></tw-radio>
          </div>
          <div class="vt-col-span-12 md:vt-col-span-6 lg:vt-col-span-3">
            <tw-radio
              label="Text Position"
              id="radio-button-textPosition"
              v-model="options.buttonTextPosition"
              :options="buttonTextPositions"
            ></tw-radio>
          </div>
          <div class="vt-col-span-12 md:vt-col-span-6 lg:vt-col-span-3">
            <tw-radio
              label="Icon Position"
              id="radio-button-iconPosition"
              v-model="options.iconPosition"
              :options="buttonIconPositions"
            ></tw-radio>
          </div>
          <div class="vt-col-span-12 md:vt-col-span-6 lg:vt-col-span-3">
            <tw-input
              label="Text"
              type="text"
              placeholder="Button Text"
              v-model="options.text"
            ></tw-input>
          </div>
          <div class="vt-col-span-12 md:vt-col-span-6 lg:vt-col-span-3">
            <tw-input
              label="Icon"
              type="text"
              placeholder="Button Icon"
              v-model="options.icon"
              :disabled="true"
            ></tw-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
