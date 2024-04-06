<template>
  <form class="order-create-parameters" @submit="nextPage">
    <shared-arrow-text-animate
      font-size="18px"
      font-weight="500"
      arrow-gap="15px"
      :revers="true"
      class="order-create-parameters__undo-button"
      @click.prevent="lastPage"
    >
      Вернуться назад
    </shared-arrow-text-animate>
    <div class="order-create-parameters__content">
      <div>
        <form-filter-ui-range
          title="Бюджет"
          units="₽"
          margin-bottom="35px"
          description="Хотите указать фиксированный бюджет? Заполните только одно поле"
          :init-val="initData.budget"
          :separator="false"
          @update-upper="updateBudgetUpper"
          @update-lower="updateBudgetLower"
        />
        <form-checkbox
          id="budgetNull"
          v-model="budgetNull"
          :init-val="
            initData.budget !== undefined &&
            initData.budget.lower === null &&
            initData.budget.upper === null
          "
        >
          Не могу оценить стоимость заказа. Жду предложений от фрилансеров
        </form-checkbox>
      </div>
      <div>
        <form-filter-ui-range
          title="Срок"
          :units="timeFormats"
          margin-bottom="35px"
          borders="15px 0 0 15px"
          description="Хотите указать фиксировнный срок? Заполните только одно поле"
          input-width="110px"
          :init-val="initData.time"
          :separator="false"
          @update-units="updateTimeFormat"
          @update-upper="updateTimeUpper"
          @update-lower="updateTimeLower"
        />
        <form-checkbox
          id="timeNull"
          v-model="timeNull"
          :init-val="
            initData.time !== undefined &&
            initData.time.lower === null &&
            initData.time.upper === null
          "
        >
          Заказ с открытой датой завершения. Жду предложений от фрилансеров
        </form-checkbox>
      </div>
    </div>
    <shared-button-gradient-blue
      button-height="55px"
      font-size="20px"
      button-width="320px"
      @click.prevent="nextPage"
    >
      <shared-arrow-text-animate font-size="20px" font-weight="500">
        Продолжить
      </shared-arrow-text-animate>
    </shared-button-gradient-blue>
  </form>
</template>

<script setup>
import { timeFormats } from '~/components/Form/Filter/model';
import { useFilters } from '~/composables/useFilters.js';
const { deleteUndefined } = useFilters();

const props = defineProps({
  initData: { type: Object, required: true }
});
const emit = defineEmits(['nextPage', 'lastPage']);
const nextPage = () => {
  sendData('nextPage');
};
const lastPage = () => {
  sendData('lastPage');
};
const sendData = (emitFunction = '') => {
  if (budgetNull.value || (!budget.value.upper && !budget.value.lower)) {
    budget.value.upper = null;
    budget.value.lower = null;
  }
  if (!time.value.format) time.value.format = 'h';
  if (timeNull.value || (!time.value.upper && !time.value.lower)) {
    time.value.upper = null;
    time.value.lower = null;
    time.value.format = null;
  }
  emit(`${emitFunction}`, {
    budget: budget.value,
    time: time.value
  });
};
const budgetNull = ref(
  props.initData.budget?.upper === null && props.initData.budget?.lower === null
);
const budget = ref(props.initData.budget ? props.initData.budget : {});
const updateBudgetUpper = (val) => {
  if (val === '') budget.value.upper = undefined;
  else budget.value.upper = val;
  budget.value = deleteUndefined(budget.value);
};
const updateBudgetLower = (val) => {
  if (val === '') budget.value.lower = undefined;
  else budget.value.lower = val;
  budget.value = deleteUndefined(budget.value);
};
const timeNull = ref(
  props.initData.time?.upper === null && props.initData.time?.lower === null
);
const time = ref(props.initData.time ? props.initData.time : {});
const updateTimeLower = (val) => {
  if (val === '') time.value.lower = undefined;
  else time.value.lower = val;
  budget.value = deleteUndefined(budget.value);
};
const updateTimeUpper = (val) => {
  if (val === '') time.value.upper = undefined;
  else time.value.upper = val;
  budget.value = deleteUndefined(budget.value);
};
const updateTimeFormat = (val) => {
  time.value.format = val;
};
</script>

<style scoped lang="scss">
.order-create-parameters {
  &__undo-button {
    margin-bottom: $space-xx-large-plus;
  }
  &__content {
    @apply flex justify-between;
    gap: 110px;
    margin-bottom: 60px;
  }
}
</style>
