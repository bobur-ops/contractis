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
          Подтвердить
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
  width: 392px;
  margin: 37px 40px;
  &__info {
    @apply flex flex-col;
    margin-bottom: 30px;
    gap: 30px;
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
      line-height: 24px;
      font-weight: 400;
      font-size: 16px;
    }
    &-link {
      line-height: 24px;
      text-decoration: underline;
      font-weight: 400;
      font-size: 16px;
    }
  }
  &__send {
    line-height: 24px;
    text-decoration: underline;
    font-weight: 500;
    font-size: 16px;
    float: right;
  }
  &__name {
    line-height: 48px;
    font-family: $base-font;
    font-weight: 600;
    color: white;
    font-size: 36px;
  }
}
</style>
