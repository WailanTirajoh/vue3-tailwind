<script setup lang="ts">
import { useToast, TwToast, TwButton } from "../../src/build";

const { toasts, success, error, warning, info } = useToast();
</script>

<template>
  <tw-toast position="bottom-right" :toasts="toasts" />
  <div class="vt-grid vt-gap-2">
    <h2 class="vt-text-2xl vt-font-bold">Toasts</h2>
    <hr class="vt-my-2 vt-border dark:vt-border-gray-700" />
    <tw-button
      variant="success"
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
      variant="danger"
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
      variant="warning"
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
      variant="info"
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
