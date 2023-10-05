<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="fill-height align-center justify-center">
    <v-card width="500" shaped class="rounded-xl" :loader="useLoader.loader">
      <template v-slot:title>
        <h2 class="text-center my-2 text-primary">Iniciar sesión</h2>
      </template>
      <v-divider class="mx-8"></v-divider>
      <v-card-text>
        <v-row justify="center" class="pb-10 px-10" dense>
          <v-col cols="12">
            <LottieAnimation
              style="height: 300; width: 300px"
              :animation-data="pensador"
              :loopDelayMin="2.5"
              :auto-play="true"
              :loopDelayMax="5"
              class="mx-auto"
              :loop="true"
              :speed="1"
              ref="anim"
            />
          </v-col>
          <v-col cols="10">
            <Input :field="regUserSchema.nameUser" v-model="regUser.nameUser" />
          </v-col>
          <v-col cols="10">
            <Input
              :field="regUserSchema.password"
              v-model="regUser.password"
              @validate="login"
            />
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              <v-spacer></v-spacer>
              <a
                class="text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
              >
                ¿No tienes una cuenta, registrate?</a
              >
            </div>
          </v-col>
          <v-col cols="12" class="my-4 text-center">
            <v-hover v-slot="{ hover }" open-delay="50">
              <v-btn
                class="text-md-overline botone"
                :disabled="useLoader.loader"
                :elevation="hover ? 24 : 0"
                color="primary"
                @click="login"
                shaped
              >
                Iniciar
              </v-btn>
            </v-hover>
          </v-col>
          <p class="secondary--text text-center text-title">
            © 2023 ADA S.A.S Versión {{ env_package.version }}
          </p>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import env_package from "./../../package.json";

import Input from "@/components/UI/Input.vue";
import pensador from "@/assets/helper/login.json";
import { User, UserSchema } from "@/schema";
import { useApiUser, useModuleLoader } from "@/stores";

const useUser = useApiUser();
const useLoader = useModuleLoader();

const regUser = ref(User());
const regUserSchema = ref(UserSchema());

const login = async () => {
  const { nameUser, password } = regUser.value;

  await useUser.login$({ nameUser, password });
};
</script>
