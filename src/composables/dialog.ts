import { reactive, ref, watch, type WatchStopHandle } from "vue";

export interface Dialog {
  title: string;
  description?: string;
  rejectText?: string;
  acceptText?: string;
  icon?: string;
}
const dialog = reactive<Dialog>({
  title: "",
});
const isShown = ref(false);
const isConfirmed = ref(false);
const clicked = ref(0);
export const useDialog = () => {
  let unwatch: WatchStopHandle;

  async function fire({
    title,
    description,
    rejectText,
    acceptText,
    icon,
  }: Dialog) {
    showDialog();

    dialog.title = title;
    dialog.description = description;
    dialog.rejectText = rejectText ?? "No";
    dialog.acceptText = acceptText ?? "Yes";
    dialog.icon = icon ?? "alert-triangle";

    const result = await getConfirmationResult();

    if (unwatch) {
      unwatch();
    }

    closeDialog();

    return result;
  }

  function getConfirmationResult() {
    return new Promise((resolve) => {
      unwatch = watch(clicked, () => {
        resolve(isConfirmed.value);
      });
    });
  }

  function showDialog() {
    isShown.value = true;
  }

  function closeDialog() {
    isShown.value = false;
  }

  function confirm() {
    clicked.value++;
    isConfirmed.value = true;
  }

  function reject() {
    clicked.value++;
    isConfirmed.value = false;
  }

  watch(isShown, (value) => {
    if (document) {
      if (value) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }
  });

  return {
    isShown,
    dialog,
    fire,
    confirm,
    reject,
  };
};
