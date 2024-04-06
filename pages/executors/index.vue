<template>
  <section class="executors">
    <div class="executors__inner container">
      <span class="executors__path">Главная / Исполнители</span>
      <div class="executors__title">
        <div class="executors__title-mark" />
        <h1 class="executors__title-text">Исполнители</h1>
      </div>
      <div class="executors__content">
        <executors-ui-filters class="executors-filter" />
        <form-search class="executors-search" :search-sort="executorsSort" />
        <executors-ui-list class="executors-list" :data="executorsData" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { executorsSort, executorsData } from '~/components/Executors/model';
definePageMeta({
  layout: 'main',
  middleware: ['filters', 'user']
});
</script>

<style scoped lang="scss">
.executors {
  @apply flex justify-center w-full;
  padding-top: 30px;
  padding-bottom: 60px;

  &__path {
    @apply inline-block;
    color: $gray-70;
    font-size: 14px;
    line-height: 14px;
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
      &_advantages {
        margin-bottom: 54px;
      }
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
      'filter executors-list';
    grid-template-columns: 356px 1fr;
    grid-template-rows: 45px 1fr;
    column-gap: 55px;
    row-gap: 30px;
  }
  &-topics {
    margin-bottom: 60px;
  }
  &-filter {
    grid-area: filter;
  }
  &-search {
    grid-area: search;
  }
  &-list {
    grid-area: executors-list;
  }
}
</style>
