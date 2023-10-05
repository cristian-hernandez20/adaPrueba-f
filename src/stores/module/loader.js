import { defineStore } from "pinia";
export const useModuleLoader = defineStore("loader", {
  state: () => ({
    loader: false,
  }),
  actions: {
    setLoader$() {
      this.loader = !this.loader;
    },
  },
  getters: {
    getLoader$() {
      return this.loader;
    },
  },
});
