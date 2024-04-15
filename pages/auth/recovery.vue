<template>
  <div class="recovery">
    <div class="recovery__info">
      <h1 class="recovery__name">Восстановление пароля</h1>
      <p class="recovery__description-text">
        Код для подтверждения пароля отправлен на ваш Email и в Telegram-bot.
      </p>
      <p class="recovery__description-subtext">
        Не пришел код?
        <span class="recovery__send">Отправить еще раз</span>
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
  width: pxToRem(392);
  margin: pxToRem(35);
  &__info {
    @apply flex flex-col;
    margin-bottom: pxToRem(30);
    gap: pxToRem(30);
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
      line-height: pxToRem(20);
      font-weight: 400;
      font-size: pxToRem(16);
    }
    &-subtext {
      @apply flex justify-between;
      color: rgba($color: #fff, $alpha: 0.6);
      line-height: pxToRem(20);
      font-weight: 300;
      font-size: pxToRem(16);
    }
    &-link {
      line-height: pxToRem(24);
      text-decoration: underline;
      font-weight: 400;
      font-size: pxToRem(16);
    }
  }
  &__send {
    color: rgba($color: #fff, $alpha: 0.9);
    text-decoration: underline;
    font-weight: 300;
    font-size: pxToRem(16);
    float: right;
  }
  &__name {
    line-height: pxToRem(36);
    font-family: $base-font;
    font-weight: 500;
    color: rgba($color: #fff, $alpha: 0.85);
    font-size: pxToRem(36);
  }
}
</style>
