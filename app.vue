<template>
  <NuxtPage />
</template>
<script setup lang="ts">
useHead({
  titleTemplate: (title) => {
    return title ? `LastDrink | ${title}` : "LastDrink";
  },
});
</script>
<style>
body,
#__nuxt {
  min-height: 100%;
}
</style>
