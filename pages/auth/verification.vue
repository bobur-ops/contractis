<template>
  <div class="verification">
    <div class="verification__info">
      <h1 class="verification__name">Подтверждение аккаунта</h1>
      <p class="verification__description-text">
        Код для подтверждения пароля отправлен на ваш Email и в Telegram-bot.
      </p>
      <p class="verification__description-subtext">
        Не пришел код?
        <span class="verification__send">Отправить еще раз (20 с.)</span>
      </p>
    </div>
    <form-base class="verification__form" @submit="submit">
      <template #labels>
        <form-o-t-p v-model="codeValue" :digit-count="6" />
        {{ errors.codeValue }}
        <div class="verification__form-necessarily">
          <form-checkbox id="agree" v-model="agree" gap="10px">
            Я выражаю свое согласие с условиями
            <nuxt-link to="#" class="verification__description-link">
              Пользовательского соглашения
            </nuxt-link>
          </form-checkbox>
          {{ errors.agree }}
        </div>
      </template>
      <template #buttons>
        <shared-button-gradient-blue button-height="50px" font-size="20px">
          <shared-arrow-text> Подтвердить </shared-arrow-text>
        </shared-button-gradient-blue>
      </template>
    </form-base>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'user'
});
const { handleSubmit, errors, defineField, setErrors } = useForm({
  initialValues: {
    codeValue: '',
    agree: false
  }
});
const [codeValue] = defineField('codeValue');
const [agree] = defineField('agree');
const submit = handleSubmit((values) => {
  if (values.codeValue.length !== 6)
    setErrors({ codeValue: 'Заполните все поля' });
  else setErrors({ codeValue: null });
  if (values.agree !== true)
    setErrors({ agree: 'Для продолжения необходимо согласие' });
  else setErrors({ agree: null });
  if (!errors.value.agree && !errors.value.codeValue) {
    console.log(values);
  }
});
</script>
<style scoped lang="scss">
.verification {
  width: calcWidth(397);
  margin: calcWidth(37) calcWidth(40);
  @media screen and ($media-lg-query) {
    width: unset;
    margin: 0;
  }
  &__info {
    @apply flex flex-col;
    margin-bottom: calcWidth(30);
    gap: calcWidth(30);
    @media screen and ($media-lg-query) {
      gap: calculateVw768(30);
      margin-bottom: calculateVw768(30);
    }
    @media screen and ($media-md-query) {
      gap: calculateVw425(30);
      margin-bottom: calculateVw425(30);
    }
  }
  &__form {
    &-necessarily {
      color: $gray;
      font-weight: 400;
    }
  }
  &__description {
    &-text {
      color: rgba($color: #fff, $alpha: 0.6);
      line-height: calcWidth(20);
      font-weight: 400;
      font-size: calcWidth(16);
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(16);
        line-height: calculateVw768(20);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(13);
        line-height: calculateVw425(20);
      }
    }
    &-subtext {
      color: rgba($color: #fff, $alpha: 0.6);
      font-weight: 300;
      line-height: calcWidth(20);
      font-size: calcWidth(16);
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(16);
        line-height: calculateVw768(20);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(13);
        line-height: calculateVw425(20);
      }
    }
    &-link {
      text-decoration: underline;
      font-weight: 400;
      color: rgba($color: #fff, $alpha: 0.9);
      line-height: calcWidth(20);
      font-size: calcWidth(16);
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(16);
        line-height: calculateVw768(20);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(14);
        line-height: calculateVw425(20);
      }
    }
  }
  &__send {
    text-decoration: underline;
    font-weight: 300;
    color: rgba($color: #fff, $alpha: 0.9);
    float: right;
    font-size: calcWidth(16);
    line-height: calcWidth(20);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(16);
      line-height: calculateVw768(20);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(14);
      line-height: calculateVw425(20);
    }
  }
  &__name {
    font-family: $base-font;
    font-weight: 500;
    color: rgba($color: #fff, $alpha: 0.85);
    line-height: calcWidth(48);
    font-size: calcWidth(36);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(36);
      line-height: calculateVw768(48);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(24);
      line-height: calculateVw425(28);
    }
  }
}
</style>
