<template>
  <v-select
    clearable
    :density="density"
    @click:clear="handleClearSelected"
    :rounded="rounded"
    @update:model-value="handleSelected"
    :class="propClass"
    :base-color="baseColor"
    :color="color"
    :label="label"
    :items="categories"
    :item-title="itemTitle"
    :item-value="itemValue"
    :variant="variant"
    hide-details
  >
  </v-select>
</template>
<script setup lang="ts">
import { computed } from "vue";
const emit = defineEmits(["displayBySelected", "clearSelected"]);

const props = withDefaults(
  defineProps<{
    color?: string;
    label?: string;
    categories: Array<object>;
    disabled?: boolean;
    kind?: "primary" | "secondary" | "tertiary";
    density?: "compact" | "comfortable" | "default";
    rounded?: string;
    propClass?: string;
    baseColor?: string;
    itemTitle: string;
    itemValue: string;
  }>(),
  {
    categories: () => [],
    disabled: false,
    kind: "primary",
    density: "compact",
  }
);

const variant = computed(
  () =>
    ((
      {
        primary: "solo",
        secondary: "outlined",
        tertiary: "plain",
      } as const
    )[props.kind])
);

function handleSelected(selected: string) {
  if (selected) {
    emit("displayBySelected", selected);
  }
}

function handleClearSelected() {
  emit("clearSelected");
}
</script>
