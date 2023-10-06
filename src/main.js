import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import Vue3Toastify from "vue3-toastify";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: toast.POSITION.BOTTOM_RIGHT,
});

registerPlugins(app);

app.mount("#app");
