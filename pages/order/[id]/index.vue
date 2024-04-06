<template>
  <section class="order-card">
    <div v-if="order" class="order-card__inner container">
      <span class="order-card__path">
        Главная / Биржа заказов / {{ order.data.title }}
      </span>
      <article class="order-card__content">
        <order-card-ui-main
          :id="order.data.id"
          :title="order.data.title"
          :description="order.data?.description"
          :team="order.data.team"
          :start-price="order.data.startPrice"
          :end-price="order.data?.endPrice"
          :min-period="order.data.minPeriod"
          :max-period="order.data?.maxPeriod"
          :category="order.data?.category"
          :specialization="order.data?.specialization"
          :files="order.data?.files"
          :keywords="order.data?.keywords"
          :technologies="order.data?.technologies"
          :responses="order.responses"
        />
        <order-card-ui-aside :data="order.data.clientData" />
      </article>
    </div>
  </section>
</template>

<script setup>
import { Orders } from '~/utils/api';

definePageMeta({
  layout: 'main',
  middleware: 'user'
});
const route = useRoute();
const { data: order } = await Orders.getOneOrder(route.params.id);
</script>

<style scoped lang="scss">
.order-card {
  @apply flex justify-center w-full;
  padding-top: 30px;
  padding-bottom: 60px;

  &__path {
    @apply inline-block;
    color: $gray-70;
    line-height: 14px;
    font-size: 14px;
    margin-bottom: 35px;
  }

  &__content {
    @apply flex;
    gap: 36px;
  }
}
</style>
