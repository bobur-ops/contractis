<template>
  <aside class="order-filter">
    <form class="order-filter__form" @submit.prevent="sendFilters">
      <form-filter-ui-multi-accordion
        title="Выберите категории"
        :filters="filters.categories"
        :init-val="initCategories.specializations"
        :init-radio="initCategories.categories"
        @update-checkbox="updateSpecializations"
        @update-radio="updateCategories"
        @clear="clearSpecializations"
      />
      <form-filter-ui-checkbox
        :filters="orderExecutor"
        title="Работа для"
        :init-val="initWorkers"
        @update-checkbox="updateWorkers"
      />
      <form-filter-ui-multi-accordion
        title="Выберите технологии"
        :filters="filters.technologies"
        :init-val="initTechnologies"
        :multiple-radio="false"
        :switchable-radio="true"
        @update-checkbox="updateTechnologies"
      />
      <form-filter-ui-range
        title="Бюджет"
        units="₽"
        margin-bottom="30px"
        :init-val="initBudget"
        @update-upper="updateBudgetUpper"
        @update-lower="updateBudgetLower"
      />
      <form-filter-ui-range
        title="Срок"
        :units="timeFormats"
        margin-bottom="45px"
        :init-val="initTime"
        input-width="95px"
        borders="15px 0 0 15px"
        @update-units="updateTimeFormat"
        @update-upper="updateTimeUpper"
        @update-lower="updateTimeLower"
      />
      <shared-button-gradient-blue
        font-size="20px"
        button-height="45px"
        @submit.prevent="sendFilters"
      >
        Применить
      </shared-button-gradient-blue>
    </form>
  </aside>
</template>

<script setup>
import { timeFormats } from '~/components/Form/Filter/model/index.js';
import { orderExecutor } from '~/components/Order/model';
import { useFilters } from '~/composables/useFilters.js';

const { deleteElement } = useFilters();
const filters = useFiltersData();

let categoriesValues = {};
const updateCategories = (val) => (categoriesValues.categories = val);
const updateSpecializations = (val) => {
  categoriesValues.specializations = val;
  initCategories.specializations = val;
};
const clearSpecializations = (categoryId) => {
  filters.value.categories.forEach((category) => {
    if (category.id === categoryId)
      category.list.forEach((specialization) => {
        if (categoriesValues.specializations.includes(specialization.id))
          categoriesValues.specializations = deleteElement(
            specialization.id,
            categoriesValues.specializations
          );
      });
  });
  return null;
};
let workers = [];
const updateWorkers = (val) => {
  workers = [];
  val.forEach((el, id) => {
    if (el === true) workers.push(orderExecutor[id].code);
  });
};
let technologiesValues = [];
const updateTechnologies = (val) => (technologiesValues = val);
let budget = {};
const updateBudgetUpper = (val) => {
  if (val === '') budget.upper = undefined;
  else budget.upper = val;
};
const updateBudgetLower = (val) => {
  if (val === '') budget.lower = undefined;
  else budget.lower = val;
};
let time = {};
const updateTimeLower = (val) => {
  if (val === '') time.lower = undefined;
  else time.lower = val;
};
const updateTimeUpper = (val) => {
  if (val === '') time.upper = undefined;
  else time.upper = val;
};
const updateTimeFormat = (val) => {
  if (val === '') time.format = undefined;
  else time.format = val;
};
const router = useRouter();
const route = useRoute();
const initCategories = {};
initCategories.specializations = route.query.specializations
  ? JSON.parse(route.query.specializations)
  : [];
initCategories.categories = route.query.categories
  ? JSON.parse(route.query.categories)
  : [];
const initWorkers = route.query.workers ? JSON.parse(route.query.workers) : [];
const initTechnologies = route.query.tech ? JSON.parse(route.query.tech) : [];
const initBudget = route.query.budget ? JSON.parse(route.query.budget) : {};
const initTime = route.query.time ? JSON.parse(route.query.time) : {};

categoriesValues = initCategories;
workers = initWorkers;
technologiesValues = initTechnologies;
budget = initBudget;
time = initTime;

function sendFilters() {
  if (!time?.format && (time.lower > 0 || time.upper > 0)) time.format = 'h';
  else if (!time.upper && !time.lower) time.format = undefined;
  const queryParams = Object.assign({}, route.query);
  delete queryParams.categories;
  delete queryParams.specializations;
  delete queryParams.workers;
  delete queryParams.tech;
  delete queryParams.budget;
  delete queryParams.time;
  const query = Object.assign(
    {
      specializations: categoriesValues.specializations?.length
        ? JSON.stringify(categoriesValues.specializations)
        : undefined,
      categories: categoriesValues.categories?.length
        ? JSON.stringify(categoriesValues.categories)
        : undefined,
      workers: workers.length ? JSON.stringify(workers) : undefined,
      tech: technologiesValues?.length
        ? JSON.stringify(technologiesValues)
        : undefined,
      budget:
        JSON.stringify(budget) !== '{}' ? JSON.stringify(budget) : undefined,
      time: JSON.stringify(time) !== '{}' ? JSON.stringify(time) : undefined
    },
    queryParams
  );
  router.push({ query: query });
}
</script>

<style scoped lang="scss">
.order-filter {
  &__form {
    border-radius: 12px;
    background-color: $bg-black-block;
    padding: 35px 20px;
    border: 1px solid $border-block;
  }
}
</style>
