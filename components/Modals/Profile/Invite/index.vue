<template>
  <modals size="small" @modal-close="modalClose">
    <section class="invite">
      <h1 class="invite__title">Приглашение в “Сотрудники”</h1>
      <div class="invite__content">
        <form-base class="invite__form">
          <template #labels>
            <form-field
              id="email"
              placeholder="Введите e-mail"
              label="E-mail"
              type="email"
            />
          </template>
          <template #buttons>
            <shared-button-gradient-blue
              button-height="42px"
              font-size="18px"
              button-width="172px"
              @click="modalClose"
            >
              <shared-arrow-text font-size="18px" font-weight="500">
                Отправить
              </shared-arrow-text>
            </shared-button-gradient-blue>
          </template>
        </form-base>
        <p class="invite__description">
          Этому человеку на почту прийдет уведомление о приглашении в сотрудники
          вашей компании
        </p>
      </div>
    </section>
  </modals>
</template>

<script setup>
const emits = defineEmits(['modal-close']);
const modalClose = () => {
  emits('modal-close');
};
</script>

<style scoped lang="scss">
.invite {
  @apply flex flex-col h-fit;
  width: 936px;
  &__top {
    @apply flex;
  }
  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 25px;
  }
  &__textarea {
    margin-bottom: 35px;
  }
  &__content {
    @apply flex;
    gap: 5%;
  }
  &__description {
    width: 52%;
    margin-top: 30px;
    font-size: 18px;
    line-height: 144%;
    color: $gray;
  }
  &__form {
    width: 43%;
  }
}
</style>
