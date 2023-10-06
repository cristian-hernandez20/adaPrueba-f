<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-dialog v-model="showDialog" persistent width="550">
    <v-container>
      <v-card shaped class="rounded-xl">
        <template v-slot:title>
          <h3 class="text-center my-2 text-primary">Registrar producto</h3>
        </template>
        <v-row justify="center" class="pb-10 px-4" dense>
          <v-col cols="12">
            <v-text-field
              density="compact"
              placeholder="Nombre"
              label="Nombre"
              variant="outlined"
              v-model="regProductRegister.name"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              density="compact"
              placeholder="Descripción"
              label="Descripción"
              variant="outlined"
              v-model="regProductRegister.descript"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              density="compact"
              placeholder="Cantidad"
              label="Cantidad"
              variant="outlined"
              type="number"
              v-model="regProductRegister.quantity"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              density="compact"
              placeholder="Precio"
              label="Precio"
              variant="outlined"
              type="number"
              v-model="regProductRegister.price"
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
              @click="registerProduct"
              color="success"
              shaped
            >
              Registrar
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-dialog>
</template>
<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

import { Product } from "@/schema";
import { useApiProduct, useModuleLoader } from "@/stores";

const props = defineProps({
  showDialog: Boolean,
  productRegister: Object,
});
const emits = defineEmits(["handleFlag", "registerProduct"]);

const showDialog = ref(props.showDialog);

const productRegister = ref(props.productRegister);

const useProduct = useApiProduct();
const useLoader = useModuleLoader();

const regProductRegister = ref(Product());

onMounted(() => {
  if (props?.productRegister?.id) {
    Object.assign(regProductRegister.value, productRegister.value);
  }
});

const handleFlag = () => {
  emits("handleFlag");
  regProductRegister.value = Product();
};

const registerProduct = async () => {
  if (props?.productRegister?.id) {
    return editProduct();
  }
  try {
    await useProduct.registerProduct$({ product: regProductRegister.value });
    emits("handleFlag");
    emits("registerProduct");
  } catch (error) {
    console.error(error);
  }
};
const editProduct = async () => {
  try {
    await useProduct.editProduct$({ product: regProductRegister.value });
    emits("handleFlag");
    emits("registerProduct");
  } catch (error) {
    console.error(error);
  }
};
</script>
