<template>
  <div class="login">
    <div class="login__info">
      <h1 class="login__name">Авторизация</h1>
      <ul class="login__redirect">
        <li class="login__redirect-question">Нет аккаунта?</li>
        <li class="login__redirect-link">
          <nuxt-link class="login__redirect-link" to="/auth/registration">
            Создать аккаунт
          </nuxt-link>
        </li>
      </ul>
    </div>
    <form-login />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'user'
});
</script>
<style scoped lang="scss">
.login {
  width: 392px;
  margin: 36px 40px;

  &__info {
    @apply flex flex-col;
    margin-bottom: 30px;
    gap: 30px;
  }

  &__form {
    &-references {
      margin: 15px 0 0 0;
      @apply flex justify-between w-full;
      color: $gray;
      font-weight: 500;
    }
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

      &_mod {
        font-weight: 500;
        line-height: 24px;
        font-size: 16px;
      }
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
