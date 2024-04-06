<template>
  <article
    ref="dashboardItem"
    class="dashboard-create-order"
    :class="{
      'dashboard-create-order_lightning': !isOutside
    }"
  >
    <img
      src="/assets/images/astronauts/astronaut-dashboard.png"
      alt="astronaut"
      class="dashboard-create-order__astronaut"
    />
    <div class="dashboard-create-order__content">
      <h3 class="dashboard-create-order__title">Создание заказа</h3>
      <div class="dashboard-create-order__text-block">
        <p class="dashboard-create-order__text">
          Создайте заказ и найдите опытных специалистов для выполнения ваших
          задач
        </p>
        <p class="dashboard-create-order__text">
          CONTRACTIS — ваш идеальный способ найти экспертов для реализации ваших
          идей
        </p>
      </div>
      <shared-arrow-text-animate
        font-size="14px"
        font-weight="500"
        class="dashboard-create-order__link"
        @click="toCreateOrder"
      >
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
const router = useRouter();
const toCreateOrder = () => {
  router.push('order/create');
};
</script>

<style scoped lang="scss">
.dashboard-create-order {
  @apply relative;
  grid-area: loyalty;
  margin-left: 150px;
  background:
    url('assets/images/dashboard/plus.png') bottom right no-repeat,
    $bg-black-block;
  border: 1px solid $border-block;
  border-radius: $border-radius-m;
  &__astronaut {
    @apply absolute bottom-0;
    left: -150px;
  }
  &__content {
    @apply overflow-hidden relative h-full;
    padding: 30px 35px;
    border-radius: $border-radius-m;
  }
  &__title {
    font-size: 20px;
    line-height: 14px;
    font-weight: 600;
    margin-bottom: 25px;
  }
  &__text {
    color: $gray-50;
    max-width: 500px;
    margin-bottom: 14px;
  }
  &__text-block {
    font-size: 14px;
    line-height: 14px;
  }
  &__plus-img {
    @apply absolute bottom-0 right-0;
  }
  &_lightning {
    background:
      radial-gradient(
        circle at v-bind(gradientX) v-bind(gradientY),
        $radial-glow-start 0,
        $radial-glow-end 420px
      ),
      url('assets/images/dashboard/plus.png') bottom right no-repeat,
      $bg-black-block;
  }
  &__link {
    @apply absolute;
    bottom: 30px;
    left: 35px;
  }
}
</style>
