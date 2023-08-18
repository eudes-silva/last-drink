<template>
  <div class="d-flex flex-column h-100">
    <header class="elevation-5">
      <v-row no-gutters>
        <v-col class="px-12 bg-primary py-3">
          <h1 class="text-white font-weight-regular text-no-wrap">
            LastDrink<v-icon class="ml-5" color="white" size="40px"
              >mdi-glass-cocktail</v-icon
            >
          </h1>
          <p class="text-white font-weight-light text-no-wrap pb-1">
            Your favorite drink search tool!
          </p>
        </v-col>
      </v-row>
    </header>
    <main class="bg-mainbg">
      <slot />
    </main>
    <footer class="text-center py-12 bg-grey-lighten-4">
      <p class="text-grey">LastDrink &copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
header {
  z-index: 2;
}
footer {
  flex-shrink: 0;
  width: 100%;
}
main {
  flex-grow: 1;
}
</style>
