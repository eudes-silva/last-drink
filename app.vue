<template>
  <div class="h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
useHead({
  titleTemplate: (title) => {
    return title ? `LastDrink | ${title}` : "LastDrink";
  },
});
</script>
