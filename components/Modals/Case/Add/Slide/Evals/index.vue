<template>
  <section class="modals-case-add-evals">
    <form-filter-ui-range
      :title="label.budget"
      units="₽"
      margin-bottom="35px"
      description="Хотите указать фиксированный бюджет? Заполните только одно поле"
      :separator="false"
      :init-val="modalData.budget"
      :is-validate-error="!!errors.budget"
      @update-upper="updateBudgetUpper"
      @update-lower="updateBudgetLower"
    />
    <form-filter-ui-range
      :title="label.time"
      :units="timeFormats"
      margin-bottom="45px"
      borders="15px 0 0 15px"
      description="Хотите указать фиксировнный срок? Заполните только одно поле"
      input-width="110px"
      :separator="false"
      :init-val="modalData.time"
      :is-validate-error="!!errors.time"
      @update-units="updateTimeFormat"
      @update-upper="updateTimeUpper"
      @update-lower="updateTimeLower"
    />
    <shared-button-gradient-blue
      button-height="55px"
      font-size="20px"
      button-width="320px"
      @click="sendCase"
    >
      <shared-arrow-text-animate font-size="20px" font-weight="500">
        Добавить кейс
      </shared-arrow-text-animate>
    </shared-button-gradient-blue>
  </section>
</template>

<script setup>
import { timeFormats } from '~/components/Form/Filter/model/index.js';
import { useCreateCaseModal } from '~/stores/index.js';
const emits = defineEmits(['create-case']);
const modalData = useCreateCaseModal();

const updateBudgetUpper = (val) => {
  if (val === '') modalData.value.budget.upper = undefined;
  else {
    modalData.value.budget.upper = val;
    errors.value.budget = '';
  }
};
const updateBudgetLower = (val) => {
  if (val === '') modalData.value.budget.lower = undefined;
  else {
    modalData.value.budget.lower = val;
    errors.value.budget = '';
  }
};
const updateTimeLower = (val) => {
  if (val === '') modalData.value.time.lower = undefined;
  else {
    modalData.value.time.lower = val;
    errors.value.time = '';
  }
};
const updateTimeUpper = (val) => {
  if (val === '') modalData.value.time.upper = undefined;
  else {
    modalData.value.time.upper = val;
    errors.value.time = '';
  }
};
const updateTimeFormat = (val) => {
  if (val === '') modalData.value.time.format = undefined;
  else modalData.value.time.format = val;
};

const errors = ref({
  budget: '',
  time: ''
});
const label = reactive({
  budget: computed(() =>
    errors.value.budget ? errors.value.budget : 'Стоимость'
  ),
  time: computed(() => (errors.value.time ? errors.value.time : 'Срок'))
});
const sendCase = () => {
  if (!modalData.value.budget.upper && !modalData.value.budget.lower)
    errors.value.budget = 'Необходимо ввести стоимость';
  if (!modalData.value.time.upper && !modalData.value.time.lower)
    errors.value.time = 'Необходимо ввести срок';
  if (errors.value.time || errors.value.budget) return;
  modalData.value = {
    selectedSlide: 0,
    title: '',
    description: '',
    link: '',
    coverImage: null,
    titleImage: null,
    filtersData: {
      category: 0,
      specialization: 0,
      tech: []
    },
    budget: {
      lower: null,
      upper: null
    },
    time: {
      units: 'h',
      lower: null,
      upper: null
    }
  };
  emits('create-case');
};
</script>

<style scoped lang="scss"></style>
