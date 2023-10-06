<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="fill-height align-center justify-center">
    <v-card width="500" shaped class="rounded-xl">
      <h2 class="text-center text-h4 my-2 font-weight-black text-primary">
        Bienvenido
      </h2>
      <LottieAnimation
        style="height: 300; width: 300px"
        :animation-data="lottieWelcome"
        :loopDelayMin="2.5"
        :auto-play="true"
        :loopDelayMax="5"
        class="mx-auto"
        :loop="true"
        :speed="1"
        ref="anim"
      />
      <v-card-text class="text-center">
        <h3 class="text-center mb-10">
          <v-divider class="mx-4 my-4"></v-divider>
          ¿Que deseas hacer?
          <v-divider class="mx-4 my-4"></v-divider>
        </h3>
        <v-btn
          color="primary mx-2 botone"
          @click="router.push({ name: 'Productos-admin' })"
          >Productos</v-btn
        >
        <v-btn
          color="primary mx-2 botone"
          @click="router.push({ name: 'Usuarios-admin' })"
          >Usuario</v-btn
        >
        <v-btn
          color="primary mx-2 botone"
          @click="router.push({ name: 'Shopping-admin' })"
          >Compras</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
import { onMounted } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import lottieWelcome from "@/assets/helper/login.json";
import { useApiUser } from "@/stores";
import router from "../../router";

const useUser = useApiUser();

onMounted(() => getUser());

const getUser = async () => {
  try {
    await useUser.getUsers$();
  } catch (error) {
    console.error(error);
  }
};
</script>
<style></style>
