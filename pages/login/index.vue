<template>
  <div class="login">
    <div class="login__info">
      <h1 class="login__name">Авторизация</h1>
      <ul class="login__redirect">
        <li class="login__redirect-question">Еще нет аккаунта?</li>
        <li class="login__redirect-link">
          <nuxt-link to="/signup">Создать аккаунт</nuxt-link>
        </li>
      </ul>
    </div>
    <form-base class="login__form">
      <template #labels>
        <form-field
          id="1"
          placeholder="Введите e-mail"
          label="E-mail"
          type="text"
        />
        <form-field
          id="2"
          placeholder="Введите пароль"
          label="Пароль"
          type="password"
          error="Неверный логин или пароль"
        />
        <form-captcha id="3" label="Я не робот" gap="15px" />
        <div class="login__form-references">
          <form-checkbox id="4" gap="10px"> Запомнить меня </form-checkbox>
          <nuxt-link
            to="/login/recovery"
            class="login__redirect-link login__redirect-link_mod"
          >
            Забыл пароль ?
          </nuxt-link>
        </div>
      </template>
      <template #buttons>
        <button-gradient-blue name="Войти" class="login__button" @click.prevent>
          <arrow-text>Войти</arrow-text>
        </button-gradient-blue>
        <another-auth text="или" />
      </template>
    </form-base>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
});
</script>
<style scoped lang="scss">
.login {
  width: calcHeight(450px);
  margin: calcHeight(35px);
  &__info {
    @apply flex flex-col;
    margin-bottom: calcHeight(36px);
    gap: calcHeight(28px);
  }
  &__form {
    &-references {
      @apply flex justify-between w-full;
      color: $gray;
      font-weight: 500;
    }
  }
  &__redirect {
    @apply flex;
    justify-content: space-between;
    color: $white;
    gap: calcHeight(30px);
    font-size: calcHeight(20px);
    &-question {
      color: $gray;
      line-height: calcHeight(15px);
      height: calcHeight(15px);
      font-weight: 300;
      font-size: calcHeight(16px);
    }
    &-link {
      line-height: calcHeight(15px);
      height: calcHeight(15px);
      text-decoration: underline;
      font-weight: 300;
      font-size: calcHeight(16px);
      &_mod {
        line-height: calcHeight(24px);
        font-size: calcHeight(16px);
        font-weight: 300;
      }
    }
  }
  &__name {
    line-height: calcHeight(36px);
    font-family: $base-font;
    font-weight: 500;
    height: calcHeight(32px);
    color: white;
    font-size: calcHeight(30px);
  }
}
</style>
