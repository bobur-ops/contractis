<template>
  <section class="order-card-info-recommend">
    <div class="order-card-info-recommend__inner">
      <aside class="order-card-info-recommend-aside">
        <div class="order-card-info-recommend-aside__inner">
          <article class="order-card-info-recommend-aside__help">
            <p class="order-card-info-recommend-aside__help-title">
              Все фрилансеры из этого списка выполняют работы в нужной вам
              специализации.
            </p>
            <p class="order-card-info-recommend-aside__help-title">
              Перейдите в чат с понравившимися фрилансерами, чтобы больше
              специалистов увидели вашу задачу.
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
        :refresh-on-mount="false"
        class="order-card-info-recommend__list"
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
  return route.query.recommendationsSort
    ? executorsSort.find((e) => e.code === route.query.recommendationsSort)
    : undefined;
});
watch(sort, () => {
  const queryParams = Object.assign({}, route.query);
  delete queryParams.recommendationsSort;
  const query = Object.assign(
    { recommendationsSort: sort.value.code },
    queryParams
  );
  router.push({ query: query });
});
</script>

<style scoped lang="scss">
.order-card-info-recommend {
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
    &__help {
      @apply flex flex-col justify-between;
      min-height: 195px;
      border: 1px solid $border-block;
      border-radius: 12px;
      padding: 10% 8%;
      line-height: 100%;
      &-title {
        font-weight: 500;
        font-size: 14px;
        color: $gray;
      }
    }
  }
}
</style>
