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
          Подтвердить
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
      font-weight: 400;
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
  &__send {
    line-height: 20px;
    text-decoration: underline;
    font-weight: 400;
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
