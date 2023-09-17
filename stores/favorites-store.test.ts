import { setActivePinia, createPinia } from "pinia";
import { useFavoritesStore } from "../stores/FavoritesStore";
import { describe, expect, it } from "vitest";

describe("FavoritesStore", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it("should include a favorite", () => {
    const favoritesStore = useFavoritesStore();
    favoritesStore.toggleFavorite({ idDrink: "4" });
    expect(favoritesStore.favorites).toContainEqual({ idDrink: "4" });
  });

  it("should remove a favorite", () => {
    const favoritesStore = useFavoritesStore();
    favoritesStore.favorites = [{ idDrink: "4" }];
    favoritesStore.toggleFavorite({ idDrink: "4" });
    expect(favoritesStore.favorites.length).toBe(0);
  });
});
