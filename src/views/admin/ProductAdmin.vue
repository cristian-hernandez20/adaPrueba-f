<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-card width="100%">
      <v-btn
        color="primary mx-2 botone"
        @click="router.push({ name: 'Home-admin' })"
        ><v-icon> mdi-keyboard-backspace </v-icon> Volver
      </v-btn>
      <h2 class="my-5 text-center">GESTIÓN DE PRODUCTOS</h2>

      <v-card class="mx-auto mb-10" max-width="800" elevation="5">
        <div class="text-end">
          <v-btn class="my-4" color="primary" @click="handleFlag"
            >agregar
          </v-btn>
        </div>
        <h1 class="text-center" v-if="!items.length">NO EXISTEN PRODUCTOS</h1>
        <v-list lines="two">
          <v-list-item
            v-for="product in items"
            :key="product.id"
            :title="product.name"
            :subtitle="product.descript"
          >
            <template v-slot:prepend>
              <v-avatar color="grey-lighten-1">
                <v-img
                  :src="product.image"
                  height="100%"
                  max-width="350"
                  aspect-ratio
                  lazy-src="https://picsum.photos/id/11/10/6"
                />
              </v-avatar>
            </template>
            <h4 :class="`${product.quantity ? 'text-success' : 'text-red'}`">
              Disponibles {{ product.quantity }}
            </h4>
            <template v-slot:append>
              <h4 class="text-end">
                {{ formatNumber_(product.price) }}
              </h4>
              <v-btn
                color="grey-lighten-1"
                icon="mdi-pencil"
                variant="text"
                @click="editProduct(product)"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
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
import { onMounted, ref } from "vue";
import { useApiProduct } from "@/stores";
import { formatNumber_ } from "@/global";
import { Product } from "@/schema";
import ProductComponent from "@/components/admin/Product";
import router from "../../router";

const useProduct = useApiProduct();
const items = ref([]);
const showDialog = ref(false);

const regProductRegister = ref(Product);

onMounted(() => getProducts());

const handleFlag = () => {
  showDialog.value = !showDialog.value;
  regProductRegister.value = Product();
};
const editProduct = (product) => {
  regProductRegister.value = Product();
  Object.assign(regProductRegister.value, product);
  showDialog.value = !showDialog.value;
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
