<template>
  <v-card
    :class="propsClass"
    :disabled="disabled"
    :variant="variant"
    :max-width="cardWidth"
  >
    <v-row no-gutters>
      <v-col class="px-0 pb-0" :cols="orientation === 'vertical' ? 12 : 5">
        <slot name="cover" />
      </v-col>
      <v-col :cols="orientation === 'vertical' || !$slots.cover ? 12 : 7">
        <div v-if="$slots.content" class="pt-2">
          <slot name="content" />
        </div>
        <v-card-actions v-if="$slots.actions" class="pa-0">
          <slot name="actions" />
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    kind?: "primary" | "secondary" | "tertiary";
    orientation?: string;
    disabled?: boolean;
    verticalCardWidth?: string;
    horizontalCardWidth?: string;
    propsClass?: string;
  }>(),
  {
    kind: "primary",
    orientation: "vertical",
    disabled: false,
    verticalCardWidth: "400",
    horizontalCardWidth: "652",
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

const cardWidth = computed(() => {
  if (props.orientation === "vertical") {
    return props.verticalCardWidth;
  }
  if (props.orientation === "horizontal") {
    return props.horizontalCardWidth;
  }
  return "";
});
</script>
