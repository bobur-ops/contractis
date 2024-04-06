<template>
  <div class="verification">
    <div class="verification__info">
      <h1 class="verification__name">Создание нового пароля</h1>
      <p class="verification__description-text">
        Будьте внимательны при создании нового пароля и старайтесь больше не
        забывать!
      </p>
    </div>
    <form-base class="verification__form" @submit="submit">
      <template #labels>
        <form-password
          id="password"
          v-model="password"
          placeholder="Введите пароль"
          label="Пароль"
        />
        {{ errors.password }}
        <form-password
          id="confirmPassword"
          v-model="password_confirmation"
          placeholder="Повторите пароль"
          label="Повторите пароль"
        />
        {{ errors.password_confirmation }}
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
import { PasswordSchema } from '~/utils/Validation/index.js';
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: PasswordSchema,
  initialValues: {
    password: '',
    password_confirmation: ''
  }
});

const [password] = defineField('password');
const [password_confirmation] = defineField('password_confirmation');

const submit = handleSubmit((values) => {
  console.log(values);
});
</script>
<style scoped lang="scss">
.verification {
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
      line-height: 20px;
      font-weight: 400;
      font-size: 16px;
    }
    &-link {
      line-height: 20px;
      text-decoration: underline;
      font-weight: 400;
      font-size: 16px;
    }
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
