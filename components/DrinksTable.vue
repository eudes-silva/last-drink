<template>
  <v-table>
    <thead>
      <tr>
        <th
          class="text-primary text-left"
          v-for="header in headers"
          :key="header.id"
        >
          {{ $t(header.name) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="item.idDrink"
        @mouseover="handleHoverRow(item)"
        :class="{ 'bg-grey-lighten-4': !(index % 2) }"
      >
        <td
          class="text-no-wrap text-black drink-name"
          v-for="header in headers"
          :key="header.id"
        >
          {{
            header.id === "1" ? item[header.value] : $t(`${item[header.value]}`)
          }}
          <v-icon
            @click="store.toggleFavorite(item)"
            class="ml-2 favorite-icon"
            :class="
              showRowIcons(item, header.value) ? 'icon-visible' : 'icon-hidden'
            "
            color="secondary"
            small
            >{{
              store.favorites.some(
                (favorite) => favorite.idDrink === item.idDrink
              )
                ? "mdi-heart"
                : "mdi-heart-outline"
            }}</v-icon
          >
          <v-icon
            data-test="details"
            @click="handleClickEmit(item)"
            class="ml-1 details-icon"
            :class="
              showRowIcons(item, header.value) ? 'icon-visible' : 'icon-hidden'
            "
            color="tertiary"
            size="30px"
            >mdi-eye-outline</v-icon
          >
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup lang="ts">
import { useFavoritesStore } from "../stores/FavoritesStore";
const store = useFavoritesStore();
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
const emit = defineEmits(["getDrinkDetailsByName"]);

const state = reactive({
  currentHoveredRowId: "",
});

interface Header {
  id: string;
  name: string;
  value: string;
}

interface Item {
  idDrink: string;
  [strDrink: string]: string;
  drinkCategory: string;
  strDrinkThumb: string;
}

const props = withDefaults(
  defineProps<{
    headers?: Header[];
    items?: Item[];
  }>(),
  {
    headers: () => [],
    items: () => [],
  }
);

function handleClickEmit(drinkItem: Item) {
  emit("getDrinkDetailsByName", drinkItem);
}
function handleHoverRow(drinkItem: Item) {
  state.currentHoveredRowId = drinkItem.idDrink;
}
function showRowIcons(itemRow: Item, itemColumn: string) {
  return (
    (itemRow.idDrink === state.currentHoveredRowId || mobile.value) &&
    itemColumn === "strDrink"
  );
}
</script>
<style lang="scss" scoped>
.icon-visible {
  visibility: visible;
  transition: opacity 0.3s ease-in-out;
}
.icon-hidden {
  visibility: hidden;
  opacity: 0;
}
</style>
