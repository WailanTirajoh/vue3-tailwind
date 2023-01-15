import { createApp, type Directive } from "vue";
import App from "./App.vue";

import "../src/assets/dev/main.css";
import { useForm } from "../src/composables/form";
import Ripple from "../src/directives/ripple";

const app = createApp(App);

Ripple.color = "rgba(255, 255, 255, 0.35)";
Ripple.zIndex = "55";
app.directive("ripple", Ripple as Directive<any, any>);

const form = useForm();
form.setCustomRules({
  test({ value }) {
    if (value === "test") return "test";
  },
});

form.setGlobalCustomValidatorErrorMessage({
  ["required"]: "Field {field} wajib diisi!",
});

app.mount("#app");
