<template>
  <div class="text-center">
    <v-dialog v-model="state.dialog" width="auto">
      <div v-if="$slots.content">
        <slot name="content" />
      </div>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    dialog: boolean;
  }>(),
  {
    dialog: false,
  }
);
const state = reactive({
  dialog: props.dialog,
});
</script>
