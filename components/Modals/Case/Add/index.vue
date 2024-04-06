<template>
  <modals size="big" @modal-close="modalClose">
    <section class="modal-case-add">
      <modals-case-add-aside />
      <article class="modal-case-add-form">
        <h1 class="modal-case-add__title">Добавление кейса в портфолио</h1>
        <modals-case-add-slide-description
          v-if="modalData.selectedSlide === 0"
        />
        <modals-case-add-slide-files
          v-else-if="modalData.selectedSlide === 1"
        />
        <modals-case-add-slide-categories
          v-else-if="modalData.selectedSlide === 2"
        />
        <modals-case-add-slide-evals
          v-else-if="modalData.selectedSlide === 3"
          @create-case="modalClose"
        />
      </article>
    </section>
    <img
      src="assets/images/astronauts/modal-astronaut.png"
      alt="astronaut"
      class="modal-case-add__astronaut"
    />
  </modals>
</template>

<script setup>
import { useCreateCaseModal } from '~/stores';

const modalData = useCreateCaseModal();
const emits = defineEmits(['modal-close']);
const modalClose = () => {
  emits('modal-close');
};
</script>

<style scoped lang="scss">
.modal-case-add {
  @apply h-full flex justify-between;
  width: 1300px;
  &__astronaut {
    @apply absolute;
    left: 0;
    bottom: 35%;
    transform: translateY(50%);
  }

  &-form {
    @apply flex flex-col;
    gap: 30px;
    min-width: 936px;
    &__input {
      &-link {
        margin-bottom: 15px;
      }
    }
  }
  &__title {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }
}
</style>
