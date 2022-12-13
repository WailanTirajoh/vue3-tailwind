import type { Toast } from "@/components/type";
import { generateId } from "@/utils/generateId";
import { ref } from "vue";

const toasts = ref<Array<Toast>>([]);
export const useToast = () => {
  interface ToastDeafult {
    message: string;
    lifetime?: number;
    title?: string;
  }
  interface Success extends ToastDeafult {}
  interface Error extends ToastDeafult {}
  interface Warning extends ToastDeafult {}
  interface Info extends ToastDeafult {}

  const addToast = (params: Toast) => {
    params.id = generateId();
    toasts.value.push(params);
  };

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    toasts.value.splice(index, 1);
  };

  const success = (params: Success) => {
    addToast({
      id: "",
      message: params.message,
      lifetime: params.lifetime ?? 5000,
      type: "success",
      title: params.title || "Success",
    });
  };

  const error = (params: Error) => {
    addToast({
      id: "",
      message: params.message,
      lifetime: params.lifetime ?? 5000,
      type: "error",
      title: params.title || "Error",
    });
  };

  const warning = (params: Warning) => {
    addToast({
      id: "",
      message: params.message,
      lifetime: params.lifetime ?? 5000,
      type: "warning",
      title: params.title || "Warning",
    });
  };

  const info = (params: Info) => {
    addToast({
      id: "",
      message: params.message,
      lifetime: params.lifetime ?? 5000,
      type: "info",
      title: params.title || "Info",
    });
  };

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
};
