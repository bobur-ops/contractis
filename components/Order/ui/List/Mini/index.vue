<template>
  <div v-if="orders.mini.data.length" class="order-list">
    <ul class="order-list__inner">
      <order-ui-list-mini-item
        v-for="(item, id) in orders.mini.data.slice(0, 3)"
        :key="id"
        :item="item"
      />
    </ul>
  </div>
</template>

<script setup>
import { Orders } from '~/utils/api';

const { data: orders } = useOrdersList();

const getOrders = async () => {
  if (orders.value?.mini.data.length) return;
  const { data: orderList } = await Orders.getAllOrders();
  if (orderList.value) {
    orders.value.mini.data = orderList.value.data;
  }
};
await getOrders();
onBeforeMount(async () => await getOrders());
</script>

<style scoped lang="scss">
.order-list {
  @apply flex items-center flex-col w-full;
  &__inner {
    @apply flex flex-col w-full;
    row-gap: 25px;
  }
}
</style>
