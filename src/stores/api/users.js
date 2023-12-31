import { defineStore } from "pinia";
import { User, UserSchema } from "@/schema";
import apiAxios from "../../api/apiAxios";
import { toast } from "vue3-toastify";

export const useApiUser = defineStore("user", {
  state: () => ({
    user: User,
  }),
  getters: {
    getUser$() {
      return this.user;
    },
  },
  actions: {
    login$({ nameUser, password }) {
      if ([nameUser, password].includes(null)) {
        return toast.info("Los campos de usuario y contraseña son requeridos");
      }
      return new Promise((resolve, reject) => {
        apiAxios({
          url: "singIn",
          method: "GET",
          params: { nameUser, password },
        })
          .then((response) => {
            if (response.success) resolve(response);
            else {
              toast.info(response.message);
              if (response.error) return reject(response.error);
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
    logOut$() {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      location.reload();
    },
    getUsers$() {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: "get-users",
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
    registerUser$({ user }) {
      const missingFields = Object.keys(user).filter((e) => !user[e]);
      if (missingFields.length > 0) {
        missingFields.forEach((fieldName) => {
          const findField = UserSchema()[fieldName].label;
          toast.info(`El campo ${findField} es requerido`);
        });
        return Promise.reject("Campos requeridos faltantes");
      }
      user.phone = Number(user.phone);
      user.identification = Number(user.identification);

      return new Promise((resolve, reject) => {
        apiAxios({
          url: "register-user",
          method: "POST",
          data: user,
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
