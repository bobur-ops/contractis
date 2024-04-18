<template>
  <button class="gradient-button" :class="`size-${size}`">
    <span class="gradient-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup>
defineProps({
  width: { type: String, required: false },
  height: { type: String, required: false },
  fontSize: { type: String, required: false },
  fontWeight: { type: String, required: false },
  size: { type: String, default: 'medium' }
});
</script>

<style scoped lang="scss">
.gradient-button {
  @apply flex justify-center items-center;
  color: $white;
  background: url('/assets/images/buttons/gradient-button.png');
  /* background-size: v-bind(width) v-bind(height); */
  /* width: v-bind(width);
  height: v-bind(height); */
  background-blend-mode: color;
  &:hover {
    transition: 0.2s;
    filter: drop-shadow(0 10px 30px rgba(54, 51, 208, 0.9));
  }
  &__text {
    @apply flex items-center;
    gap: pxToRem(10);
    font-family: $base-font;
    /* font-size: v-bind(fontSize);
    font-weight: v-bind(fontWeight); */
    font-size: pxToRem(18);
    @media screen and ($media-md-query) {
      font-size: pxToRem(13);
    }
  }
  &.size-medium {
    width: pxToRem(200);
    height: pxToRem(48);
    background-size: pxToRem(200) pxToRem(48);
    @media screen and ($media-md-query) {
      width: pxToRem(122);
      height: pxToRem(37);
      background-size: pxToRem(122) pxToRem(37);
    }
  }
}
</style>
