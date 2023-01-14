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
  TwRadio,
  TwTabWrapper,
  TwTabNavigator,
  TwTabBody,
} from "./components";

import Ripple from "./directives/ripple";
import { useToast } from "./composables/toast";
import { useForm } from "./composables/form";
import { useDialog } from "./composables/dialog";
import { useBreakpoints } from "./composables/breakpoints";
import { useTabs } from "./composables/tabs";
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
  RadioOption,
  ToastType,
  ToastDeafult,
  ModalBackdrop,
  OffcanvasPosition,
  Tab,
  TabChildren,
  TabRefs,
} from "./type";

// Export components
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
};

// Export composables
export { useToast, useForm, useDialog, useBreakpoints, useTabs };

export const Vue3Tailwind = function install(app: App) {
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
    TwRadio,
    TwTabWrapper,
    TwTabNavigator,
    TwTabBody,
  };

  Object.values(components).forEach((component) => {
    app.component(component.name, component);
  });

  Ripple.color = "rgba(255, 255, 255, 0.35)";
  Ripple.zIndex = "55";
  app.directive("ripple", Ripple as Directive<any, any>);
};

export { Ripple as TwRipple };
