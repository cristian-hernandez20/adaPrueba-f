<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="fill-height align-center justify-center">
    <v-card width="500" shaped class="rounded-xl">
      <template v-slot:title>
        <h2 class="text-center my-2 text-primary">Iniciar sesión</h2>
      </template>
      <v-divider class="mx-8"></v-divider>
      <v-card-text>
        <v-row justify="center" class="pb-10 px-10" dense>
          <v-col cols="12">
            <LottieAnimation
              style="height: 300; width: 300px"
              :animation-data="lottieLogin"
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
                @click="handleFlag"
              >
                ¿No tienes una cuenta, registrate?</a
              >
            </div>
          </v-col>
          <v-col cols="12" class="my-4 text-center">
            <v-btn
              class="text-md-overline botone"
              :disabled="useLoader.loader"
              color="primary"
              @click="login"
              shaped
            >
              Iniciar
            </v-btn>
          </v-col>
          <p class="secondary--text text-center text-title">
            © 2023 ADA S.A.S Versión {{ env_package.version }}
          </p>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- REGISTER USER -->
    <v-dialog
      v-model="flagRegisterUser"
      v-if="flagRegisterUser"
      persistent
      width="550"
    >
      <v-container>
        <v-card shaped class="rounded-xl">
          <template v-slot:title>
            <h3 class="text-center my-2 text-primary">Registrar usuario</h3>
          </template>
          <v-row justify="center" class="pb-10 px-4" dense>
            <v-col cols="6">
              <Input
                :field="regUserSchema.name"
                v-model="regUserRegister.name"
              />
            </v-col>
            <v-col cols="6">
              <Input
                :field="regUserSchema.lastName"
                v-model="regUserRegister.lastName"
              />
            </v-col>
            <v-col cols="12">
              <Input
                :field="regUserSchema.addres"
                v-model="regUserRegister.addres"
              />
            </v-col>
            <v-col cols="12">
              <Input
                :field="regUserSchema.phone"
                v-model="regUserRegister.phone"
              />
            </v-col>
            <v-col cols="12">
              <Input
                :field="regUserSchema.identification"
                v-model="regUserRegister.identification"
              />
            </v-col>
            <v-col cols="6">
              <Input
                :field="regUserSchema.nameUser"
                v-model="regUserRegister.nameUser"
              />
            </v-col>
            <v-col cols="6">
              <Input
                :field="regUserSchema.password"
                v-model="regUserRegister.password"
              />
            </v-col>
            <v-col cols="6" class="my-4 text-center">
              <v-btn
                class="text-md-overline mx-1 botone"
                @click="handleFlag"
                color="primary"
                shaped
              >
                volver
              </v-btn>
              <v-btn
                class="text-md-overline mx-1 botone"
                :disabled="useLoader.loader"
                @click="registerUser"
                color="success"
                shaped
              >
                Registrar
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container></v-dialog
    >
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import env_package from "./../../package.json";

import Input from "@/components/UI/Input.vue";
import lottieLogin from "@/assets/helper/login.json";
import { User, UserSchema } from "@/schema";
import { useApiUser, useModuleLoader } from "@/stores";

import "vue3-toastify/dist/index.css";

const useUser = useApiUser();
const useLoader = useModuleLoader();

const regUser = ref(User());
const regUserSchema = ref(UserSchema());
const regUserRegister = ref(User());

const flagRegisterUser = ref(false);

const handleFlag = () => {
  flagRegisterUser.value = !flagRegisterUser.value;
  regUserRegister.value = User();
};

const login = async () => {
  const { nameUser, password } = regUser.value;
  try {
    await useUser.login$({ nameUser, password });
  } catch (error) {
    error == "01" && handleFlag();
    console.error(error);
  }
};
const registerUser = async () => {
  try {
    await useUser.registerUser$({ user: regUserRegister.value });
    handleFlag();
  } catch (error) {
    console.error(error);
  }
};
</script>
