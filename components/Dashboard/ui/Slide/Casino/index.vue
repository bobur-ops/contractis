<template>
  <section class="dashboard-casino">
    <dashboard-ui-slide-casino-ref-link class="dashboard-casino-ref-link" />
    <dashboard-ui-slide-casino-roulette class="dashboard-casino-bonus" />
    <dashboard-ui-slide-casino-advantages class="dashboard-casino-advantages" />
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
.dashboard-casino {
  @apply grid w-full h-fit;
  max-width: 1420px;
  grid-template-areas:
    'ref-link advantages'
    'casino advantages';
  grid-template-columns: 51.4% 42.7%;
  gap: calcHeight(70px) 70px;
  grid-template-rows: 212px 470px;
  &-ref-link {
    grid-area: ref-link;
  }
  &-bonus {
    grid-area: casino;
  }
  &-advantages {
    grid-area: advantages;
  }
}
</style>
