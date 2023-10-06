<template>
  <v-toolbar density="compact" color="primary" fixed>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>{{ user.name + " " + user.lastName }}</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-badge
      :content="useShopping.shoppings.length"
      color="error"
      class="mr-10"
    >
      <v-icon @click="buyShoppings" v-if="user.rol == 2">
        mdi-cart-outline
      </v-icon>
    </v-badge>
    <v-chip class="ma-2">
      <h3>{{ user.rol == 1 ? "ADMINISTRADOR" : user.nameUser }}</h3>
    </v-chip>

    <v-btn icon @click="validateExit">
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { ref } from "vue";
import { useModuleAlert, useApiUser, useApiShopping } from "@/stores";

const useAlert = useModuleAlert();
const useUser = useApiUser();
const useShopping = useApiShopping();
const user = ref(JSON.parse(sessionStorage.user));

const validateExit = () => {
  useAlert.setAlert$({
    type: "warning",
    message: "¿Estas seguro que deseas cerrar la sesión?",
    func1: null,
    func2: useUser.logOut$,
  });
};
const buyShoppings = () => {
  if (!useShopping.shoppings.length) return;

  useAlert.setAlert$({
    type: "warning",
    message: `¿Estas seguro que deseas hacer la compra de ${useShopping.shoppings.length} articulos ?`,
    func1: null,
    func2: () => {
      useShopping.registerShoppingMasive$();
    },
  });
};
</script>
