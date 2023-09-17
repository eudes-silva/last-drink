import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import CoreCard from "../components/CoreCard.vue";
import { describe, expect, it } from "vitest";

describe("CoreCard", () => {
  const vuetify = createVuetify({ components, directives });
  const wrapper = shallowMount(CoreCard, {
    props: {
      orientation: "",
      verticalCardWidth: "100px",
      horizontalCardWidth: "200px",
    },
    slots: {
      cover: "cover slot",
      content: "content slot",
      actions: "actions slot",
    },
    global: {
      plugins: [vuetify],
    },
  });
  it("should be mounted", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should have a cover slot", () => {
    expect(wrapper.text()).toContain("cover slot");
  });
  it("should have a content slot", () => {
    expect(wrapper.text()).toContain("content slot");
  });
  it("should have a actions slot", () => {
    expect(wrapper.text()).toContain("actions slot");
  });
  it("should receive a prop orientation: vertical and set card width", async () => {
    await wrapper.setProps({ orientation: "vertical" });
    await wrapper.setProps({ verticalCardWidth: "200px" });
    expect(wrapper.props("orientation")).toBe("vertical");
    expect(wrapper.props("verticalCardWidth")).toBe("200px");
  });
  it("should receive a prop orientation: horizontal and set card width", async () => {
    await wrapper.setProps({ orientation: "horizontal" });
    await wrapper.setProps({ horizontalCardWidth: "400px" });
    expect(wrapper.props("orientation")).toBe("horizontal");
    expect(wrapper.props("horizontalCardWidth")).toBe("400px");
  });
});
