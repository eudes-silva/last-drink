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
      <tr v-for="item in items" :key="item.idDrink">
        <td class="text-no-wrap text-secondary" v-for="header in headers">
          {{ item[header.value]
          }}<v-icon
            @click="handleClickEmit(item)"
            class="ml-2 mb-1 details-icon"
            v-if="header.value === 'strDrink'"
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
    headers?: Array<Header>;
    items?: Array<Item>;
  }>(),
  {
    headers: () => [],
    items: () => [],
  }
);

function handleClickEmit(drinkItem: object) {
  emit("getDrinkDetailsByName", drinkItem);
}
</script>
<style lang="scss" scoped>
.details-icon {
  cursor: pointer;
}
</style>
