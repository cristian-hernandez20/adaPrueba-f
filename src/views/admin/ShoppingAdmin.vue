<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-card width="100%">
      <v-btn
        color="primary mx-2 botone"
        @click="router.push({ name: 'Home-admin' })"
        ><v-icon> mdi-keyboard-backspace </v-icon> Volver
      </v-btn>
      <h2 class="my-5 text-center">GESTIÓN DE COMPRAS</h2>
      <v-card class="mx-auto mb-10" max-width="500" elevation="5">
        <h1 class="text-center" v-if="!items.length">
          NO EXISTE NINGUNA COMPRA
        </h1>
        <v-list lines="two">
          <v-list-item
            v-for="shopping in items"
            :key="shopping.id"
            :title="`${shopping.product.name}`"
            :subtitle="`Cantidad ${1} - ${formatNumber_(
              shopping.product.price
            )}`"
          >
            <template v-slot:append>
              <v-row class="mx-3">
                <v-col cols="12" class="ma-0 pa-0">
                  <h4 class="text-end">
                    Identificación {{ shopping.user.identification }}
                  </h4>
                </v-col>
                <v-col cols="12" class="ma-0 pa-0 text-end">
                  <v-chip class="ma-2">
                    <h4>
                      {{ shopping.user.nameUser }}
                    </h4>
                  </v-chip>
                </v-col>
              </v-row>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-card>
  </v-container>
</template>

<script setup>
import { formatNumber_ } from "@/global";
import { onMounted, ref } from "vue";
import { useApiShopping } from "@/stores";
import router from "../../router";

const useShopping = useApiShopping();
const items = ref([]);

onMounted(() => getUsers());

const getUsers = async () => {
  try {
    const response = await useShopping.getShoppings$();
    items.value = response;
  } catch (error) {
    console.error(error);
  }
};
</script>
