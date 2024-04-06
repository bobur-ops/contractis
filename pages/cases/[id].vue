<template>
  <section class="case">
    <div class="case__inner container">
      <span class="case__path">
        Главная / Исполнители / Топ 100 / Тищенко Андрей
      </span>
      <div class="case__title">
        <div class="case__title-mark" />
        <h1 class="case__title-text">Тищенко Андрей</h1>
      </div>
      <article class="case-content">
        <cases-ui-aside class="case-aside" />
        <cases-ui-main class="case-main" />
      </article>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'menu',
  middleware: ['user']
});
</script>

<style scoped lang="scss">
.case {
  @apply flex items-center w-full h-full flex-col-reverse;
  padding-top: calcHeight(35px);
  &__inner {
    @apply w-full h-full;
  }
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
    margin-bottom: calcHeight(55px);
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
  &-content {
    @apply grid;
    grid-template-columns: 27.7% 1fr;
    gap: 3.8%;
  }
}
</style>
