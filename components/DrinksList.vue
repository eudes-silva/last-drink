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
      <tr v-for="item in props.items" :key="item.idDrink">
        <td class="text-secondary" v-for="header in props.headers">
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
import { reactive, computed } from "vue";

const state = reactive({
  itemId: null,
});

const props = withDefaults(
  defineProps<{
    headers?: Array<any>;
    items?: Array<any>;
  }>(),
  {
    headers: () => [],
    items: () => [],
  }
);

function handleClickEmit(drinkName: object) {
  emit("getDrinkDetailsByName", drinkName);
}
function showDetailsBtn(id: any) {
  state.itemId = id;
}
</script>
<style lang="scss" scoped>
.details-icon {
  cursor: pointer;
}
</style>
