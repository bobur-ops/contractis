<template>
  <section class="modals-case-add-categories">
    <div class="modals-case-add-categories__content">
      <modals-case-add-slide-categories-filters
        class="modals-case-add-categories__filters"
        :init-category="modalData.filtersData.category"
        :init-specialization="modalData.filtersData.specialization"
        :init-technologies="modalData.filtersData.tech"
        :categories="filters.categories"
        :technologies="filters.technologies"
        :is-errors="isErrors"
        @update-category="updateCategory"
        @update-specialization="updateSpecialization"
        @clear-category="clearCategory"
        @update-technologies="updateTechnologies"
      />
      <div class="modals-case-add-categories__technologies">
        <shared-technologies
          :technologies="technologies"
          view="block"
          :delete-possible="true"
          :per-line="4"
          @delete-technology="deleteTechnology"
        />
      </div>
    </div>
    <shared-button-gradient-blue
      button-height="55px"
      font-size="20px"
      button-width="320px"
      @click="saveTechnologies"
    >
      <shared-arrow-text-animate font-size="20px" font-weight="500">
        Продолжить
      </shared-arrow-text-animate>
    </shared-button-gradient-blue>
  </section>
</template>

<script setup>
import { useCreateCaseModal } from '~/stores/index.js';

const modalData = useCreateCaseModal();
const filters = useFiltersData();
const { getCategories, getFilters } = useFilters();
if (!filters.value.categories.length) getCategories();
if (!filters.value.technologies.length) getFilters();

const { deleteUndefined } = useFilters();

const technologies = computed(() =>
  modalData.value.filtersData?.tech.map((item) => {
    return {
      id: item,
      name: 'HTML'
    };
  })
);
const updateCategory = (val) => {
  modalData.value.filtersData.category = val.category;
};
const updateSpecialization = (val) => {
  modalData.value.filtersData.specialization = val.specialization;
};
const clearCategory = () => {
  modalData.value.filtersData.category = undefined;
  modalData.value.filtersData.specialization = undefined;
};
const updateTechnologies = (val) => {
  modalData.value.filtersData.tech = val;
  modalData.value.filtersData.tech.type = undefined;
  modalData.value.filtersData.tech = deleteUndefined(
    modalData.value.filtersData.tech
  );
};

const deleteTechnology = (id) => {
  modalData.value.filtersData.tech.splice(id, 1);
};
const isErrors = ref({
  category: false,
  tech: false
});
const saveTechnologies = () => {
  isErrors.value.category =
    !modalData.value.filtersData.category ||
    !modalData.value.filtersData.specialization;
  isErrors.value.tech = !modalData.value.filtersData.tech.length;
  if (!isErrors.value.tech && !isErrors.value.category)
    modalData.value.selectedSlide++;
};
</script>

<style scoped lang="scss">
.modals-case-add-categories {
  @apply flex flex-col;
  gap: 60px;
  &__content {
    @apply flex items-end justify-between;
    padding-right: 70px;
  }
  &__filters {
    align-self: start;
  }
  &__technologies {
    @apply overflow-y-auto;
    width: 455px;
    height: 255px;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: $border-block;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: $white;
      border-radius: 3px;
    }
  }
}
</style>
