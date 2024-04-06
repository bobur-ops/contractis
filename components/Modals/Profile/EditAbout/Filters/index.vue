<template>
  <article class="filters">
    <form-filter-ui-radio
      title="Основная категория"
      :filters="filters.categories"
      :init-val="categories.main"
      :multiple="false"
      class="filters__item"
      @update-radio="updateCategoriesMain"
    />
    <form-filter-ui-radio
      title="Дополнительные категории"
      :filters="filters.categories"
      :init-val="categories.more"
      :multiple="true"
      class="filters__item"
      @update-radio="updateCategoriesMore"
    />
  </article>
</template>

<script setup>
const userData = useUserData();
const filters = useFiltersData();
const categories = reactive({
  main: userData.value.user.profile.mainCategory ?? 0,
  more: userData.value.user.profile.additionalCategories
});
const { getCategories } = useFilters();
if (!filters.value.categories.length) getCategories();
const updateCategoriesMain = (category) => (categories.main = category);
const updateCategoriesMore = (category) => (categories.more = category);

const emit = defineEmits(['updateCategories']);
watchDeep(
  () => categories,
  () => emit('updateCategories', categories)
);
</script>

<style scoped lang="scss">
.filters {
  @apply flex;
  gap: 20px;
  &__item {
    width: 300px;
  }
}
</style>
