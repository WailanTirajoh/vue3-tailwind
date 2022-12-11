import type { App, Directive } from "vue";
import Ripple from "./services/ripple";
import {
  TwFile,
  TwInput,
  TwMultiSelect,
  TwSelect,
  TwTextarea,
  TwToggle,
  TwButton,
  TwFeather,
  TwTab,
  TwOffcanvas,
  TwModal,
  TwDatatableClient,
} from "./components";

Ripple.color = "rgba(255, 255, 255, 0.35)";
Ripple.zIndex = "55";
const TwComponents = {
  install(app: App) {
    app.component("TwFile", TwFile);
    app.component("TwInput", TwInput);
    app.component("TwMultiSelect", TwMultiSelect);
    app.component("TwSelect", TwSelect);
    app.component("TwTextarea", TwTextarea);
    app.component("TwToggle", TwToggle);
    app.component("TwButton", TwButton);
    app.component("TwFeather", TwFeather);
    app.component("TwTab", TwTab);
    app.component("TwOffcanvas", TwOffcanvas);
    app.component("TwModal", TwModal);
    app.component("TwDatatableClient", TwDatatableClient);
    app.directive("ripple", Ripple as Directive<any, any>);
  },
};

export default TwComponents;
