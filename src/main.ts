import { createApp, type Directive } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import { useForm } from "./composables/form";
import Ripple from "./directives/ripple";

const app = createApp(App);

Ripple.color = "rgba(255, 255, 255, 0.35)";
Ripple.zIndex = "55";
app.directive("ripple", Ripple as Directive<any, any>);

const form = useForm();

form.setCustomRules({
  test(value: any) {
    if (value === "test") return "test";
  },
});

app.mount("#app");
