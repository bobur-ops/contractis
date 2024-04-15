<template>
  <button class="button-arrow">
    <svgo-arrow-hover class="button-arrow__item" />
  </button>
</template>

<script setup>
defineProps({
  height: { type: String, default: '33px' },
  width: { type: String, default: '40px' },
  arrowWidth: { type: String, default: '14px' }
});
</script>

<style scoped lang="scss">
.button-arrow {
  @apply flex justify-center items-center;
  /* width: v-bind(width);
  height: v-bind(height); */
  background: inherit;
  border-left: 1px solid $white;
  opacity: 0.5;
  transition: 0.2s;
  &:hover {
    opacity: 1;
  }
  &__item {
    width: v-bind(arrowWidth);
  }
}
</style>
