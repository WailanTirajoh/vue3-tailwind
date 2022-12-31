import type { App, Directive } from "vue";
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
  TwDatatableServer,
  TwFeather,
  TwToast,
  TwDropdownMenu,
  TwAccordion,
  TwForm,
  TwErrorMessage,
} from "./components";
import Ripple from "./directives/ripple";
import Toast from "./composables/toast";
import "./assets/build.css";

export type {
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

export const Vue3Tailwind = install;

function install(app: App) {
  const components = {
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
  };

  Object.values(components).forEach((component) => {
    app.component(component.name, component);
  });

  app.directive("ripple", Ripple as Directive<any, any>);
}

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
  Toast,
};
