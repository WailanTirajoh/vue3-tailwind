import type { Component } from "vue";
// Buttons
export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
  SUCCESS = "success",
  LIGHT = "light",
  WARNING = "warning",
  INFO = "info",
  OUTLINE_PRIMARY = "outline-primary",
  OUTLINE_SECONDARY = "outline-secondary",
  OUTLINE_DANGER = "outline-danger",
  OUTLINE_SUCCESS = "outline-success",
  OUTLINE_LIGHT = "outline-light",
  OUTLINE_WARNING = "outline-warning",
  OUTLINE_INFO = "outline-info",
  NONE = "none",
}

export enum ButtonIconPosition {
  LEFT = "left",
  RIGHT = "right",
}

export enum ButtonTextPosition {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

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
export enum DropdownAlign {
  LEFT = "left",
  RIGHT = "right",
}
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
