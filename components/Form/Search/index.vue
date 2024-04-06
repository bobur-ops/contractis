<template>
  <article class="form-search">
    <h2 v-if="route.query.search" class="form-search__search-label">
      Найдено 190 объявлений по вашему запросу
      <span class="form-search__search-text">
        "{{ trimText(route.query.search, 50) }}"
      </span>
    </h2>
    <form-search-field />
    <form-select
      v-model="sort"
      width="215px"
      height="45px"
      :sort="searchSort"
      placeholder="Сортировать по"
      :init-val="initSelect"
    />
  </article>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const props = defineProps({
  searchSort: { type: Array, default: () => [] }
});
const { trimText } = useFormatting();
const sort = ref();

const initSelect = computed(() => {
  return route.query.sort
    ? props.searchSort.find((e) => e.code === route.query.sort)
    : undefined;
});
watch(sort, () => {
  const queryParams = Object.assign({}, route.query);
  delete queryParams.sort;
  const query = Object.assign({ sort: sort.value.code }, queryParams);
  router.push({ query: query });
});
</script>

<style scoped lang="scss">
.form-search {
  @apply flex justify-between relative;
  &__search-label {
    @apply absolute;
    font-size: 14px;
    top: -35px;
    color: $gray-70;
    font-weight: 400;
  }
  &__search-text {
    color: $white;
    font-weight: 500;
  }
}
</style>
