<template>
  <div class="recovery">
    <div class="recovery__info">
      <h1 class="recovery__name">
        Подтверждение <br />
        акккаунта
      </h1>
      <p class="recovery__description-text">
        Код для подтверждения пароля отправлен на ваш Email и в Telegram-bot.
      </p>
      <p class="recovery__description--text">
        Не пришел код?
        <span class="recovery__send">Отправить еще раз (20 с.)</span>
      </p>
    </div>
    <form-base class="recovery__form">
      <template #labels>
        <form-o-t-p :digit-count="6" @code-change="codeChange" />
        <form-checkbox id="5" gap="10px">
          Я выражаю свое согласие с условиями Пользовательского соглашения
        </form-checkbox>
      </template>
      <template #buttons>
        <button-gradient-blue
          name="Подтвердить"
          class="recovery__button"
          @click.prevent
        >
          <arrow-text> Подтвердить </arrow-text>
        </button-gradient-blue>
      </template>
    </form-base>
  </div>
  <div>Two</div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
});
const codeValue = ref(null);
const codeChange = (numbers) => {
  codeValue.value = numbers;
};
</script>

<style scoped lang="scss">
.recovery {
  width: calcHeight(450px);
  margin: calcHeight(35px);
  &__info {
    @apply flex flex-col;
    margin-bottom: calcHeight(36px);
    gap: calcHeight(30px);
  }
  &__form {
    &-necessarily {
      color: $gray;
      font-weight: 500;
    }
  }
  &__description {
    &-text {
      color: $white;
      opacity: 0.6;
      font-family: $base-font;
      line-height: calcHeight(20px);
      opacity: 0.6;
      font-weight: 400;
      font-size: calcHeight(16px);
    }
    &--text {
      color: $white;
      opacity: 0.6;
      font-family: $base-font;
      line-height: calcHeight(20px);
      color: $white;
      opacity: 0.6;
      font-weight: 300;
      font-size: calcHeight(16px);
    }
    &-link {
      line-height: 24px;
      text-decoration: underline;
      font-weight: 400;
      font-size: calcHeight(16px);
    }
  }
  &__send {
    line-height: calcHeight(24px);
    text-decoration: underline;
    font-weight: 300;
    color: $white;
    opacity: 0.9;
    font-family: $base-font;
    font-size: calcHeight(16px);
    float: right;
  }
  &__name {
    line-height: calcHeight(36px);
    font-family: $base-font;
    font-weight: 500;
    color: white;
    font-size: calcHeight(30px);
  }
  &__button {
    margin-top: calcHeight(60px);
  }
}
</style>
