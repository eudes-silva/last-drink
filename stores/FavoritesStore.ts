import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore(
  "favorites",
  () => {
    const favorites = ref([] as Array<{ idDrink: string }>);
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
  },
  {
    persist: {
      key: "favorites",
      storage: persistedState.cookiesWithOptions({
        sameSite: "strict",
        secure: true,
      }),
    },
  }
);
