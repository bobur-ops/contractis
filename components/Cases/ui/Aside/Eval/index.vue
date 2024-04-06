<template>
  <article class="case-aside-eval">
    <shared-category
      :category="category"
      :specialization="specialization"
      class="case-aside-eval__category"
    />
    <p class="case-aside-eval__budget">
      <span class="case-aside-eval__gradient-title"> Бюджет:&nbsp;&nbsp; </span>
      {{ new Intl.NumberFormat('ru-RU').format(price) }}
      <span class="case-aside-eval__budget-format"> ₽</span>
    </p>
    <p class="case-aside-eval__time">
      <span class="case-aside-eval__gradient-title"> Срок:&nbsp;&nbsp; </span>
      <shared-deadline :min-period="period" :format-period="formatPeriod" />
    </p>
  </article>
</template>

<script setup>
defineProps({
  price: { type: Number, default: null },
  formatPeriod: { type: String, default: '' },
  period: { type: Number, default: null },
  category: { type: Object, default: () => {} },
  specialization: { type: Object, default: () => {} }
});
</script>

<style scoped lang="scss">
.case-aside-eval {
  @apply w-full;
  padding: 25px 30px;
  &__category {
    margin-bottom: $space-small-plus;
  }
  &__gradient-title {
    @include gradient-text($base-font, 18px, 500);
  }
  &__budget {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: $space-x-small;
  }
  &__time {
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
