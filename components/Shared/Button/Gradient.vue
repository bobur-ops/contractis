<template>
  <button class="gradient-button relative">
    <img class="bg-img" src="/assets/images/buttons/gradient-button.png" />
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
  fontWeight: { type: String, required: true }
});
</script>

<style scoped lang="scss">
.gradient-button {
  @apply flex justify-center items-center;
  color: $white;
  /* background: url('/assets/images/buttons/gradient-button.png') no-repeat; */
  background-size: v-bind(width) v-bind(height);
  /* width: v-bind(width);
  height: v-bind(height); */
  width: calcWidth(200);
  height: calcWidth(48);
  background-blend-mode: color;
  @media screen and ($media-lg-query) {
    width: calculateVw768(200);
    height: calculateVw768(48);
  }
  .bg-img {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  &:hover {
    transition: 0.2s;
    filter: drop-shadow(0 10px 30px rgba(54, 51, 208, 0.9));
  }
  &__text {
    @apply flex items-center;
    gap: calcWidth(10);
    position: relative;
    z-index: 2;
    font-family: $base-font;
    /* font-size: v-bind(fontSize); */
    font-size: calcWidth(18);
    color: rgba($color: #fff, $alpha: 0.9);
    font-weight: v-bind(fontWeight);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(18);
      gap: calculateVw768(10);
    }
  }
}
</style>
