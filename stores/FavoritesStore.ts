import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = useStorage("favorites", [] as Array<{ idDrink: string }>);
  function toggleFavorite(item: { idDrink: string }) {
    if (
      !favorites.value.some(
        (favoriteItem: { idDrink?: string }) =>
          favoriteItem.idDrink === item.idDrink
      )
    ) {
      favorites.value = [...favorites.value, item];
    } else {
      favorites.value = favorites.value.filter(
        (favoriteItem: { idDrink?: string }) =>
          favoriteItem.idDrink !== item.idDrink
      );
    }
  }

  return { favorites, toggleFavorite };
});
