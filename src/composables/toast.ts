import type {
  Toast,
  ToastSuccess,
  ToastWarning,
  ToastInfo,
  ToastError,
} from "@/type";
import { generateId } from "@/utils/generateId";
import { ref } from "vue";

const toasts = ref<Array<Toast>>([]);

export const useToast = () => {
  function addToast(params: Toast) {
    params.id = generateId();
    toasts.value.push(params);
  }

  function removeToast(id: string) {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    toasts.value.splice(index, 1);
  }

  function success(params: ToastSuccess) {
    addToast({
      id: "",
      message: params.message,
      lifetime: params.lifetime ?? 5000,
      type: "success",
      title: params.title || "Success",
    });
  }

  function error(params: ToastError) {
    addToast({
      id: "",
      message: params.message,
      lifetime: params.lifetime ?? 5000,
      type: "error",
      title: params.title || "Error",
    });
  }

  function warning(params: ToastWarning) {
    addToast({
      id: "",
      message: params.message,
      lifetime: params.lifetime ?? 5000,
      type: "warning",
      title: params.title || "Warning",
    });
  }

  function info(params: ToastInfo) {
    addToast({
      id: "",
      message: params.message,
      lifetime: params.lifetime ?? 5000,
      type: "info",
      title: params.title || "Info",
    });
  }

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
