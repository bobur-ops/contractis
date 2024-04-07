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
  width: calcWidth(392);
  margin: calcWidth(36) calcWidth(40);
  @media screen and ($media-lg-query) {
    width: unset;
    margin: 0;
    /* width: calculateVw768(392); */
    /* margin: calculateVw768(36) calculateVw768(40); */
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
  &__redirect {
    @apply flex justify-between;
    color: rgba($color: #fff, $alpha: 0.9);
    gap: calcWidth(30);
    font-size: calcWidth(16);
    @media screen and ($media-lg-query) {
      gap: calculateVw768(30);
      font-size: calculateVw768(16);
    }
    @media screen and ($media-md-query) {
      gap: calculateVw425(30);
      font-size: calculateVw425(14);
    }
    &-question {
      color: rgba($color: #fff, $alpha: 0.6);
      /* color: $gray; */
      line-height: calcWidth(15);
      font-weight: 400;
      font-size: calcWidth(16);
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(16);
        line-height: calculateVw768(15);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(14);
        line-height: calculateVw425(15);
      }
    }
    &-link {
      line-height: calcWidth(15);
      text-decoration: underline;
      font-weight: 400;
      color: rgba($color: #fff, $alpha: 0.9);
      @media screen and ($media-lg-query) {
        line-height: calculateVw768(15);
      }
      @media screen and ($media-md-query) {
        line-height: calculateVw425(15);
      }
    }
  }
  &__name {
    line-height: calcWidth(26);
    font-family: $base-font;
    font-weight: 500;
    color: white;
    font-size: calcWidth(36);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(36);
      line-height: calculateVw768(26);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(24);
      line-height: calculateVw425(26);
    }
  }
}
</style>
