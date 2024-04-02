<template>
  <div class="start">
    <h2 class="start__title">CONTRACTIS</h2>
    <div class="start__planet" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'empty'
});
</script>

<style scoped lang="scss">
.start {
  @apply flex items-center justify-between mx-auto;
  height: 100vh;
  max-width: 1272px;
  &__title {
    font-family:
      Meedori Sans,
      sans-serif;
    font-size: 96px;
    font-weight: 400;
    letter-spacing: -4.8px;
    color: $white;
  }
  &__planet {
    @apply flex justify-center;
    @include earth-gif(488px, 70.63px, 76.25px);
    width: 375px;
    height: 372.5px;
    flex-shrink: 0;
    mix-blend-mode: normal;
  }
}
</style>
