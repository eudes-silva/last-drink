<template>
  <div class="text-center h-screen error-container">
    <div>
      <v-icon size="x-large" color="warning">mdi-alert</v-icon>
      <h1>{{ error?.statusCode }}</h1>
      <p>{{ error?.message }}</p>
      <CoreBtn
        rounded="normal"
        kind="secondary"
        color="primary"
        label="Voltar para a página inicial"
        size="small"
        class="mt-2 text-lowercase"
        @click="handleError"
      ></CoreBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
<style lang="scss">
html {
  height: 100vh;
}
.error-container {
  display: grid;
  place-items: center;
}
</style>
