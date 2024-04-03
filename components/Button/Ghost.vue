<template>
  <button class="ghost-button">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  width: { type: String, required: true },
  height: { type: String, required: true },
  fontSize: { type: String, required: true },
  fontWeight: { type: String, required: true }
});
</script>

<style scoped lang="scss">
.ghost-button {
  @apply flex justify-center items-center;
  /* border-radius: $border-radius-m; */
  border-radius: calcWidth(15);
  border: 1px solid $white;
  color: $white;
  white-space: nowrap;
  padding: calcWidth(13) calcWidth(22);
  height: calcWidth(48);
  font-size: calcWidth(13);
  @media screen and ($media-lg-query) {
    padding: calculateVw768(13) calculateVw768(22);
    font-size: calculateVw768(13);
    height: calculateVw768(48);
    border-radius: calculateVw768(15);
  }
}
</style>
