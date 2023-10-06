<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-card width="100%">
      <v-btn
        color="primary mx-2 botone"
        @click="router.push({ name: 'Home-admin' })"
        ><v-icon> mdi-keyboard-backspace </v-icon> Volver
      </v-btn>
      <h2 class="my-5 text-center">GESTIÓN DE USUARIOS</h2>
      <v-card class="mx-auto mb-10" max-width="500" elevation="5">
        <h1 class="text-center" v-if="!items.length">NO EXISTEN USUARIOS</h1>
        <v-list lines="two">
          <v-list-item
            v-for="user in items"
            :key="user.id"
            :title="user.name"
            :subtitle="user.lastName"
          >
            <h4 :class="`${user.rol == 1 ? 'text-success' : 'text-primary'}`">
              {{ user.rol == 1 ? "ADMINISTRADOR" : "USUARIO GENERAL" }}
            </h4>
            <template v-slot:append>
              <v-chip class="ma-2">
                <h4 class="text-end">
                  {{ user.nameUser }}
                </h4>
              </v-chip>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useApiUser } from "@/stores";
import router from "../../router";

const useUser = useApiUser();
const items = ref([]);

onMounted(() => getUsers());

const getUsers = async () => {
  try {
    const response = await useUser.getUsers$();
    items.value = response;
  } catch (error) {
    console.error(error);
  }
};
</script>
