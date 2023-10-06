import { defineStore } from "pinia";
import { Product } from "@/schema";
import apiAxios from "../../api/apiAxios";
import { toast } from "vue3-toastify";

export const useApiProduct = defineStore("product", {
  state: () => ({
    product: Product,
  }),
  getters: {
    getProduct$() {
      return this.product;
    },
  },
  actions: {
    getProducts$() {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: "get-products",
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
    registerProduct$({ product }) {
      product.quantity = Number(product.quantity);
      product.price = Number(product.price);

      delete product.id;

      return new Promise((resolve, reject) => {
        apiAxios({
          url: "register-product",
          method: "POST",
          data: product,
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
    editProduct$({ product }) {
      product.quantity = Number(product.quantity);
      product.price = Number(product.price);

      return new Promise((resolve, reject) => {
        apiAxios({
          url: "edit-product",
          method: "PUT",
          data: product,
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
  },
});
