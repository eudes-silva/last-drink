<template>
  <v-snackbar :color="color" v-model="state.snackbarActive" :timeout="timeout">
    <slot>
      {{ text }}
      <slot name="actions">
        <v-btn @click="state.snackbarActive = false"> Fechar </v-btn>
      </slot>
    </slot>
  </v-snackbar>
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";
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
