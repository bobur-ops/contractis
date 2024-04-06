<template>
  <aside class="modal-case-add-aside">
    <ul class="modal-case-add-aside__list">
      <li
        v-for="(item, ind) in items"
        :key="ind"
        class="modal-case-add-aside__item"
      >
        <svgo-circle-selected
          v-if="modalData.selectedSlide === ind"
          class="modal-case-add-aside__item-svg"
        />
        <svgo-circle-empty v-else class="modal-case-add-aside__item-svg" />
        {{ item.title }}
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useCreateCaseModal } from '~/stores/index.js';

const items = [
  {
    id: 1,
    title: 'Название и описание'
  },
  {
    id: 2,
    title: 'Обложка, файлы'
  },
  {
    id: 3,
    title: 'Категория и технологии'
  },
  {
    id: 4,
    title: 'Стоимость, срок'
  }
];
const modalData = useCreateCaseModal();
</script>

<style scoped lang="scss">
.modal-case-add-aside {
  @apply w-full h-fit;
  &__list {
    @apply flex flex-col;
    gap: 23px;
  }
  &__item {
    @apply flex items-baseline;
    gap: 10px;
    font-weight: 500;
    line-height: 12px;
    &-svg {
      height: 12px;
    }
  }
}
</style>
