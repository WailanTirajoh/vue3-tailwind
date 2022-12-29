import { createApp, type Directive } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import focusOutline from "./directives/focusOutline";
import Ripple from "./directives/ripple";

const app = createApp(App);

Ripple.color = "rgba(255, 255, 255, 0.35)";
Ripple.zIndex = "55";
app.directive("ripple", Ripple as Directive<any, any>);

app.directive("focusOutline", focusOutline as Directive<any, any>);

app.mount("#app");
