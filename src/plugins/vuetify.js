import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#123D7D",
          secondary: "#21759C",
          boton: "#ECC962",
          tertiary: "5252e8",
          accent: "#5F6A6A",
          error: "#cc0000",
          info: "#0D1A64",
          salir: "#09696e",
          success: "#4BB543",
          warning: "#FFC107",
          background: "#D5D5D5",
        },
      },
    },
  },
});
