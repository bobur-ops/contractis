<template>
  <section class="order">
    <div class="order__inner container">
      <span class="order__path">Главная / Биржа заказов</span>
      <div class="order__title">
        <div class="order__title-mark" />
        <h1 class="order__title-text">Биржа заказов</h1>
      </div>
      <div class="order__content">
        <order-ui-filters class="order-filter" />
        <form-search class="order-search" :search-sort="orderSort" />
        <order-ui-list class="order-list" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { orderSort } from '~/components/Order/model';
definePageMeta({
  layout: 'main',
  middleware: ['filters', 'user']
});
</script>

<style scoped lang="scss">
.order {
  @apply flex justify-center;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 60px;

  &__path {
    @apply inline-block;
    color: $gray-70;
    line-height: 14px;
    font-size: 14px;
    margin-bottom: 35px;
  }

  &__title {
    @apply flex items-end;
    gap: $space-small;
    margin-bottom: $space-large-plus;
    &-text {
      font-size: 30px;
      line-height: 21px;
      font-weight: 600;
    }
    &-mark {
      @include h1-gradient-mark;
      margin-bottom: 2px;
    }
  }

  &__content {
    @apply grid;
    grid-template-areas:
      'filter search'
      'filter order-list';
    grid-template-columns: 356px 1fr;
    grid-template-rows: 45px 1fr;
    column-gap: 55px;
    row-gap: 30px;
  }
  &-filter {
    grid-area: filter;
  }
  &-search {
    grid-area: search;
  }
  &-list {
    grid-area: order-list;
  }
}
</style>
