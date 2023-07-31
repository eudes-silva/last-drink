import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: false,
    theme: {
      defaultTheme: "myCustomTheme",
      themes: {
        myCustomTheme: {
          dark: false,
          colors: {
            primary: "#9C27B0",
            secondary: "#333333",
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FB8C00",
            grey: "#9E9E9E",
            white: "#FFFFFF",
            black: "#010101",
          },
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
