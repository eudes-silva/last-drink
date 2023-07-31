// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
});
