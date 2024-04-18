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
    <form-registration />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'user'
});
</script>
<style scoped lang="scss">
.registration {
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
  &__redirect {
    @apply flex justify-between;
    &-question {
      color: rgba($color: #fff, $alpha: 0.6);
      line-height: pxToRem(15);
      font-weight: 300;
      font-size: pxToRem(16);
      @media screen and ($media-md-query) {
        font-size: pxToRem(14);
      }
    }
    &-link {
      line-height: pxToRem(15);
      text-decoration: underline;
      font-weight: 300;
      font-size: pxToRem(16);
      color: rgba($color: #fff, $alpha: 0.9);
      @media screen and ($media-md-query) {
        font-size: pxToRem(14);
      }
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
