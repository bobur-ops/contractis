<template>
  <article class="filters">
    <form-filter-ui-multi-accordion
      title="Выберите категории"
      :filters="categories"
      :init-val="initSpecialization"
      :init-radio="initCategory"
      :multiple-radio="false"
      :multiple-checkbox="false"
      warning-text="В заказ вы можете прикрепить только 1 категорию и 1 подкатегорию"
      margin-bottom="35px"
      :default-open="true"
      :is-validate-error="isErrors?.category"
      @update-checkbox="updateSpecialization"
      @update-radio="updateCategory"
      @clear="clearCategory"
    />
    <form-filter-ui-multi-accordion
      title="Выберите технологии"
      :filters="technologies"
      :init-val="initTechnologies"
      :multiple-radio="false"
      :switchable-radio="true"
      margin-bottom="0"
      :default-open="false"
      :is-validate-error="isErrors?.tech"
      @update-checkbox="updateTechnologies"
    />
  </article>
</template>

<script setup>
const props = defineProps({
  initCategory: { type: Number, default: null },
  initSpecialization: { type: Number, default: null },
  initTechnologies: { type: Array, default: () => [] },
  categories: { type: Array, required: true },
  technologies: { type: Array, required: true },
  isErrors: {
    type: Object,
    default: () => ({
      category: false,
      tech: false
    })
  }
});

const emit = defineEmits([
  'updateCategory',
  'updateSpecialization',
  'updateTechnologies',
  'clearCategory'
]);

const categoriesValues = {
  category: props.initCategory,
  specialization: props.initSpecialization
};
watch([() => props.initCategory, () => props.initSpecialization], () => {
  categoriesValues.category = props.initCategory;
  categoriesValues.specialization = props.initSpecialization;
});
const updateCategory = (val) => {
  categoriesValues.category = val;
  emit('updateCategory', categoriesValues);
};
const updateSpecialization = (val) => {
  categoriesValues.specialization = val;
  emit('updateSpecialization', categoriesValues);
};
const clearCategory = () => emit('clearCategory');
let technologiesValues = [];
const updateTechnologies = (val) => {
  technologiesValues = val;
  emit('updateTechnologies', technologiesValues);
};
</script>

<style scoped lang="scss">
.filters {
  @apply flex flex-col;
}
</style>
