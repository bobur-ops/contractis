<template>
  <article class="order-card-aside-price">
    <div class="order-card-aside-price__inner">
      <order-ui-time class="order-card-aside-price__time" />
      <p class="order-card-aside-price__range">
        Стоимость работы оценивают от
        <span
          class="order-card-aside-price__range order-card-aside-price__range_bold"
        >
          {{ new Intl.NumberFormat('ru-RU').format(0) }}
        </span>
        до
        <span
          class="order-card-aside-price__range order-card-aside-price__range_bold"
        >
          {{ new Intl.NumberFormat('ru-RU').format(0) }} ₽
        </span>
      </p>
      <p class="order-card-aside-price__time">
        Сроки от
        <span
          class="order-card-aside-price__time order-card-aside-price__time_bold"
        >
          0
        </span>
        до
        <span
          class="order-card-aside-price__time order-card-aside-price__time_bold"
        >
          0 дней
        </span>
      </p>
      <order-ui-responses :responses="0" />
    </div>
  </article>
</template>

<script setup></script>

<style scoped lang="scss">
.order-card-aside-price {
  @apply w-full h-fit flex items-center justify-center;
  background: none;
  border: 1px solid $white;
  border-radius: 12px;
  padding: 20px 23px;
  &__inner {
    @apply w-full h-fit flex flex-col;
  }
  &__time {
    margin-bottom: $space-small-plus;
  }
  &__range {
    font-size: 14px;
    font-weight: 400;
    max-width: 227px;
    line-height: 120%;
    margin-bottom: 32px;
    &_bold {
      font-weight: 700;
    }
  }
  &__time {
    font-size: 14px;
    font-weight: 400;
    max-width: 227px;
    line-height: 120%;
    &_bold {
      font-weight: 700;
    }
  }
}
</style>
