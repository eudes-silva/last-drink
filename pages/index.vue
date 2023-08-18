<template>
  <CoreSnackbar
    v-if="Object.keys(state.feedbackMsg).length"
    :kind="state.feedbackMsg.kind"
    :snackbarActive="!!state.feedbackMsg.activateMsgComponent"
    :text="state.feedbackMsg.message"
    :timeout="5000"
  ></CoreSnackbar>

  <v-row
    class="bg-tertiary d-flex justify-space-between align-center bg-white elevation-5 px-4 py-2 pb-sm-3 pt-sm-3 mt-12 mx-2 mx-sm-10 rounded-xl"
  >
    <v-col cols="12" sm="4" md="3" lg="2" class="pt-4">
      <CoreSelect
        :key="state.resetSelectComponent"
        density="compact"
        kind="secondary"
        item-title="strCategory"
        item-value="strCategory"
        prop-class="text-secondary"
        color="secondary"
        base-color="secondary"
        label="Categorias"
        rounded="lg"
        :categories="state.categories"
        @display-by-selected="getBySelectedDrinkCategory"
        @clear-selected="clearSelectedCategory"
      />
    </v-col>
    <v-col class="py-0 text-right" cols="12" sm="6" md="4" lg="3" xl="2">
      <CoreSearch
        density="compact"
        kind="secondary"
        item-title="strCategory"
        item-value="strCategory"
        prop-class="text-secondary"
        base-color="secondary"
        label="Buscar por nome da bebida"
        rounded="lg"
        :key="state.selectedCategory"
        @search-input="searchDrinkByName"
      ></CoreSearch>
    </v-col>
  </v-row>
  <div
    v-if="state.drinks.length"
    class="bg-white my-12 elevation-5 mx-2 mx-sm-10 py-6 px-8 rounded-xl"
  >
    <DrinksList
      :headers="state.headers"
      :items="state.drinks"
      @getDrinkDetailsByName="getDrinkDetailsByName"
    />
  </div>
  <Teleport to="body">
    <CoreModal :dialog="state.dialog" :key="+state.dialog">
      <template #content>
        <CoreCard kind="primary" props-class="rounded-lg bg-white elevation-5">
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
            <h3 class="text-center py-3 px-4">{{ state.card.drinkTitle }}</h3>
            <p class="px-4 pt-0 pb-5 text-center font-weight-light">
              {{ state.card.drinkDescription }}
            </p>
          </template>
          <template #actions>
            <CoreBtn
              prop-class="text-primary bg-grey-lighten-2 text-capitalize
          rounded-0"
              kind="tertiary"
              label="Fechar"
              min-height="60"
              block
              @click="state.dialog = false"
            />
          </template>
        </CoreCard>
      </template>
    </CoreModal>
  </Teleport>
</template>
<script setup lang="ts">
import { reactive, onMounted } from "vue";

useHead({
  title: "Home",
});

interface FeedbackMsg {
  kind: "success" | "warning" | "error";
  activateMsgComponent: boolean;
  message: string;
}

interface Card {
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
  }>("/api/json/v1/1/list.php?c=list", {
    method: "GET",
    onResponseError({ response }) {
      handleResponseError(response);
    },
  });

  if (!response.error.value && response.data.value) {
    state.categories = response.data.value.drinks;
    getAllDrinks();
  }
}

function getAllDrinks() {
  state.categories.forEach(async (category: Category) => {
    state.drinks = [];
    const response = await useCustomFetch<{
      drinks: Array<Drink>;
      error: object;
    }>(`/api/json/v1/1/filter.php?c=${category.strCategory}`, {
      method: "GET",
      onResponseError({ response }) {
        handleResponseError(response);
      },
    });

    if (!response.error.value && response.data.value) {
      state.headers = [
        { id: "1", name: "Nome da bebida", value: "strDrink" },
        { id: "2", name: "Categoria", value: "drinkCategory" },
      ];

      Object.assign(state.drinksByCategory, {
        [category.strCategory]: [
          ...response.data.value.drinks?.map((item) => {
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
  state.selectedCategory = selectedCategoryName;
  state.drinks = [];
  state.drinks = state.drinksByCategory[selectedCategoryName];
}

function clearSelectedCategory() {
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

async function searchDrinkByName(searchState: {
  searchInput: string;
  isEmpty: boolean;
}) {
  const filteredDrinks = state.drinks.filter((drink: Drink) => {
    return drink.strDrink
      .toLowerCase()
      .includes(searchState.searchInput.toLocaleLowerCase());
  });
  if (searchState.isEmpty) {
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
  }>(`/api/json/v1/1/lookup.php?i=${drinkItem.idDrink}`, {
    method: "GET",
    onResponseError({ response }) {
      handleResponseError(response);
    },
  });
  if (!response.error.value && response.data.value) {
    const cardContent: Card = {
      drinkImg: `${drinkItem.strDrinkThumb}/preview`,
      drinkTitle: drinkItem.strDrink,
      drinkDescription: response.data.value?.drinks[0].strInstructions,
    };
    state.card = cardContent;
    state.dialog =
      !!cardContent.drinkImg ||
      !!cardContent.drinkTitle ||
      !!cardContent.drinkDescription;
  }
}
</script>
