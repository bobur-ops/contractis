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
  width: calcWidth(392);
  margin: calcWidth(36) calcWidth(40);
  @media screen and ($media-lg-query) {
    width: auto;
    margin: 0;
  }
  &__info {
    @apply flex flex-col;
    margin-bottom: calcWidth(30);
    gap: calcWidth(30);
    @media screen and ($media-lg-query) {
      margin-bottom: calculateVw768(30);
      gap: calculateVw768(30);
    }
    @media screen and ($media-md-query) {
      margin-bottom: calculateVw425(30);
      gap: calculateVw425(30);
    }
  }

  &__form {
    &-references {
      margin: calcWidth(15) 0 0 0;
      @apply flex justify-between w-full;
      color: $gray;
      font-weight: 500;
      @media screen and ($media-lg-query) {
        margin: calculateVw768(15) 0 0 0;
      }
      @media screen and ($media-md-query) {
        margin: calculateVw425(15) 0 0 0;
      }
    }
  }

  &__redirect {
    @apply flex justify-between;
    color: $white;
    font-size: calcWidth(16);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(16);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(14);
    }
    &-question {
      color: rgba($color: #fff, $alpha: 0.6);
      line-height: calcWidth(15);
      font-weight: 300;
      @media screen and ($media-lg-query) {
        line-height: calculateVw768(15);
      }
      @media screen and ($media-md-query) {
        line-height: calculateVw425(15);
      }
    }

    &-link {
      line-height: calcWidth(15);
      text-decoration: underline;
      font-weight: 300;
      color: rgba($color: #fff, $alpha: 0.9);
      @media screen and ($media-lg-query) {
        line-height: calculateVw768(15);
      }
      @media screen and ($media-md-query) {
        line-height: calculateVw425(15);
      }

      &_mod {
        font-weight: 500;
        line-height: calcWidth(24);
        font-size: calcWidth(16);
        @media screen and ($media-lg-query) {
          line-height: calculateVw768(24);
          font-size: calculateVw768(16);
        }
        @media screen and ($media-md-query) {
          line-height: calculateVw425(24);
          font-size: calculateVw425(16);
        }
      }
    }
  }

  &__name {
    /* line-height: calcWidth(26); */
    font-family: $base-font;
    font-weight: 500;
    color: rgba($color: #fff, $alpha: 0.85);
    font-size: calcWidth(30);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(30);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(24);
    }
  }
}
</style>
