import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import CoreSelect from "../components/CoreSelect.vue";
import { describe, expect, it, vi } from "vitest";

describe("CoreSelect", () => {
  const vuetify = createVuetify({ components, directives });
  const wrapper = shallowMount(CoreSelect, {
    props: {
      label: "",
      categories: [
        { itemTitle: "category1", itemValue: "category1" },
        { itemTitle: "category2", itemValue: "category2" },
      ],
      itemTitle: "{ itemTitle: 'category1', itemValue: 'category1' }",
      itemValue: "category1",
      modelValue: "initialText",
      "onUpdate:modelValue": (e: string) => wrapper.setProps({ modelValue: e }),
    },
    emits: ["update:modelValue", "clearSelected", "displayBySelected"],
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
    const spyClear = vi.spyOn(wrapper.vm, "handleClearSelected");
    wrapper.findComponent("[data-test='select']").trigger("click:clear");
    //@ts-ignore
    wrapper.vm.handleClearSelected();
    expect(spyClear).toHaveBeenCalledOnce();
    expect(wrapper.emitted()).toHaveProperty("clearSelected");
  });

  it("should update modelValue", async () => {
    const spySelected = vi.spyOn(wrapper.vm, "handleSelected");
    await wrapper.findComponent("[data-test='select']").setValue("category2");
    //@ts-ignore
    wrapper.vm.handleSelected("category1");
    expect(spySelected).toHaveBeenCalledOnce();
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()).toHaveProperty("displayBySelected");
  });
});
