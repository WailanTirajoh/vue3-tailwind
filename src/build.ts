import type { App, Directive } from "vue";
import type {
  ButtonVariant,
  ButtonIconPosition,
  ButtonTextPosition,
  DatatableColumn,
  DatatableData,
  DatatableSetting,
  DropdownAlign,
  DropdownItemValue,
  DropdownItem,
} from "./components/type";
import {
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
  TwFeather,
  TwToast,
} from "./components";
import Ripple from "./directives/ripple";
import Toast from "@/composables/toast";
import "./assets/build.css";

const TwComponents = {
  install(app: App) {
    app.component("TwFile", TwFile);
    app.component("TwInput", TwInput);
    app.component("TwMultiSelect", TwMultiSelect);
    app.component("TwSelect", TwSelect);
    app.component("TwTextarea", TwTextarea);
    app.component("TwToggle", TwToggle);
    app.component("TwButton", TwButton);
    app.component("TwTab", TwTab);
    app.component("TwOffcanvas", TwOffcanvas);
    app.component("TwModal", TwModal);
    app.component("TwDatatableClient", TwDatatableClient);
    app.component("TwFeather", TwFeather);

    Ripple.color = "rgba(255, 255, 255, 0.35)";
    Ripple.zIndex = "55";
    app.directive("ripple", Ripple as Directive<any, any>);
  },
};

export default TwComponents;

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
  TwFeather,
  TwToast,
  Toast,
};

export {
  ButtonVariant,
  ButtonIconPosition,
  ButtonTextPosition,
  DatatableColumn,
  DatatableData,
  DatatableSetting,
  DropdownAlign,
  DropdownItemValue,
  DropdownItem,
};
