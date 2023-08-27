<template>
  <div class="h-screen">
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
useHead({
  titleTemplate: (title) => {
    return title ? `LastDrink | ${title}` : "LastDrink";
  },
});
</script>
