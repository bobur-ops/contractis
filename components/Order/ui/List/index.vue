<template>
  <div ref="orderListScroll" class="order-list">
    <ul class="order-list__inner">
      <order-ui-list-item
        v-for="order in orders.data"
        :id="order.data.id"
        :key="order.data.id"
        :title="order.data.title"
        :description="order.data?.description"
        :team="order.data?.team"
        :start-price="order.data.startPrice"
        :end-price="order?.data.endPrice"
        :min-period="order.data.minPeriod"
        :max-period="order?.data.maxPeriod"
        :category="order?.data.category"
        :specialization="order?.data.specialization"
        :responses="order.responses"
        :files="order.data?.files"
        :keywords="order.data?.keywords"
        :technologies="order.data?.technologies"
        :client-data="order.data?.clientData"
        :performer-data="order.data?.performerData"
        :moder-status="order.data?.moderStatus"
        :status="order.data.status"
        :path-order-data-patch="order.data.pathOrderDataPatch"
      />
    </ul>
  </div>
</template>

<script setup>
import { Orders } from '~/utils/api';
const props = defineProps({
  path: { type: String, default: 'orders' },
  storeName: { type: String, default: 'main' },
  refreshOnMount: { type: Boolean, default: false }
});
const { data: ordersInfo, refresh } = useOrdersList();
const orders = reactive({
  data: ordersInfo.value[props.storeName].data,
  page: ordersInfo.value[props.storeName].pageInfo,
  query: ordersInfo.value[props.storeName].query
});
const waitRequest = ref(0);
const pending = ref(false);
const handleDataChange = async () => {
  pending.value = true;
  waitRequest.value++;
  if (
    orders.data.length &&
    (orders.page.lastPage === orders.query.page || waitRequest.value < 2)
  ) {
    return;
  }
  ordersInfo.value[props.storeName].query.page++;
  await Orders.getPaginationData(props.path, ordersInfo, props.storeName);
  pending.value = false;
};
await handleDataChange();
const orderListScroll = ref();
const useScroll = async () => {
  if (
    (orderListScroll.value.scrollHeight ===
      orderListScroll.value.clientHeight &&
      window.pageYOffset + window.innerHeight + 20 >=
        document.documentElement.offsetHeight) ||
    (orderListScroll.value.scrollHeight > orderListScroll.value.clientHeight &&
      orderListScroll.value.scrollTop + orderListScroll.value.offsetHeight >=
        orderListScroll.value.scrollHeight)
  ) {
    await handleDataChange();
  }
};
onMounted(async () => {
  if (props.refreshOnMount) {
    refresh(props.storeName);
  }
  orderListScroll.value.addEventListener('mousewheel', useScroll);
});
watch(
  () => pending.value,
  () => {
    if (!pending.value) {
      orderListScroll.value.addEventListener('mousewheel', useScroll);
    } else orderListScroll.value.removeEventListener('mousewheel', useScroll);
  }
);
</script>

<style scoped lang="scss">
.order-list {
  @apply flex items-center flex-col w-full;
  &__inner {
    @apply flex flex-col w-full;
    row-gap: 30px;
  }
}
</style>
