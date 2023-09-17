import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import DrinksTable from "../components/DrinksTable.vue";
import { useFavoritesStore } from "../stores/FavoritesStore";
import { describe, expect, it, vi } from "vitest";

describe("DrinksTable", () => {
  const vuetify = createVuetify({ components, directives });
  const wrapper = shallowMount(DrinksTable, {
    props: {},
    emits: ["getDrinkDetailsByName"],
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            favorites: {
              favorites: [],
            },
          },
          createSpy: vi.fn(),
        }),
        vuetify,
      ],
    },
  });

  const store = useFavoritesStore();

  it("should be mounted", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should emit a click event", async () => {
    const spyClear = vi.spyOn(wrapper.vm, "handleClickEmit");
    wrapper.findComponent("v-table").trigger("click");
    //@ts-ignore
    wrapper.vm.handleClickEmit({
      idDrink: "1",
      strDrink: "drinkName",
      drinkCategory: "drinkCategory",
      strDrinkThumb: "drinkImg",
    });
    expect(spyClear).toHaveBeenCalledOnce();
    expect(wrapper.emitted()).toHaveProperty("getDrinkDetailsByName");
  });

  it("should hover a row and handle a mouseover event", async () => {
    const spyClear = vi.spyOn(wrapper.vm, "handleHoverRow");
    wrapper.findComponent("v-table").trigger("mouseover");
    //@ts-ignore
    wrapper.vm.handleHoverRow({
      idDrink: "1",
      strDrink: "drinkName",
      drinkCategory: "drinkCategory",
      strDrinkThumb: "drinkImg",
    });
    expect(spyClear).toHaveBeenCalledOnce();
  });

  it("should show icons when mouse is over a row", async () => {
    const spyClear = vi.spyOn(wrapper.vm, "showRowIcons");
    wrapper.findComponent("v-table").trigger("mouseover");
    const itemRow = {
      idDrink: "1",
      strDrink: "drinkName",
      drinkCategory: "drinkCategory",
      strDrinkThumb: "drinkImg",
    };
    //@ts-ignore
    wrapper.vm.showRowIcons(itemRow, "strDrink");
    expect(spyClear).toReturnWith(true);
  });
});
