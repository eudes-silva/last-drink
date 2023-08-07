<template>
  <v-snackbar :color="color" v-model="state.snackbarActive" :timeout="timeout">
    {{ text }}
    <template v-slot:actions>
      <v-btn @click="state.snackbarActive = false"> Fechar </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    kind?: "success" | "warning" | "error";
    snackbarActive: boolean;
    text: string;
    timeout?: number;
    variant?: string;
  }>(),
  {
    kind: "success",
    snackbarActive: true,
    timeout: 2000,
    variant: "text",
  }
);
const color = computed(
  () =>
    ((
      {
        success: "#4CAF50",
        warning: "#FB8C00",
        error: "#FF5252",
      } as const
    )[props.kind])
);

const state = reactive({
  snackbarActive: props.snackbarActive,
});
</script>
