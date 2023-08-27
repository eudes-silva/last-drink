import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: false,
    theme: {
      defaultTheme: "lastDrinkTheme",
      themes: {
        lastDrinkTheme: {
          dark: false,
          colors: {
            primary: "#360504",
            secondary: "#9f200f",
            tertiary: "#7c8d30",
            btn: "#f0d67c",
            error: "#d74d47",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FB8C00",
            grey: "#9E9E9E",
            white: "#FFFFFF",
            black: "#04040c",
            mainbg: "#cccccc",
          },
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
