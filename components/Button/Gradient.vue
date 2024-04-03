<template>
  <button class="gradient-button">
    <span class="gradient-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup>
defineProps({
  width: { type: String, required: true },
  height: { type: String, required: true },
  fontSize: { type: String, required: true },
  fontWeight: { type: String, required: true },
  className: { type: String, default: '' }
});
</script>

<style scoped lang="scss">
.gradient-button {
  @apply flex justify-center items-center;
  color: $white;
  background: url('/assets/images/buttons/gradient-button.svg');
  background-size: contain;
  padding: calcWidth(15) calcWidth(48);
  /* height: calcHeight(48px); */
  height: calcWidth(48);
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-blend-mode: color;
  @media screen and ($media-lg-query) {
    padding: calculateVw768(15) calculateVw768(40);
    height: calculateVw768(48);
  }
  //&:hover {
  //  mask-image: url("/assets/images/buttons/gradient-button.svg");
  //  background: rgba(0, 0, 0, 0.28);
  //}
  &__text {
    @apply flex items-center;
    gap: 10px;
    font-family: $base-font;
    white-space: nowrap;
    font-weight: 500;
    font-size: calcWidth(18);
    font-weight: 500;
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(18);
    }
  }
}
</style>
