<template>
  <CoreSnackbar
    v-if="Object.keys(state.feedbackMsg).length"
    :kind="state.feedbackMsg.kind"
    :snackbarActive="!!state.feedbackMsg.activateMsgComponent"
    :text="state.feedbackMsg.message"
    :timeout="5000"
  ></CoreSnackbar>

  <v-row
    class="bg-tertiary d-flex justify-space-between align-center bg-white elevation-5 px-4 py-0 mt-12 mx-10 rounded-xl"
  >
    <v-col cols="12" sm="4" md="3" lg="2" class="pt-4">
      <CoreSelect
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
    <v-col class="py-0 text-right" cols="12" sm="6">
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
    class="bg-white my-12 elevation-5 mx-10 py-6 px-8 rounded-xl"
  >
    <DrinksList
      :headers="state.headers"
      :items="state.drinks"
      @getDrinkDetailsByName="getDrinkDetailsByName"
    />
  </div>
  <CoreModal :dialog="state.dialog" :key="+state.dialog">
    <template #content>
      <CoreCard
        kind="primary"
        orientation="vertical"
        props-class="rounded-lg bg-white elevation-5"
      >
        <template #cover>
          <v-img
            width="400px"
            min-height="100%"
            cover
            :src="state.drinkImg"
          ></v-img>
        </template>
        <template #content>
          <h3 class="text-center py-3 px-4">{{ state.drinkTitle }}</h3>
          <p class="px-4 pt-0 pb-5 text-center font-weight-light">
            {{ state.drinkDescription }}
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
</template>
<script setup lang="ts">
import { reactive, onMounted } from "vue";

const state = reactive({
  dialog: false,
  categories: [] as Array<object>,
  selectedCategory: "",
  headers: [
    { name: "Nome da bebida", value: "strDrink" },
    { name: "Categoria", value: "drinkCategory" },
  ],
  drinks: [] as Array<object>,
  drinkImg: "",
  drinkTitle: "",
  drinkDescription: "",
  feedbackMsg: {},
});

onMounted(() => {
  getAllDrinkCategories();
});

async function getAllDrinkCategories() {
  const { data: drinksCategories, error }: { data: any; error?: any } =
    await useCustomFetch<any>("/api/json/v1/1/list.php?c=list", {
      method: "GET",
      onResponseError({ response }) {
        if (response.status === 404) {
          state.feedbackMsg = {
            kind: "error",
            message: "Erro! Não encontrado.",
            activateMsgComponent: true,
          };
        }
        if (response.status === 500) {
          state.feedbackMsg = {
            kind: "error",
            message: "Erro interno de servidor.",
            activateMsgComponent: true,
          };
        }
      },
    });

  if (!error.value) {
    state.categories = drinksCategories.value.drinks;
    getAllDrinks();
  }
}

function getAllDrinks() {
  state.categories.forEach(async (category: any) => {
    getBySelectedDrinkCategory(category.strCategory);
  });
  state.selectedCategory = "";
}

async function getBySelectedDrinkCategory(selectedCategoryName: string) {
  state.selectedCategory = selectedCategoryName;
  state.drinks = [];
  const { data: getDrinksByCategory, error } = await useCustomFetch<any>(
    `/api/json/v1/1/filter.php?c=${selectedCategoryName}`,
    {
      method: "GET",
      onResponseError({ response }) {
        if (response.status === 404) {
          state.feedbackMsg = {
            kind: "error",
            message: "Erro! Não encontrado.",
            activateMsgComponent: true,
          };
        }
        if (response.status === 500) {
          state.feedbackMsg = {
            kind: "error",
            message: "Erro interno de servidor.",
            activateMsgComponent: true,
          };
        }
      },
    }
  );

  if (!error.value) {
    state.drinks.push(
      ...getDrinksByCategory.value.drinks.map((item: any) => {
        return { ...item, drinkCategory: selectedCategoryName };
      })
    );
    sortDrinksByName(state.drinks);
  }
}

function clearSelectedCategory() {
  state.selectedCategory = "";
  getAllDrinkCategories();
}

function sortDrinksByName(drinks: Array<object>) {
  return [
    ...drinks.sort((a: any, b: any) => a.strDrink.localeCompare(b.strDrink)),
  ];
}

async function searchDrinkByName(searchState: {
  searchInput: string;
  isEmpty: boolean;
}) {
  const filteredDrinks = state.drinks.filter((drink: any) => {
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

async function getDrinkDetailsByName(drinkItem: any) {
  state.dialog = false;
  const { data: drink, error } = await useCustomFetch<any>(
    `/api/json/v1/1/search.php?s=${drinkItem.strDrink}`,
    {
      method: "GET",
      onResponseError({ response }) {
        if (response.status === 404) {
          state.feedbackMsg = {
            kind: "error",
            message: "Erro! Não encontrado.",
            activateMsgComponent: true,
          };
        }
        if (response.status === 500) {
          state.feedbackMsg = {
            kind: "error",
            message: "Erro interno de servidor.",
            activateMsgComponent: true,
          };
        }
      },
    }
  );
  if (!error.value) {
    const { strInstructions: drinkInstructions } = drink.value.drinks[0];
    state.drinkImg = drinkItem.strDrinkThumb;
    state.drinkTitle = drinkItem.strDrink;
    state.drinkDescription = drinkInstructions;
    state.dialog =
      !!state.drinkImg && !!state.drinkTitle && !!state.drinkDescription;
  }
}
</script>
