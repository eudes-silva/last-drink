// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: `/api/json/v1/${process.env.API_KEY}`,
    },
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
});
