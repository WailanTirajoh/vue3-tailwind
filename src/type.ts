import type { Component } from "vue";

// Buttons
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "light"
  | "warning"
  | "info"
  | "outline-primary"
  | "outline-secondary"
  | "outline-danger"
  | "outline-success"
  | "outline-light"
  | "outline-warning"
  | "outline-info"
  | "none";
export type ButtonIconPosition = "left" | "right" | "center";
export type ButtonTextPosition = "left" | "right" | "center";

// Datatable
export interface DatatableColumn {
  label: string;
  field: string;
  sortable: boolean;
  width?: string;
  template?: (data: DatatableData, index: number) => string;
  component?: (
    data: DatatableData,
    index: number
  ) => {
    component: Component;
    props: [key: any];
    hook: () => {};
  };
  onColumnClick?: () => void;
  onCellClick?: () => void;
}
export interface DatatableData {
  [key: string]: any;
}
export type DatatableSetting = {
  checkbox: boolean;
  limitOption?: Array<{
    label: string;
    value: number;
  }>;
};

// Dropdown
export type DropdownAlign = "left" | "right";
export type DropdownItemValue = any;
export type DropdownItem = {
  label: string;
  value: DropdownItemValue;
};

// Form Radio
export type RadioOption = {
  label: string;
  value: any;
};

// Toast
export type ToastType = "success" | "info" | "error" | "warning";
export interface Toast {
  id: string;
  message?: string;
  html?: string;
  lifetime?: number;
  type: ToastType;
  jsonMessage?: object | null;
  title?: string | null;
}
export interface ToastDeafult {
  message: string;
  lifetime?: number;
  title?: string;
}
export interface ToastSuccess extends ToastDeafult {}
export interface ToastError extends ToastDeafult {}
export interface ToastWarning extends ToastDeafult {}
export interface ToastInfo extends ToastDeafult {}

// Modal
export type ModalBackdrop = "" | "static";

// Offcanvas
export type OffcanvasPosition = "top" | "left" | "right" | "bottom";

// Tabs
export interface TabRefs {
  [key: string]: HTMLElement;
}
export type TabChildren = string | number;
export interface Tab {
  active: TabChildren;
  childrens: Array<TabChildren>;
}

// Dialog

export interface Dialog {
  title: string;
  description?: string;
  rejectText?: string;
  acceptText?: string;
  icon?: string;
}

// Calendar

export type Days = {
  date: number;
  name: string;
  month: string;
  year: number;
  fulldate: string;
  jsDate: Date;
};

export type Week = {
  days: Array<Days>;
};

export interface Calendar {
  month: string;
  weeks: Array<Week>;
  year: number;
}
