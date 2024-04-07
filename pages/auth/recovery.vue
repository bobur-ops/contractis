<template>
  <div class="recovery">
    <div class="recovery__info">
      <h1 class="recovery__name">Восстановление пароля</h1>
      <p class="recovery__description-text">
        Код для подтверждения пароля отправлен на ваш Email и в Telegram-bot.
      </p>
      <p class="recovery__description-text">
        Не пришел код?
        <span class="recovery__send">Отправить еще раз (20 с.)</span>
      </p>
    </div>
    <form-base class="recovery__form" @submit="submit">
      <template #labels>
        <form-o-t-p v-model="codeValue" :digit-count="6" />
        {{ errors.codeValue }}
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
    codeValue: ''
  }
});
const [codeValue] = defineField('codeValue');
const submit = handleSubmit((values) => {
  if (values.codeValue.length !== 6)
    setErrors({ codeValue: 'Заполните все поля' });
  else {
    setErrors({ codeValue: null });
    console.log(values);
  }
});
</script>
<style scoped lang="scss">
.recovery {
  width: calcWidth(392);
  margin: calcWidth(37) calcWidth(40);
  @media screen and ($media-lg-query) {
    width: unset;
    margin: 0;
  }
  @media screen and ($media-md-query) {
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
      font-weight: 500;
    }
  }
  &__description {
    &-text {
      color: rgba($color: #fff, $alpha: 0.6);
      line-height: calcWidth(24);
      font-weight: 400;
      font-size: calcWidth(16);
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(16);
        line-height: calculateVw768(24);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(13);
        line-height: calculateVw425(20);
      }
    }
    &-link {
      line-height: calcWidth(24);
      text-decoration: underline;
      font-weight: 400;
      color: rgba($color: #fff, $alpha: 0.9);
      font-size: calcWidth(16);
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(16);
        line-height: calculateVw768(24);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(14);
        line-height: calculateVw425(24);
      }
    }
  }
  &__send {
    line-height: calcWidth(24);
    text-decoration: underline;
    font-weight: 300;
    font-size: calcWidth(16);
    float: right;
    color: rgba($color: #fff, $alpha: 0.9);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(16);
      line-height: calculateVw768(24);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(14);
      line-height: calculateVw425(24);
    }
  }
  &__name {
    line-height: calcWidth(36);
    font-family: $base-font;
    font-weight: 500;
    color: rgba($color: #fff, $alpha: 0.85);
    font-size: calcWidth(36);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(36);
      line-height: calculateVw768(36);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(24);
      line-height: calculateVw425(28);
    }
  }
}
</style>
