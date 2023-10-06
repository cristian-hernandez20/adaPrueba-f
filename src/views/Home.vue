<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ToolBar />
  <v-container class="ma-0 pa-0 mx-auto">
    <v-card>
      <h2 class="my-5 text-center">BIENVENIDO A TENCO ADA</h2>
      <h1 class="text-center my-10" v-if="!items.length">
        NO EXISTEN PRODUCTOS
      </h1>
      <v-divider></v-divider>
      <v-row class="mx-10">
        <v-col cols="4" v-for="product in items" :key="product.id">
          <v-card
            :loading="useLoader.loader"
            class="mx-auto my-12"
            max-width="374"
          >
            <template v-slot:loader="{ isActive }">
              <v-progress-linear
                :active="isActive"
                color="deep-purple"
                height="4"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-img
              cover
              height="250"
              :src="product.image"
              lazy-src="https://picsum.photos/id/11/10/6"
            ></v-img>
            <v-card-item>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle>
                <span class="me-1">Favoritos</span>
                <v-icon
                  color="error"
                  icon="mdi-fire-circle"
                  size="small"
                ></v-icon>
              </v-card-subtitle>
            </v-card-item>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :model-value="4.5"
                  color="amber"
                  density="compact"
                  half-increments
                  readonly
                  size="small"
                ></v-rating>
                <div class="text-grey ms-4">4.5 (413)</div>
              </v-row>
              <div class="my-4 text-subtitle-1">
                $ • ${{ formatNumber_(product.price) }}
              </div>
              <div>
                {{ product.descript }}
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-1"></v-divider>
            <v-card-title>Cantidad disponible</v-card-title>
            <div
              class="px-4"
              :class="`${product.quantity ? 'text-success' : 'text-red'}`"
            >
              <v-chip-group>
                <v-chip :color="`${product.quantity ? 'success' : 'red'}`"
                  >Disponibles - {{ product.quantity }}</v-chip
                >
              </v-chip-group>
            </div>

            <div class="ma-2">
              <v-btn
                class="mx-2 botone"
                color="primary"
                @click="buyShooppingValidate(product)"
              >
                Comprar
              </v-btn>

              <v-btn
                class="mx-2 botone"
                color="success"
                @click="buyShooppingAdd(product)"
              >
                <v-icon> mdi-cart-outline </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <ProductComponent
      :showDialog="showDialog"
      :productRegister="regProductRegister"
      v-if="showDialog"
      @handleFlag="handleFlag"
      @registerProduct="getProducts"
    />
  </v-container>
</template>

<script setup>
import ToolBar from "@/components/global/ToolBar";
import { onMounted, ref } from "vue";
import {
  useApiProduct,
  useApiShopping,
  useModuleLoader,
  useModuleAlert,
} from "@/stores";
import { formatNumber_ } from "@/global";
import { Product } from "@/schema";
import ProductComponent from "@/components/admin/Product";

const useProduct = useApiProduct();
const useShopping = useApiShopping();
const useLoader = useModuleLoader();
const useAlert = useModuleAlert();

const user = ref(JSON.parse(sessionStorage.user));
const items = ref([]);
const showDialog = ref(false);

const regProductRegister = ref(Product);

onMounted(() => getProducts());

const handleFlag = () => {
  showDialog.value = !showDialog.value;
  regProductRegister.value = Product();
};

const buyShooppingValidate = async (product) => {
  useAlert.setAlert$({
    type: "warning",
    message: `¿Estas seguro que deseas comprar ${product.descript}?`,
    func1: null,
    func2: () => buyShoopping(product),
  });
};
const buyShoopping = async (product) => {
  try {
    const buy = {
      id_user: user.value.id,
      id_product: product.id,
    };
    await useShopping.registerShopping$({ shopping: buy });
    getProducts();
  } catch (error) {
    console.error(error);
  }
};
const buyShooppingAdd = async (product) => {
  try {
    const buy = {
      id_user: user.value.id,
      id_product: product.id,
    };
    await useShopping.pushShopping$(buy);
    getProducts();
  } catch (error) {
    console.error(error);
  }
};

const getProducts = async () => {
  try {
    const response = await useProduct.getProducts$();
    items.value = response;
  } catch (error) {
    console.error(error);
  }
};
</script>
