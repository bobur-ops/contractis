<template>
  <div ref="performerListScroll" class="executors-list">
    <ul class="executors-list__inner">
      <executors-ui-list-item
        v-for="performer in performers.data"
        :id="performer.data.id"
        :key="performer.data.id"
        :avatar-path="performer.data?.avatarPath"
        :city="performer.data?.city"
        :country="performer.data?.country"
        :description="performer.data.profile?.description"
        :experience="performer.data.profile?.experience"
        :first-name="performer.data?.firstName"
        :last-name="performer.data?.lastName"
        :hourly-rate="performer.data?.hourlyRate"
        :main-category="performer.data.profile?.mainCategory"
        :rating="performer.data.profile?.rating"
        :site="performer.data.profile?.site"
        :team="performer.data.profile?.team"
        :team-count="performer.data.profile?.teamCount"
        :technologies="performer.data.profile?.technologies"
        :portfolio-count="performer.data.profile?.portfolioCount"
        :type="type"
      />
    </ul>
  </div>
</template>

<script setup>
import { Executors } from '~/utils/api';
const props = defineProps({
  type: { type: String, default: 'default' },
  storeName: { type: String, default: 'main' },
  refreshOnMount: { type: Boolean, default: false },
  orderId: { type: Number, default: null },
  path: { type: String, default: 'performers' }
});
const { data: performersInfo, refresh } = usePerformersList();
const performers = reactive({
  data: performersInfo.value[props.storeName].data,
  page: performersInfo.value[props.storeName].pageInfo,
  query: performersInfo.value[props.storeName].query
});
const waitRequest = ref(0);
const pending = ref(false);
const handleDataChange = async () => {
  pending.value = true;
  waitRequest.value++;
  if (
    performers.data.length &&
    (performers.page.lastPage === performers.query.page ||
      waitRequest.value < 2)
  ) {
    return;
  }
  props.orderId && props.storeName === 'responses'
    ? (performersInfo.value[props.storeName].query.order_id = props.orderId)
    : null;

  performersInfo.value[props.storeName].query.page++;
  await Executors.getPaginationData(
    props.path,
    performersInfo,
    props.storeName
  );
  console.log(performersInfo.value);
  pending.value = false;
};
await handleDataChange();
const performerListScroll = ref();
const useScroll = async () => {
  if (
    (performerListScroll.value.scrollHeight ===
      performerListScroll.value.clientHeight &&
      window.pageYOffset + window.innerHeight + 20 >=
        document.documentElement.offsetHeight) ||
    (performerListScroll.value.scrollHeight >
      performerListScroll.value.clientHeight &&
      performerListScroll.value.scrollTop +
        performerListScroll.value.offsetHeight >=
        performerListScroll.value.scrollHeight)
  ) {
    await handleDataChange();
  }
};
onMounted(async () => {
  if (props.refreshOnMount) {
    refresh(props.storeName);
  }
  performerListScroll.value.addEventListener('mousewheel', useScroll);
});
watch(
  () => pending.value,
  () => {
    if (!pending.value) {
      performerListScroll.value.addEventListener('mousewheel', useScroll);
    } else
      performerListScroll.value.removeEventListener('mousewheel', useScroll);
  }
);
</script>

<style scoped lang="scss">
.executors-list {
  @apply flex items-center flex-col w-full;
  &__inner {
    @apply flex flex-col w-full;
    row-gap: 30px;
    margin-bottom: 40px;
  }
}
</style>
