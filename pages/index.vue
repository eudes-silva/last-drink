<template>
  <div class="d-flex flex-column h-screen">
    <header class="elevation-5">
      <v-row class="bg-primary px-2 px-sm-12 py-4" no-gutters>
        <v-col>
          <v-img
            :class="{ 'mx-auto': smAndDown }"
            width="220"
            min-width="220"
            cover
            src="/images/lastdrink-logo.png"
          >
          </v-img>
        </v-col>
        <v-col
          class="d-flex align-center"
          :class="smAndDown ? 'justify-space-between px-5 mt-4' : 'justify-end'"
        >
          <v-badge
            class="mr-10"
            :content="favorites.length"
            text-color="white"
            color="secondary"
            floating
          >
            <CoreBtn
              :label="$t('favorites')"
              prop-class="text-primary bg-btn text-capitalize"
              append-icon="mdi-heart"
              @click="showFavorites()"
            >
            </CoreBtn>
          </v-badge>
          <v-btn-toggle
            v-model="$i18n.locale"
            class="bg-transparent"
            rounded
            mandatory
            density="compact"
          >
            <CoreBtn
              v-for="locale in $i18n.availableLocales"
              kind="tertiary"
              size="x-small"
              :label="locale"
              color="primary"
              prop-class="bg-transparent text-btn text-uppercase"
              rounded="rounded-lg"
              :value="locale"
            >
            </CoreBtn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </header>
    <main class="bg-mainbg py-12 mt-16" :class="smAndDown ? 'pt-16' : 'pt-10'">
      <v-row
        class="d-flex justify-space-between align-center bg-white elevation-5 mt-16 mt-sm-10 px-4 py-6 mx-4 mx-sm-10 rounded-xl"
      >
        <v-col cols="12" sm="4" md="3" lg="2" class="py-0 mb-5 mb-sm-0">
          <CoreSelect
            :key="state.resetSelectComponent"
            density="compact"
            kind="secondary"
            item-title="strCategory"
            item-value="valueCategory"
            prop-class="text-primary"
            color="primary"
            base-color="primary"
            focused
            :label="$t('categories')"
            rounded="lg"
            :categories="categories"
            @display-by-selected="getBySelectedDrinkCategory"
            @clear-selected="clearSelectedCategory"
          />
        </v-col>
        <v-col class="py-0 text-right" cols="12" sm="6" md="4" lg="3" xl="2">
          <CoreSearch
            v-model="searchedDrinkNameInput"
            density="compact"
            kind="secondary"
            prop-class="text-primary"
            base-color="primary"
            :label="$t('search-drink-by-name')"
            rounded="lg"
            :key="state.selectedCategory"
            @update:modelValue="searchDrinkByName"
          >
          </CoreSearch>
        </v-col>
      </v-row>
      <Transition>
        <div
          v-if="state.drinks.length"
          class="bg-white mt-12 elevation-5 mx-4 mx-sm-10 py-6 px-8 rounded-xl"
        >
          <DrinksTable
            ref="drinksTable"
            :headers="state.headers"
            :items="state.drinks"
            @getDrinkDetailsByName="getDrinkDetailsByName"
          />
        </div>
      </Transition>
      <Teleport to="body">
        <CoreModal :dialog="state.dialog" :key="+state.dialog">
          <template #content>
            <CoreCard
              kind="primary"
              props-class="rounded-lg bg-white elevation-5"
            >
              <template #cover>
                <v-img
                  width="400"
                  height="100%"
                  cover
                  :lazy-src="state.card.drinkImg"
                  :src="state.card.drinkImg"
                  aspect-ratio="1"
                >
                </v-img>
              </template>
              <template #content>
                <h3 class="text-center py-3 px-4">
                  {{ state.card.drinkTitle
                  }}<Transition>
                    <v-icon color="secondary" class="ml-4 mb-1">{{
                      favorites.find(
                        (favorite) => favorite.idDrink === state.card.idDrink
                      )
                        ? "mdi-heart"
                        : "mdi-heart-outline"
                    }}</v-icon>
                  </Transition>
                </h3>
                <p class="px-4 pt-0 pb-5 text-center font-weight-light">
                  {{ state.card.drinkDescription }}
                </p>
              </template>
              <template #actions>
                <CoreBtn
                  prop-class="text-primary bg-grey-lighten-2 text-capitalize
          rounded-0"
                  kind="tertiary"
                  :label="$t('close')"
                  min-height="60"
                  block
                  @click="state.dialog = false"
                />
              </template>
            </CoreCard>
          </template>
        </CoreModal>
      </Teleport>
    </main>
    <footer class="text-center py-12 bg-grey-lighten-4">
      <p class="text-primary">
        LastDrink &copy; {{ new Date().getFullYear() }}
      </p>
    </footer>
    <CoreSnackbar
      v-if="Object.keys(state.feedbackMsg).length"
      :kind="state.feedbackMsg.kind"
      :snackbarActive="!!state.feedbackMsg.activateMsgComponent"
      :text="state.feedbackMsg.message"
      :timeout="5000"
    ></CoreSnackbar>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useFavoritesStore } from "../stores/FavoritesStore";
const store = useFavoritesStore();
const config = useRuntimeConfig();
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

useHead({
  title: "Home",
});

const searchedDrinkNameInput = ref("");

const favorites = computed(() => store.favorites);

interface FeedbackMsg {
  kind: "success" | "warning" | "error";
  activateMsgComponent: boolean;
  message: string;
}

interface Card {
  idDrink: string;
  drinkImg: string;
  drinkTitle: string;
  drinkDescription: string;
}

interface Category {
  strCategory: string;
}

interface Header {
  id: string;
  name: string;
  value: string;
}

interface Drink {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strDrinkThumb: string;
  drinkCategory: string;
}

const state = reactive({
  dialog: false as boolean,
  categories: [] as Category[],
  selectedCategory: "" as string,
  resetSelectComponent: 0 as number,
  headers: [] as Header[],
  drinks: [] as Drink[],
  drinksByCategory: {} as Record<string, never>,
  card: {} as Card,
  feedbackMsg: {} as FeedbackMsg,
});

onMounted(() => {
  getAllDrinkCategories();
});

function handleResponseError(error: { status: number }) {
  if (error.status === 400) {
    const errorMsg: FeedbackMsg = {
      kind: "error",
      message: "Erro! Solicitação inválida.",
      activateMsgComponent: true,
    };
    state.feedbackMsg = errorMsg;
  }
  if (error.status === 500) {
    const errorMsg: FeedbackMsg = {
      kind: "error",
      message: "Erro interno de servidor.",
      activateMsgComponent: true,
    };
    state.feedbackMsg = errorMsg;
  }
}

async function getAllDrinkCategories() {
  const response = await useCustomFetch<{
    drinks: Array<Category>;
    error: object;
  }>(`${config.public.apiBase}/list.php?c=list`, {
    method: "GET",
    onResponseError({ response }) {
      handleResponseError(response);
    },
  });

  if (response.data.value) {
    state.categories = response.data.value.drinks;
    getAllDrinks();
  }
}

const categories = computed(() => {
  return state.categories.map((category) => {
    return {
      strCategory: t(`${category.strCategory}`),
      valueCategory: category.strCategory,
    };
  });
});

function getAllDrinks() {
  state.categories.forEach(async (category: Category) => {
    state.drinks = [];
    const response = await useCustomFetch<{
      drinks: Array<Drink>;
      error: object;
    }>(`${config.public.apiBase}/filter.php?c=${category.strCategory}`, {
      method: "GET",
      onResponseError({ response }) {
        handleResponseError(response);
      },
    });

    if (response.data.value) {
      state.headers = [
        { id: "1", name: "drink-name", value: "strDrink" },
        { id: "2", name: "category", value: "drinkCategory" },
      ];

      Object.assign(state.drinksByCategory, {
        [category.strCategory]: [
          ...response.data.value.drinks.map((item) => {
            return { ...item, drinkCategory: category.strCategory };
          }),
        ],
      });
      state.drinks.push(
        ...response.data.value?.drinks.map((item: Drink) => {
          return {
            ...item,
            drinkCategory: category.strCategory,
            idDrink: item.idDrink,
            strDrinkThumb: item.strDrinkThumb,
          };
        })
      );
      sortDrinksByName(state.drinks as Array<Drink>);
    }
  });
}

async function getBySelectedDrinkCategory(selectedCategoryName: string) {
  searchedDrinkNameInput.value = "";
  state.selectedCategory = selectedCategoryName;
  state.drinks = [];
  state.drinks = state.drinksByCategory[selectedCategoryName];
}

function clearSelectedCategory() {
  searchedDrinkNameInput.value = "";
  state.resetSelectComponent++;
  getAllDrinkCategories();
}

function sortDrinksByName(drinks: Array<Drink>) {
  return [
    ...drinks.sort((drinkItem, nextDrinkItem) =>
      drinkItem.strDrink.localeCompare(nextDrinkItem.strDrink)
    ),
  ];
}

async function searchDrinkByName() {
  const filteredDrinks = state.drinks.filter((drink: Drink) => {
    return drink.strDrink
      .toLowerCase()
      .includes(searchedDrinkNameInput.value.toLocaleLowerCase());
  });
  if (!searchedDrinkNameInput.value) {
    state.selectedCategory
      ? getBySelectedDrinkCategory(state.selectedCategory)
      : getAllDrinkCategories();
  } else {
    state.drinks = filteredDrinks;
  }
}

async function getDrinkDetailsByName(drinkItem: Drink) {
  state.dialog = false;
  const response = await useCustomFetch<{
    drinks: Array<{ strInstructions: string }>;
    error: object;
  }>(`${config.public.apiBase}/lookup.php?i=${drinkItem.idDrink}`, {
    method: "GET",
    onResponseError({ response }) {
      handleResponseError(response);
    },
  });

  if (response.data.value) {
    const cardContent: Card = {
      idDrink: drinkItem.idDrink,
      drinkImg: `${drinkItem.strDrinkThumb}/preview`,
      drinkTitle: drinkItem.strDrink,
      drinkDescription: response.data.value.drinks[0].strInstructions,
    };
    state.card = cardContent;
    state.dialog = true;
  }
}
function showFavorites() {
  state.drinks = [...favorites.value] as Array<Drink>;
  sortDrinksByName(state.drinks as Array<Drink>);
  state.selectedCategory = "";
  state.resetSelectComponent++;
}
</script>
<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}
footer {
  flex-shrink: 0;
}
main {
  flex-grow: 1;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
