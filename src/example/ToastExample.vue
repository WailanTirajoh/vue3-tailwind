<script setup lang="ts">
import { useToast } from "@/composables/toast";
import TwToast from "@/components/toast/TwToast.vue";
import { TwButton } from "@/components";
import { ButtonVariant } from "@/components/type";

const { toasts, success, error, warning, info } = useToast();
</script>

<template>
  <tw-toast position="bottom-right" :toasts="toasts" />
  <div class="grid gap-2">
    <h2 class="text-2xl font-bold">Toasts</h2>
    <hr class="my-2 border" />
    <tw-button
      :variant="ButtonVariant.SUCCESS"
      @click="
        success({
          message: 'test',
          lifetime: 5000,
        })
      "
    >
      Success Toast
    </tw-button>
    <tw-button
      :variant="ButtonVariant.DANGER"
      @click="
        error({
          message: 'test',
          lifetime: 5000,
        })
      "
    >
      Error Toast
    </tw-button>
    <tw-button
      :variant="ButtonVariant.WARNING"
      @click="
        warning({
          message: 'test',
          lifetime: 5000,
        })
      "
    >
      Warning Toast
    </tw-button>
    <tw-button
      :variant="ButtonVariant.INFO"
      @click="
        info({
          message: 'test',
          lifetime: 5000,
        })
      "
    >
      Info Toast
    </tw-button>
  </div>
</template>
