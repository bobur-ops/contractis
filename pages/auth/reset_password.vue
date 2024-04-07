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
      /* color: $gray; */
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
    &-link {
      line-height: calcWidth(20);
      text-decoration: underline;
      font-weight: 400;
      font-size: calcWidth(16);
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(16);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(13);
      }
    }
  }
  &__name {
    line-height: calcWidth(36);
    font-family: $base-font;
    font-weight: 500;
    color: rgba($color: #fff, $alpha: 0.85);
    font-size: calcWidth(30);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(30);
      line-height: calculateVw768(36);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(24);
      line-height: calculateVw425(28);
    }
  }
}
</style>
