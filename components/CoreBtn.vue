<template>
  <v-btn
    @click="handleClickEvent"
    :class="propClass"
    :color="color"
    :variant="variant"
    :size="size"
    :rounded="rounded"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :value="value"
  >
    {{ label }}
  </v-btn>
</template>
<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits(["clickEvent"]);
const props = withDefaults(
  defineProps<{
    kind?: "primary" | "secondary" | "tertiary";
    label: string;
    color?: string;
    rounded?: string;
    size?: string;
    propClass?: string;
    propIcon?: string;
    prependIcon?: string;
    appendIcon?: string;
    value?: string;
  }>(),
  {
    kind: "primary",
  }
);
const variant = computed(
  () =>
    ((
      {
        primary: "elevated",
        secondary: "outlined",
        tertiary: "flat",
      } as const
    )[props.kind])
);

function handleClickEvent() {
  emit("clickEvent");
}
</script>
