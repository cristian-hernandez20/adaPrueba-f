import { defineStore } from "pinia";
import { Alert } from "@/schema";

export const useModuleAlert = defineStore("alert", {
  state: () => ({
    alert: { ...Alert() },
  }),
  actions: {
    setAlert$({ type, message, func1, func2 }) {
      this.alert = { type, message, func1, func2 };
      this.alert.estado = true;
    },
    setAlertOff$() {
      this.alert = Alert();
    },
  },
  getters: {
    getAlert() {
      return { ...this.alert };
    },
  },
});
