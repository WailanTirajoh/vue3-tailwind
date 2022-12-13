# Vue 3 Tailwind

## Instalation
via npm
```
npm i --save vue3-tailwind
```

via pnpm
```
pnpm i vue3-tailwind --shamefully-hoist
```
## Setup
### Vue 3
Import component globally on your entry (main.js)
```
// src/main.js
import Vue3Tailwind from "vue3-tailwind"; // import components

createApp(App).use(Vue3Tailwind).mount("#app");
```

Or use on your component directly
```
<script setup lang="ts">
import { TwButton } from "vue3-tailwind"
</script>

<template>
  <tw-button>
    Hi there!
  </tw-button>
</template>
```

import css to main.css
```
// src/assets/css/main.css
@import "/node_modules/vue3-tailwind/dist/style.css";
```

### Nuxt 3
create plugins/vue3-tailwind.ts

```
// plugins/vue3-tailwind.ts
import Vue3Tailwind from "vue3-tailwind"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Tailwind)
})
```

import css to main.css
```
// assets/css/main.css
@import "vue3-tailwind/dist/style.css";
```

use the css at nuxt.config.css
```
// nuxt.config.css
export default defineNuxtConfig({
    css: ["~/assets/css/main.css"],
});
```

## Usage
### Forms
~ Ongoing Documentation
### Buttons
~ Ongoing Documentation
### Modal
~ Ongoing Documentation
### Offcanvas
~ Ongoing Documentation
### Tabs
~ Ongoing Documentation
### Datatable
~ Ongoing Documentation
