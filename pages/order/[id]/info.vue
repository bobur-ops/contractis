<template>
  <section class="order-card-info">
    <div class="order-card-info__inner container">
      <div class="order-card-info__title">
        <div class="order-card-info__title-mark" />
        <h1 class="order-card-info__title-text">Ваши заказы</h1>
      </div>
      <h2 v-if="orderData?.data" class="order-card-info__order-name">
        {{ orderData.data.title }}
      </h2>
      <shared-menu-dynamic
        :menu-list="orderInfoMenu"
        @select-item="selectItem"
      />
      <transition name="fade">
        <component :is="currentComponent" />
      </transition>
    </div>
  </section>
</template>

<script setup>
import { Orders } from '~/utils/api';
import { orderInfoMenu } from '~/components/Dashboard/model';

definePageMeta({
  layout: 'menu',
  middleware: ['filters', 'auth']
});

const { path } = useRoute();
const currentOrderId = computed(() => path.split('/')[2]);
const selectedItem = ref(0);
const selectItem = (index) => (selectedItem.value = index);

const components = {
  controlOrder: resolveComponent('OrderUiSlideControl'),
  responses: resolveComponent('OrderUiSlideResponses'),
  recommendations: resolveComponent('OrderUiSlideRecommendations')
};

const currentComponent = computed(() => {
  switch (selectedItem.value) {
    case 0:
      return components.controlOrder;
    case 1:
      return components.responses;
    case 2:
      return components.recommendations;
  }
});

const { data: orderData } = await Orders.getOneOrder(currentOrderId.value);
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}
.fade-leave-to {
  position: fixed;
  transform: translateY(50px);
  opacity: 0;
}

.order-card-info {
  @apply flex justify-center w-full;
  padding-top: 35px;
  padding-bottom: 60px;
  &__inner {
    @apply w-full h-full;
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
  &__order-name {
    font-size: 24px;
    line-height: 17px;
    font-weight: 500;
    margin-bottom: $space-large-plus;
  }
}
</style>
