<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-dialog v-model="useAlert.alert.estado" max-width="500" persistent>
    <v-card>
      <v-alert
        border="start"
        :border-color="`${color[useAlert.getAlert.type]}`"
        elevation="2"
      >
        <v-row style="padding-bottom: 10px; padding-top: 10px">
          <v-col cols="4" lg="3" md="3" sm="3">
            <LottieAnimation
              :animation-data="lottie[useAlert.getAlert.type]"
              v-if="useAlert.getAlert.estado"
              class="mx-auto botone"
              style="height: 100px"
              :loopDelayMin="2.5"
              :auto-play="true"
              :loopDelayMax="5"
              :loop="true"
              :speed="1"
              ref="anim"
            />
          </v-col>
          <v-col cols="8" lg="9" md="9" sm="9" class="ml-0 pl-0">
            <v-row justify="center" align="center">
              <v-col cols="12" lg="12" md="12" sm="12" class="ml-0 pl-0">
                <h1
                  :class="`${color[useAlert.getAlert.type]}-text text-center`"
                >
                  {{ titulo[useAlert.getAlert.type] }}
                </h1>
                <h3 class="text-center mt-3">
                  {{ useAlert.getAlert.message }}
                </h3>
              </v-col>
              <v-col cols="6" lg="6" md="6" sm="6" class="py-2 my-0">
                <v-btn
                  color="error"
                  outlined
                  width="110"
                  @click="cancel"
                  class="botone ml-md-13 ml-sm-10"
                  ref="boton_cancelar"
                >
                  Cancelar
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6" lg="6" md="6" sm="6" class="py-2 my-0">
                <v-btn
                  ref="btn1"
                  outlined
                  color="success"
                  width="110"
                  class="botone"
                  @click="accept"
                >
                  Aceptar
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-alert>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import warning from "@/assets/helper/warning.json";
import success from "@/assets/helper/success.json";
import error from "@/assets/helper/error.json";
import info from "@/assets/helper/info.json";
import { useModuleAlert } from "@/stores";

const useAlert = useModuleAlert();

const lottie = ref({
  warning: warning,
  error: error,
  success: success,
  info: info,
});
const color = ref({
  warning: "warning",
  error: "error",
  success: "success",
  info: "info",
});
const titulo = ref({
  warning: "¡Precaución!",
  error: "¡Error!",
  success: "¡Hecho!",
  info: "¡Atención!",
});

onMounted(() => configAlert());
const configAlert = () => {};
const cancel = () => {
  if (useAlert.alert.func1) useAlert.alert.func1();
  useAlert.setAlertOff$();
};
const accept = () => {
  if (useAlert.alert.func2) useAlert.alert.func2();
  useAlert.setAlertOff$();
};
</script>
