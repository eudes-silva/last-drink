import { shallowMount } from "@vue/test-utils";
import CoreSnackbar from "../components/CoreSnackbar.vue";
import { describe, expect, it } from "vitest";

describe("CoreSnackbar", () => {
  const wrapper = shallowMount(CoreSnackbar, {
    props: {
      snackbarActive: true,
      text: "Snackbar msg",
    },
  });
  it("should be mounted", () => {
    expect(wrapper).toBeTruthy();
  });
});
