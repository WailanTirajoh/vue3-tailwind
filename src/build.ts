import "./assets/build/build.css";
import type { App, Directive } from "vue";
import Ripple from "./directives/ripple";
export * from "./type";
import * as components from "./components";
export {
  TwFile,
  TwInput,
  TwMultiSelect,
  TwSelect,
  TwTextarea,
  TwToggle,
  TwButton,
  TwTab,
  TwOffcanvas,
  TwModal,
  TwDatatableClient,
  TwDatatableServer,
  TwFeather,
  TwToast,
  TwDropdownMenu,
  TwAccordion,
  TwForm,
  TwErrorMessage,
  TwDialog,
  TwRadio,
  TwTabWrapper,
  TwTabNavigator,
  TwTabBody,
} from "./components";

function install(app: App) {
  Object.values(components).forEach((component) => {
    app.component(component.name, component);
  });

  Ripple.color = "rgba(255, 255, 255, 0.35)";
  Ripple.zIndex = "55";
  app.directive("ripple", Ripple as Directive<any, any>);
}

export const Vue3Tailwind = install;
