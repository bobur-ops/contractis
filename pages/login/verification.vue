<template>
  <div class="verification">
    <div class="verification__info">
      <h1 class="verification__name">Подтверждение аккаунта</h1>
      <p class="verification__description-text">
        Код для подтверждения пароля отправлен на ваш Email и в Telegram-bot.
      </p>
      <p class="verification__description-text">
        Не пришел код?
        <span class="verification__send">Отправить еще раз (20 с.)</span>
      </p>
    </div>
    <form-base class="verification__form">
      <template #labels>
        <form-o-t-p :digit-count="6" @code-change="codeChange" />
        <div class="verification__form-necessarily">
          <form-checkbox id="4" gap="10px">
            Я соглашаюсь с
            <nuxt-link to="#" class="verification__description-link">
              Пользовательским соглашением
            </nuxt-link>
          </form-checkbox>
        </div>
      </template>
      <template #buttons>
        <button-gradient-blue
          name="Подтвердить"
          class="verification__button"
          @click.prevent
        >
          Войти</button-gradient-blue
        >
      </template>
    </form-base>
  </div>
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
.verification {
  width: calcHeight(450px);
  margin: calcHeight(60px) calcHeight(55px);
  &__info {
    @apply flex flex-col;
    margin-bottom: calcHeight(36px);
    gap: calcHeight(50px);
  }
  &__form {
    &-necessarily {
      color: $gray;
      font-weight: 500;
    }
  }
  &__description {
    &-text {
      color: $gray;
      line-height: calcHeight(24px);
      font-weight: 400;
      font-size: calcHeight(20px);
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
    font-weight: 500;
    font-size: calcHeight(20px);
    float: right;
  }
  &__name {
    line-height: calcHeight(55px);
    font-family: $base-font;
    font-weight: 600;
    color: white;
    font-size: calcHeight(45px);
  }
}
</style>
