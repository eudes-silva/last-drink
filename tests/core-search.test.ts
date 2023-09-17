import { mount, VueWrapper } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import CoreSearch from "../components/CoreSearch.vue";
import { describe, expect, it } from "vitest";

describe("CoreSearch", () => {
  const vuetify = createVuetify({ components, directives });
  const wrapper: VueWrapper = mount(CoreSearch, {
    props: {
      label: "",
      modelValue: "initialText",
      "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
    },
    emits: ["update:modelValue"],
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

  it("should update modelValue", async () => {
    await wrapper.findComponent("[data-test='search']").setValue("test");
    expect(wrapper.props("modelValue")).toBe("test");
  });
});
