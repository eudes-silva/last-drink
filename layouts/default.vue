<template>
  <div class="d-flex flex-column h-100">
    <header>
      <v-row>
        <v-col class="px-12 py-6 bg-secondary elevation-5">
          <h1 class="text-white font-weight-medium text-no-wrap">
            LastDrink<v-icon class="ml-5" color="white" size="40px"
              >mdi-glass-cocktail</v-icon
            >
          </h1>
          <p class="text-white font-weight-medium text-no-wrap">
            Your favorite drink search tool!
          </p>
        </v-col>
      </v-row>
    </header>
    <main>
      <slot />
    </main>
    <footer class="text-center py-12 bg-grey-lighten-4">
      <p class="text-grey">LastDrink © 2023</p>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
footer {
  flex-shrink: 0;
  width: 100%;
}
main {
  flex-grow: 1;
}
</style>
