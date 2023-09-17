import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import CoreModal from "../components/CoreModal.vue";
import { describe, expect, it } from "vitest";

describe("CoreModal", () => {
  const vuetify = createVuetify({ components, directives });
  const wrapper = shallowMount(CoreModal, {
    props: {
      dialog: false,
    },
    slots: {
      content: "content slot",
    },
    global: {
      plugins: [vuetify],
    },
  });
  it("should be mounted", () => {
    expect(wrapper).toBeTruthy();
  });
  it("should have a content slot", () => {
    expect(wrapper.text()).toContain("content slot");
  });
  it("should set true to the dialog prop to activate the modal", async () => {
    await wrapper.setProps({ dialog: true });
    expect(wrapper.props("dialog")).toBe(true);
  });
});
