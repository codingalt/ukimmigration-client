import { toast } from "wc-toast";

export const toastSuccess = (data, duration = 5000) => {
  toast.success(data, { theme: { type: "light" }, duration });
};

export const toastError = (data) => {
  toast.error(data, { theme: { type: "light" }, duration: 5000 });
};
