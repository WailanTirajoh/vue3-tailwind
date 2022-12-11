<script setup lang="ts">
import { Variant, IconPosition, TextPosition } from "@/components/button/type";
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
          <TwButton :variant="Variant.PRIMARY" :ripple="true">
            Primary Button with ripple
          </TwButton>
          <TwButton :variant="Variant.SECONDARY" :ripple="true">
            Secondary Button with ripple
          </TwButton>
          <TwButton :variant="Variant.DANGER" :ripple="true">
            Danger Button with ripple
          </TwButton>
          <TwButton :variant="Variant.PRIMARY"> Primary Button </TwButton>
          <TwButton :variant="Variant.SECONDARY"> Secondary Button </TwButton>
          <TwButton :variant="Variant.DANGER"> Danger Button </TwButton>
          <TwButton
            icon="smile"
            :variant="Variant.PRIMARY"
            :icon-position="IconPosition.LEFT"
          >
            Button with Icon
          </TwButton>
          <TwButton
            icon="smile"
            :variant="Variant.PRIMARY"
            :icon-position="IconPosition.RIGHT"
          >
            Button with Icon Right
          </TwButton>
          <TwButton icon="smile" :variant="Variant.PRIMARY" :disabled="true">
            Disabled Button
          </TwButton>
          <TwButton
            icon="smile"
            :variant="Variant.PRIMARY"
            :disabled="true"
            :loading="true"
          >
            Loading Button
          </TwButton>
          <TwButton
            icon="smile"
            :variant="Variant.PRIMARY"
            :text-position="TextPosition.LEFT"
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
