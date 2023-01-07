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
  TwDialog,
} from "./components";
import Ripple from "./directives/ripple";
import { useToast } from "./composables/toast";
import { useForm } from "./composables/form";
import { useDialog } from "./composables/dialog";
import "./assets/build/build.css";

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
    TwDialog,
  };

  Object.values(components).forEach((component) => {
    app.component(component.name, component);
  });

  Ripple.color = "rgba(255, 255, 255, 0.35)";
  Ripple.zIndex = "55";
  app.directive("ripple", Ripple as Directive<any, any>);
}

export {
  // Components
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

  // Composable
  useToast,
  useForm,
  useDialog,
};
