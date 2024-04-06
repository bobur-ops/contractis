<template>
  <section class="order-create">
    <div class="order-create__inner container">
      <div class="order-create__title">
        <div class="order-create__title-mark" />
        <h1 class="order-create__title-text">Cоздание заказа</h1>
      </div>
      <order-create-ui-pagination :page="page" />
      <transition-group name="scroll">
        <div v-if="page === 1" class="order-create__description">
          <order-create-ui-filters
            class="order-create__filter-form"
            :init-category="orderData.category"
            :init-specialization="orderData.specialization"
            :init-technologies="orderData.tech"
            :categories="filters.categories"
            :technologies="filters.technologies"
            @update-category="updateCategory"
            @update-specialization="updateSpecialization"
            @clear-category="clearCategory"
            @update-technologies="updateTechnologies"
          />
          <order-create-ui-description
            class="order-create__description-form"
            :init-data="orderData"
            @next-page="nextPage"
          />
        </div>
        <div v-if="page === 2" class="order-create__parameters">
          <order-create-ui-parameters
            :init-data="orderData"
            @next-page="nextPage"
            @last-page="lastPage"
          />
        </div>
        <div v-if="page === 3" class="order-create__publish">
          <order-create-ui-publish
            :title="orderData.title"
            :description="orderData.description"
            :start-price="orderData.budget.lower"
            :end-price="orderData.budget.upper"
            :min-period="orderData.time.lower"
            :max-period="orderData.time.upper"
            :format-period="orderData.time.format"
            :files="orderData.initFiles"
            :files-data="orderData.files"
            :technologies-list="orderData.tech"
            :team="orderData.preference"
            :keywords="orderData.keywords"
            :category="orderData.category"
            :specialization="orderData.specialization"
            :categories="filters.categories"
            :technologies="filters.technologies"
            @last-page="lastPage"
          />
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script setup>
const filters = useFiltersData();
const { getCategories } = useFilters();
if (!filters.value.categories.length) getCategories();

definePageMeta({
  layout: 'main',
  middleware: ['filters', 'auth', 'role']
});
const { deleteUndefined } = useFilters();
const page = ref(1);
const orderData = ref({});
const nextPage = (data) => {
  page.value++;
  Object.assign(orderData.value, data);
};
const lastPage = (data) => {
  page.value--;
  Object.assign(orderData.value, data);
};

const updateCategory = (val) => {
  orderData.value.category = val.category;
};
const updateSpecialization = (val) => {
  orderData.value.specialization = val.specialization;
};
const clearCategory = () => {
  orderData.value.category = undefined;
  orderData.value.specialization = undefined;
};
const updateTechnologies = (val) => {
  orderData.value.tech = val;
  orderData.value.tech.type = undefined;
  orderData.value.tech = deleteUndefined(orderData.value.tech);
};
</script>

<style scoped lang="scss">
.order-create {
  @apply flex justify-center w-full;
  padding-top: 30px;
  padding-bottom: 60px;

  &__title {
    @apply flex items-end;
    gap: $space-small;
    margin-bottom: $space-big;
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
  &__description {
    @apply grid;
    grid-template-areas: 'filter description';
    grid-template-columns: 400px 1fr;
    column-gap: 90px;
    padding-top: $space-small-plus;
  }
  &__filter-form {
    grid-area: filter;
  }
  &__description-form {
    grid-area: description;
  }
}
.scroll-enter-active,
.scroll-leave-active {
  @apply absolute;
  transition: all 0.3s ease;
}

.scroll-enter-from,
.scroll-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>
