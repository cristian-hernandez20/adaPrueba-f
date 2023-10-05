import { defineStore } from "pinia";
import { User } from "@/schema";
import apiAxios from "../../api/apiAxios";

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
      return new Promise((resolve, reject) => {
        apiAxios({
          url: "singIn",
          params: { nameUser, password },
        })
          .then((response) => {
            console.log(response);
            if (nameUser) resolve(nameUser);
            else reject("Error consultando usuario");
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
  },
});
