<template>
  <v-text-field
    data-test="search"
    :disabled="disabled"
    :class="propClass"
    :rounded="rounded"
    :base-color="baseColor"
    :density="density"
    :variant="variant"
    :label="label"
    single-line
    hide-details
    append-inner-icon="mdi-magnify"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
  </v-text-field>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    baseColor?: string;
    label: string;
    disabled?: boolean;
    kind?: "primary" | "secondary" | "tertiary";
    density?: "compact" | "comfortable" | "default";
    rounded?: string;
    propClass?: string;
    modelValue?: string;
  }>(),
  {
    disabled: false,
    kind: "secondary",
    density: "compact",
  }
);

defineEmits(["update:modelValue"]);

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
</script>
