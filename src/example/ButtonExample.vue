<script setup lang="ts">
import {
  ButtonIconPosition,
  ButtonTextPosition,
  ButtonVariant,
} from "@/components/type";
import { TwToggle, TwRadio, TwInput } from "@/components";
import { TwButton } from "@/components";
import { computed, ref } from "vue";

const buttonVariants = computed(() =>
  Object.entries(ButtonVariant).map(([key, value]) => ({
    label: key,
    value: value,
  }))
);
const buttonTextPositions = computed(() =>
  Object.entries(ButtonTextPosition).map(([key, value]) => ({
    label: key,
    value: value,
  }))
);
const buttonIconPositions = computed(() =>
  Object.entries(ButtonIconPosition).map(([key, value]) => ({
    label: key,
    value: value,
  }))
);
const options = ref({
  variant: ButtonVariant.PRIMARY,
  ripple: true,
  icon: "user",
  disabled: false,
  iconPosition: ButtonIconPosition.LEFT,
  loading: false,
  buttonTextPosition: ButtonTextPosition.LEFT,
  text: "Hi there!",
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Button</h2>
    <hr class="my-2 border" />
    <div class="grid grid-cols-12">
      <div class="col-span-12">
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
      <div class="col-span-12">
        <hr class="my-2" />
        <h3 class="text-xl font-semibold">Props</h3>
        <div
          class="grid grid-cols-12 gap-x-4 border-2 p-2 rounded-lg shadow-inner bg-gray-50"
        >
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
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
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <tw-radio
              label="Variant"
              id="radio-button-variant"
              v-model="options.variant"
              :options="buttonVariants"
            ></tw-radio>
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <tw-radio
              label="Text Position"
              id="radio-button-textPosition"
              v-model="options.buttonTextPosition"
              :options="buttonTextPositions"
            ></tw-radio>
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <tw-radio
              label="Icon Position"
              id="radio-button-iconPosition"
              v-model="options.iconPosition"
              :options="buttonIconPositions"
            ></tw-radio>
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <tw-input
              label="Text"
              type="text"
              placeholder="Button Text"
              v-model="options.text"
            ></tw-input>
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
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
