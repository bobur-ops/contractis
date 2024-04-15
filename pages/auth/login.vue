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
  width: pxToRem(392);
  margin: pxToRem(36) pxToRem(40);

  &__info {
    @apply flex flex-col;
    margin-bottom: pxToRem(30);
    gap: pxToRem(30);
  }

  &__form {
    &-references {
      margin: pxToRem(15) 0 0 0;
      @apply flex justify-between w-full;
      color: $gray;
      font-weight: 500;
    }
  }

  &__redirect {
    @apply flex justify-between;
    font-size: pxToRem(16);

    &-question {
      color: rgba($color: #fff, $alpha: 0.6);
      line-height: pxToRem(15);
      font-weight: 300;
    }

    &-link {
      line-height: pxToRem(15);
      text-decoration: underline;
      font-weight: 300;
      font-size: pxToRem(16);
      color: rgba($color: #fff, $alpha: 0.9);

      &_mod {
        font-weight: 500;
        line-height: pxToRem(24);
        font-size: pxToRem(16);
      }
    }
  }

  &__name {
    line-height: pxToRem(26);
    font-family: $base-font;
    font-weight: 500;
    color: rgba($color: #fff, $alpha: 0.85);
    font-size: pxToRem(30);
  }
}
</style>
