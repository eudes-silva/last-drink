<template>
  <v-card class="ml-auto elevation-0 rounded-xl" color="white" max-width="400">
    <v-card-text class="px-0">
      <v-text-field
        v-model="state.searchInput"
        :disabled="disabled"
        :class="propClass"
        :rounded="rounded"
        :base-color="baseColor"
        :density="density"
        :variant="variant"
        :label="label"
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

const props = withDefaults(
  defineProps<{
    baseColor?: string;
    label: string;
    disabled?: boolean;
    kind?: string;
    density?: string;
    rounded?: string;
    propClass?: string;
  }>(),
  {
    baseColor: "",
    label: "",
    disabled: false,
    kind: "primary",
    density: "",
    rounded: "",
    propClass: "",
  }
);

const variant = computed(
  () =>
    ((
      {
        primary: "elevated",
        secondary: "outlined",
        tertiary: "flat",
      } as const
    )[props.kind])
);

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
