import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "pt-BR",
    messages: {
      "en-US": en,
      "pt-BR": pt,
    },
  });

  vueApp.use(i18n);
});
