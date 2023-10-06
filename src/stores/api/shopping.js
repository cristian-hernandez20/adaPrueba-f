import { defineStore } from "pinia";
import apiAxios from "../../api/apiAxios";
import { toast } from "vue3-toastify";

export const useApiShopping = defineStore("shopping", {
  state: () => ({
    shoppings: [],
  }),
  getters: {},
  actions: {
    pushShopping$(data) {
      this.shoppings.push(data);
    },
    getShoppings$() {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: "get-shoppings",
          method: "GET",
        })
          .then((response) => {
            if (response.success) resolve(response.data);
            else {
              toast.info(response.message);
              reject(response.message);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error(error);
            reject(error);
          });
      });
    },
    registerShopping$({ shopping }) {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: "register-shopping",
          method: "POST",
          data: shopping,
        })
          .then((response) => {
            if (response.success) {
              toast.success(response.message);
              resolve(response);
            } else {
              toast.info(response.message);
              reject(response.message);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error(error);
            reject(error);
          });
      });
    },
    registerShoppingMasive$() {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: "register-shopping-masive",
          method: "POST",
          data: this.shoppings,
        })
          .then((response) => {
            if (response.success) {
              toast.success(response.message);
              resolve(response);
            } else {
              toast.info(response.message);
              reject(response.message);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error(error);
            reject(error);
          })
          .finally(() => {
            location.reload();
          });
      });
    },
  },
});
