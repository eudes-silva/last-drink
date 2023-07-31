<template>
  <v-card class="ml-auto elevation-0 rounded-xl" color="white" max-width="400">
    <v-card-text class="px-0">
      <v-text-field
        v-model="state.searchInput"
        class="text-primary"
        rounded="lg"
        base-color="primary"
        density="compact"
        variant="outlined"
        label="Buscar por nome da bebida"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @keyup.enter="handleSearchInput"
        @click:append-inner="handleSearchInput"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { reactive, watch } from "vue";
const emit = defineEmits(["searchInput"]);

const state = reactive({
  searchInput: "",
  isEmpty: false,
});
watch(
  () => state.searchInput,
  (value) => {
    if (value === "") {
      state.isEmpty = true;
      handleSearchInput();
      state.isEmpty = false;
    }
  }
);
function handleSearchInput() {
  emit("searchInput", state);
}
</script>
