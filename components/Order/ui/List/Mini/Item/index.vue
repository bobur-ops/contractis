<template>
  <li
    ref="orderItem"
    class="order-list-item"
    :class="{
      'order-list-item_lightning': !isOutside
    }"
  >
    <div class="order-list-item__description">
      <h2 class="order-list-item__title">
        <nuxt-link
          :to="`/order/${item.data.id}`"
          class="order-list-item__title-link"
        >
          {{ item.data.title }}
        </nuxt-link>
      </h2>
      <div class="order-list-item__stats">
        <order-ui-responses
          v-if="item.responses.count"
          :responses="item.responses.count"
          class="order-list-item__responses"
        />
        <order-ui-time class="order-list-item__time" />
      </div>
    </div>
    <div class="order-list-item__main-data">
      <span
        v-if="item.data.startPrice || item.data.endPrice"
        class="order-list-item__price"
      >
        <span v-if="item.data.startPrice">
          {{ new Intl.NumberFormat('ru-RU').format(item.data.startPrice) }}
        </span>
        <span v-if="item.data.endPrice">
          - {{ new Intl.NumberFormat('ru-RU').format(item.data.endPrice) }}
        </span>
        <span class="order-list-item__price-format"> ₽</span>
      </span>
      <shared-deadline
        :max-period="item.data.maxPeriod"
        :min-period="item.data.minPeriod"
        :format-period="item.data.periodType"
        class="order-list-item__period"
      />
    </div>
  </li>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

defineProps({
  formatPeriod: { type: String, default: 'h' },
  item: {
    type: Object,
    required: true
  }
});
const orderItem = ref();
const gradientX = ref();
const gradientY = ref();

const { elementX, elementY, isOutside } = useMouseInElement(orderItem);
watch([elementX, elementY], () => {
  if (!isOutside.value) {
    gradientX.value = elementX.value + 'px';
    gradientY.value = elementY.value + 'px';
  }
});
</script>

<style scoped lang="scss">
@import 'style';
.order-list-item {
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
