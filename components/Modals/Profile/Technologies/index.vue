<template>
  <modals size="small" @modal-close="modalClose">
    <section class="modal-technologies">
      <h1 class="modal-technologies__title">Редактирование “Технологии”</h1>
      <div class="modal-technologies__content">
        <modals-profile-technologies-filters
          v-if="filters.technologies.length"
          class="modal-technologies__filters"
          :init-technologies="modalData.technologies"
          :technologies="filters.technologies"
          @update-technologies="updateTechnologies"
        />
        <article class="modal-technologies__list">
          <shared-technologies
            :technologies="technologies"
            view="block"
            :per-line="5"
            :delete-possible="true"
            @delete-technology="deleteTechnology"
          />
        </article>
      </div>
      <shared-button-gradient-blue
        button-height="42px"
        font-size="18px"
        button-width="172px"
        @click="modalClose"
      >
        <shared-arrow-text font-size="18px" font-weight="500">
          Сохранить
        </shared-arrow-text>
      </shared-button-gradient-blue>
    </section>
  </modals>
</template>

<script setup>
const emits = defineEmits(['modal-close']);
const modalClose = () => {
  emits('modal-close');
};
const { deleteUndefined, getTechnologies } = useFilters();
const filters = useFiltersData();
if (!filters.value.technologies.length) getTechnologies();

const modalData = reactive({
  technologies: []
});

const technologies = computed(() =>
  modalData.technologies.map((item) => {
    return {
      id: item,
      name: 'NUXT.JS'
    };
  })
);

const deleteTechnology = (id) => {
  modalData.technologies.splice(id, 1);
};
const updateTechnologies = (val) => {
  modalData.technologies = val;
  modalData.technologies.type = undefined;
  modalData.technologies = deleteUndefined(modalData.technologies);
};
</script>

<style scoped lang="scss">
.modal-technologies {
  @apply flex flex-col h-fit;
  width: 936px;
  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 25px;
  }
  &__content {
    @apply flex justify-between w-full h-fit;
    margin-bottom: 25px;
  }
  &__filters {
    width: 320px;
  }
  &__list {
    @apply overflow-y-auto;
    max-height: 470px;
    width: 600px;

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
