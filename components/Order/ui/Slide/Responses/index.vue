<template>
  <section class="order-card-info-responses">
    <div class="order-card-info-responses__inner">
      <aside class="order-card-info-responses-aside">
        <div class="order-card-info-responses-aside__inner">
          <article class="order-card-info-responses-aside__stat">
            <p class="order-card-info-responses-aside__stat-views">
              219 просмотров
            </p>
            <p class="order-card-info-responses-aside__stat-relevant">
              2 сегодня
            </p>
          </article>
          <form-select
            v-model="sort"
            :init-val="initSelect"
            height="45px"
            :sort="executorsSort"
            placeholder="Сортировать по"
            theme="center"
          />
        </div>
      </aside>
      <executors-ui-list
        type="extended"
        store-name="responses"
        path="responses"
        class="order-card-info-responses__list"
        :refresh-on-mount="false"
        :order-id="route.params.id"
      />
    </div>
  </section>
</template>

<script setup>
import { executorsSort } from '~/components/Executors/model';

const route = useRoute();
const router = useRouter();

const sort = ref();

const initSelect = computed(() => {
  return route.query.responsesSort
    ? executorsSort.find((e) => e.code === route.query.responsesSort)
    : undefined;
});
watch(sort, () => {
  const queryParams = Object.assign({}, route.query);
  delete queryParams.responsesSort;
  const query = Object.assign({ responsesSort: sort.value.code }, queryParams);
  router.push({ query: query });
});

onMounted(() => {
  console.log(router);
  console.log(route.params.id);
});
</script>

<style scoped lang="scss">
.order-card-info-responses {
  @apply w-full h-fit flex justify-center items-center;
  margin-top: $space-x-large-plus;
  &__inner {
    @apply w-full h-fit grid;
    grid-template-columns: 24% 71%;
    gap: 5%;
  }
  &-aside {
    @apply w-full;
    &__inner {
      @apply w-full flex flex-col;
      gap: $space-medium-plus;
    }
    &__stat {
      @apply flex flex-col justify-between;
      min-height: 126px;
      border: 1px solid $border-block;
      border-radius: 12px;
      padding: 10%;
      &-views {
        font-weight: 500;
        font-size: 24px;
        line-height: 17px;
      }
      &-relevant {
        font-weight: 400;
        font-size: 20px;
        line-height: 14px;
      }
    }
  }
}
</style>
