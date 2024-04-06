<template>
  <article
    ref="dashboardItem"
    class="dashboard-feedback"
    :class="{
      'dashboard-feedback_lightning': !isOutside
    }"
  >
    <h3 class="dashboard-feedback__title">Обратная связь</h3>
    <p class="dashboard-feedback__text">
      Если у вас возникли проблемы с Сервисом наша группа технической поддержки
      поможет вам в рабочее время в течение
      <span style="color: white">30 минут</span>
    </p>
    <div class="dashboard-feedback__interaction">
      <shared-arrow-text-animate font-size="14px" font-weight="500">
        Обратиться
      </shared-arrow-text-animate>
      <shared-arrow-text-animate font-size="14px" font-weight="500">
        FAQ
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
.dashboard-feedback {
  @apply flex flex-col;
  grid-area: feedback;
  padding: 18px 17px 16px 25px;
  background: $bg-black-block;
  border: 1px solid $border-block;
  border-radius: $border-radius-m;
  &__title {
    font-size: 20px;
    line-height: 14px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  &__text {
    font-weight: 300;
    font-size: 12px;
    color: $gray-50;
    line-height: 120%;
    margin-bottom: 15px;
  }
  &__interaction {
    @apply flex flex-col;
    gap: calcHeight(8px);
  }
  &_lightning {
    background: radial-gradient(
        circle at v-bind(gradientX) v-bind(gradientY),
        $radial-glow-start 0,
        $radial-glow-end 420px
      ),
      $bg-black-block;
  }
}
</style>
