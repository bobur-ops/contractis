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
    <role-select v-if="isVerified" />
  </div>
</template>

<script setup>
import { AuthUser } from '~/utils/api';

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

const isVerified = ref(false);
const { query } = useRoute();
const [codeValue] = defineField('codeValue');
const [agree] = defineField('agree');
const submit = handleSubmit(async (values) => {
  values.codeValue.length !== 6
    ? setErrors({ codeValue: 'Заполните все поля' })
    : setErrors({ codeValue: null });
  values.agree
    ? setErrors({ agree: null })
    : setErrors({ agree: 'Для продолжения необходимо согласие' });

  if (!errors.value.agree && !errors.value.codeValue && query.userId) {
    const { error, response } = await AuthUser.verification(
      query.userId,
      values.codeValue
    );
    if (response.value.status === 200) {
      isVerified.value = true;
    } else if (error.value) {
      console.log(error.value);
    }
    console.log(values);
  }
});
</script>
<style scoped lang="scss">
.verification {
  width: pxToRem(392);
  margin: pxToRem(35);
  @media screen and ($media-md-query) {
    @apply w-full;
    margin: 0;
  }
  &__info {
    @apply flex flex-col;
    margin-bottom: pxToRem(30);
    gap: pxToRem(30);
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
      line-height: pxToRem(20);
      font-weight: 400;
      font-size: pxToRem(16);
      @media screen and ($media-md-query) {
        font-size: pxToRem(14);
      }
    }
    &-subtext {
      color: rgba($color: #fff, $alpha: 0.6);
      line-height: pxToRem(20);
      font-weight: 300;
      font-size: pxToRem(16);
      @media screen and ($media-md-query) {
        font-size: pxToRem(14);
      }
    }
    &-link {
      line-height: pxToRem(20);
      text-decoration: underline;
      font-weight: 400;
      font-size: pxToRem(16);
    }
  }
  &__send {
    line-height: pxToRem(20);
    text-decoration: underline;
    font-weight: 300;
    font-size: pxToRem(16);
    float: right;
    color: rgba($color: #fff, $alpha: 0.9);
    @media screen and ($media-md-query) {
      font-size: pxToRem(14);
    }
  }
  &__name {
    line-height: pxToRem(36);
    font-family: $base-font;
    font-weight: 500;
    color: rgba($color: #fff, $alpha: 0.85);
    font-size: pxToRem(30);
    @media screen and ($media-md-query) {
      font-size: pxToRem(24);
    }
  }
}
</style>
