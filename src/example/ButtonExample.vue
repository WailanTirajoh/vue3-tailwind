<script setup lang="ts">
import {
  ButtonVariant,
  ButtonIconPosition,
  ButtonTextPosition,
} from "@/components/type";
import { TwButton } from "@/components";
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Button</h2>
    <hr class="my-2 border" />
    <div class="grid grid-cols-12">
      <div class="col-span-12">
        <div
          class="grid gap-2 grid-cols-[repeat(auto-fill,_minmax(14rem,_1fr))] mb-2"
        >
          <TwButton :variant="ButtonVariant.PRIMARY" :ripple="true">
            Primary Button with ripple
          </TwButton>
          <TwButton :variant="ButtonVariant.SECONDARY" :ripple="true">
            Secondary Button with ripple
          </TwButton>
          <TwButton :variant="ButtonVariant.DANGER" :ripple="true">
            Danger Button with ripple
          </TwButton>
          <TwButton :variant="ButtonVariant.PRIMARY"> Primary Button </TwButton>
          <TwButton :variant="ButtonVariant.SECONDARY">
            Secondary Button
          </TwButton>
          <TwButton :variant="ButtonVariant.DANGER"> Danger Button </TwButton>
          <TwButton
            icon="smile"
            :variant="ButtonVariant.PRIMARY"
            :icon-position="ButtonIconPosition.LEFT"
          >
            Button with Icon
          </TwButton>
          <TwButton
            icon="smile"
            :variant="ButtonVariant.PRIMARY"
            :icon-position="ButtonIconPosition.RIGHT"
          >
            Button with Icon Right
          </TwButton>
          <TwButton
            icon="smile"
            :variant="ButtonVariant.PRIMARY"
            :disabled="true"
          >
            Disabled Button
          </TwButton>
          <TwButton
            icon="smile"
            :variant="ButtonVariant.PRIMARY"
            :disabled="true"
            :loading="true"
          >
            Loading Button
          </TwButton>
          <TwButton
            icon="smile"
            :variant="ButtonVariant.PRIMARY"
            :text-position="ButtonTextPosition.LEFT"
            :disabled="true"
            :loading="true"
          >
            Text Left
          </TwButton>
        </div>
      </div>
    </div>
  </div>
</template>
