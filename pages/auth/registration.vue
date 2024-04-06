<template>
  <div class="registration">
    <div class="registration__info">
      <h1 class="registration__name">Регистрация</h1>
      <ul class="registration__redirect">
        <li class="registration__redirect-question">Уже есть аккаунт?</li>
        <li class="registration__redirect-link">
          <nuxt-link to="/auth/login">Авторизоваться</nuxt-link>
        </li>
      </ul>
    </div>
    <form-registration @register-user="registerUser" />
    <role-select v-if="isRegister" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'user'
});
const isRegister = ref(false);
const registerUser = () => {
  isRegister.value = true;
};
</script>
<style scoped lang="scss">
.registration {
  width: 392px;
  margin: 36px 40px;
  &__info {
    @apply flex flex-col;
    margin-bottom: 30px;
    gap: 30px;
  }
  &__redirect {
    @apply flex;
    color: $white;
    gap: 30px;
    font-size: 16px;
    &-question {
      color: $gray;
      line-height: 15px;
      font-weight: 400;
    }
    &-link {
      line-height: 15px;
      text-decoration: underline;
      font-weight: 400;
    }
  }
  &__name {
    line-height: 26px;
    font-family: $base-font;
    font-weight: 600;
    color: white;
    font-size: 36px;
  }
}
</style>
