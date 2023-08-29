<template>
  <v-table>
    <thead>
      <tr>
        <th
          class="text-black text-left"
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
          {{ $t(item[header.value]) }}
          <Transition>
            <v-icon
              v-if="showDetailsIcon(item, header.value)"
              @click="store.toggleFavorite(item)"
              class="favorite-icon ml-2"
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
          </Transition>
          <Transition>
            <v-icon
              v-if="showDetailsIcon(item, header.value)"
              @click="handleClickEmit(item)"
              class="details-icon ml-9"
              color="tertiary"
              size="30px"
              >mdi-eye-outline</v-icon
            >
          </Transition>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup lang="ts">
import { useFavoritesStore } from "@/stores/FavoritesStore";
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
function showDetailsIcon(itemRow: Item, itemColumn: string) {
  return (
    (itemRow.idDrink === state.currentHoveredRowId || mobile.value) &&
    itemColumn === "strDrink"
  );
}
</script>
<style lang="scss" scoped>
.drink-name {
  position: relative;
}
.details-icon {
  transform: translateY(-3px);
}
.details-icon,
.favorite-icon {
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
