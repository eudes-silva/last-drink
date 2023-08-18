<template>
  <v-table>
    <thead>
      <tr>
        <th
          class="text-secondary text-left"
          v-for="header in headers"
          :key="header.id"
        >
          {{ header.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="item.idDrink"
        @mouseover="handleHoverRow(item)"
        :class="!(index % 2) ? 'bg-grey-lighten-4' : 'bg-white'"
      >
        <td
          class="text-no-wrap text-secondary drink-name"
          v-for="header in headers"
          :key="header.id"
        >
          {{ item[header.value] }}
          <v-icon
            v-if="showDetailsIcon(item, header.value)"
            @click="handleClickEmit(item)"
            class="details-icon ml-2"
            color="tertiary"
            small
            >mdi-eye-outline</v-icon
          >
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup lang="ts">
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
    itemRow.idDrink === state.currentHoveredRowId && itemColumn === "strDrink"
  );
}
</script>
<style lang="scss" scoped>
.drink-name {
  position: relative;
}
.details-icon {
  cursor: pointer;
  position: absolute;
}
</style>
