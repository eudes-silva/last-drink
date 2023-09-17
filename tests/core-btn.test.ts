import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import CoreBtn from "../components/CoreBtn.vue";
import { describe, expect, it } from "vitest";

describe("CoreBtn", () => {
  const vuetify = createVuetify({ components, directives });
  const wrapper = shallowMount(CoreBtn, {
    props: {
      label: "",
    },
    global: {
      plugins: [vuetify],
    },
  });
  it("should be mounted", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should contain a label prop", async () => {
    await wrapper.setProps({ label: "labelText" });
    expect(wrapper.props("label")).toBe("labelText");
  });

  it("should emit a click event", async () => {
    wrapper.find("v-btn").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("clickEvent");
  });
});
