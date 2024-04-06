<template>
  <aside class="order-filter">
    <form class="order-filter__form" @submit.prevent="sendFilters">
      <form-filter-ui-radio
        title="Выберите категории"
        :filters="filters.categories"
        :init-val="initCategories"
        :multiple="true"
        @update-radio="updateCategories"
      />
      <form-filter-ui-checkbox
        :filters="orderExecutor"
        title="Тип исполнителя"
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
        title="Цена часа"
        units="₽"
        margin-bottom="30px"
        :init-val="initCost"
        @update-upper="updateCostUpper"
        @update-lower="updateCostLower"
      />
      <form-filter-ui-radio
        title="Страна"
        :filters="executorsCountries"
        :init-val="initCountry"
        @update-radio="updateCountry"
      />
      <form-filter-ui-radio
        v-if="citiesList"
        title="Город"
        :filters="citiesList"
        :init-val="initCity"
        @update-radio="updateCity"
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
import { executorsCountries } from '~/components/Executors/model';
import { orderExecutor } from '~/components/Order/model/index.js';
const filters = useFiltersData();

let categoriesValues = [];
const updateCategories = (val) => (categoriesValues = val);
let workers = [];
const updateWorkers = (val) => {
  workers = [];
  val.forEach((el, id) => {
    if (el === true) workers.push(orderExecutor[id].code);
  });
};
let technologiesValues = [];
const updateTechnologies = (val) => (technologiesValues = val);
let cost = {};
const updateCostUpper = (val) => {
  if (val === '') cost.upper = undefined;
  else cost.upper = val;
};
const updateCostLower = (val) => {
  if (val === '') cost.lower = undefined;
  else cost.lower = val;
};
let country;
const citiesList = ref();
const updateCountry = (val) => {
  country = val;
  city = 0;
  if (country)
    citiesList.value = executorsCountries.find((e) => e.id === country).cities;
  else citiesList.value = null;
};
let city;
const updateCity = (val) => (city = val);
const router = useRouter();
const route = useRoute();
const initCategories = route.query.categories
  ? JSON.parse(route.query.categories)
  : [];
const initWorkers = route.query.workers ? JSON.parse(route.query.workers) : [];
const initTechnologies = route.query.tech ? JSON.parse(route.query.tech) : [];
const initCost = route.query.cost ? JSON.parse(route.query.cost) : {};
const initCountry = route.query.country ? Number(route.query.country) : 0;
const initCity = route.query.city ? Number(route.query.city) : 0;

categoriesValues = initCategories;
workers = initWorkers;
technologiesValues = initTechnologies;
cost = initCost;
country = initCountry;
city = initCity;
if (country)
  citiesList.value = executorsCountries.find((e) => e.id === country).cities;

function sendFilters() {
  const queryParams = Object.assign({}, route.query);
  delete queryParams.categories;
  delete queryParams.specialization;
  delete queryParams.workers;
  delete queryParams.tech;
  delete queryParams.cost;
  delete queryParams.country;
  delete queryParams.city;
  const query = Object.assign(
    {
      categories: categoriesValues?.length
        ? JSON.stringify(categoriesValues)
        : undefined,
      workers: workers.length ? JSON.stringify(workers) : undefined,
      tech: technologiesValues.length
        ? JSON.stringify(technologiesValues)
        : undefined,
      cost: JSON.stringify(cost) !== '{}' ? JSON.stringify(cost) : undefined,
      country: country > 0 ? country : undefined,
      city: city > 0 ? city : undefined
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
