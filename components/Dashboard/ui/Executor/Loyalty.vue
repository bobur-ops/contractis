<template>
  <article
    ref="dashboardItem"
    class="dashboard-loyalty"
    :class="{
      'dashboard-loyalty_lightning': !isOutside
    }"
  >
    <img
      src="/assets/images/astronauts/astronaut-dashboard.png"
      alt="astronaut"
      class="dashboard-loyalty__astronaut"
    />
    <div class="dashboard-loyalty__content">
      <h3 class="dashboard-loyalty__title">Программа лояльности</h3>
      <div class="dashboard-loyalty__citation-block">
        <p class="dashboard-loyalty__author">Антоний Слонимский (1923 г.)</p>
        <p class="dashboard-loyalty__citation">
          “Все ожидают выигрыша в лотерее, даже те, кто не покупает лотерейных
          билетов.”
        </p>
      </div>
      <div class="dashboard-loyalty__citation-block">
        <p class="dashboard-loyalty__author">CONTRACTIS (2024 г.)</p>
        <p class="dashboard-loyalty__citation">
          “Так пусть же этот лотерейный билет будет у всех!”
        </p>
      </div>
      <shared-arrow-text-animate font-size="14px" font-weight="500">
        Перейти
      </shared-arrow-text-animate>
    </div>
  </article>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

const dashboardItem = ref();
const gradientX = ref();
const gradientY = ref();

const { elementX, elementY, isOutside } = useMouseInElement(dashboardItem);
watch([elementX, elementY], () => {
  if (!isOutside.value) {
    gradientX.value = elementX.value + 'px';
    gradientY.value = elementY.value + 'px';
  }
});
</script>

<style scoped lang="scss">
.dashboard-loyalty {
  @apply relative flex;
  grid-area: loyalty;
  margin-left: 150px;
  border: 1px solid $border-block;
  border-radius: $border-radius-m;
  background:
    url('assets/images/subscription/advantages/fortuna.png') right bottom
      no-repeat,
    $bg-black-block;
  background-size: 200px;
  &__astronaut {
    @apply absolute bottom-0;
    left: -150px;
  }
  &__content {
    @apply overflow-hidden relative flex flex-col w-full;
    gap: 28px;
    padding: 30px 35px;
    border-radius: $border-radius-m;
    &:last-child {
      @apply self-end;
    }
  }
  &__title {
    font-size: 20px;
    line-height: 14px;
    font-weight: 600;
  }
  &__citation {
    color: $gray-50;
    max-width: 305px;
  }
  &__citation-block {
    font-size: 14px;
    line-height: 14px;
  }
  &__author {
    color: $gray-70;
    margin-bottom: 12px;
  }
  &_lightning {
    background:
      radial-gradient(
        circle at v-bind(gradientX) v-bind(gradientY),
        $radial-glow-start 0,
        $radial-glow-end 420px
      ),
      url('assets/images/subscription/advantages/fortuna.png') right bottom
        no-repeat,
      $bg-black-block;
    background-size: auto, 200px, auto;
  }
}
</style>
