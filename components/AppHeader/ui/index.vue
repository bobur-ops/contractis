<template>
  <header class="header">
    <section class="header-inner container">
      <article class="header-nav">
        <nuxt-link to="/">
          <svgo-logo class="header__logo" />
        </nuxt-link>
        <app-header-ui-nav-bar />
      </article>
      <article v-if="!userData" class="header-actions">
        <nuxt-link to="/auth/registration" class="header-actions__link">
          Регистрация
        </nuxt-link>
        <shared-button-ghost size="small" @click="ToLogin">
          Войти
        </shared-button-ghost>
        <app-header-ui-lang-select
          class="header-actions__select"
          :lang-list="langSelect"
        />
        <div class="header-actions__theme">
          <svgo-sun class="header-actions__icon w-[28px] h-[16px]" />
        </div>
      </article>
      <article v-else-if="userData" class="header-actions">
        <svgo-notification-avail class="header-actions__notifications" />
        <app-header-ui-user-card :user-data="userData" />
        <app-header-ui-lang-select
          class="header-actions__select"
          :lang-list="langSelect"
        />
        <div class="header-actions__theme">
          <svgo-sun class="header-actions__icon w-[28px] h-[16px]" />
        </div>
      </article>

      <article class="md:hidden">
        <svgo-burger
          class="w-[28px] h-[16px] cursor-pointer"
          @click="() => {}"
        />
      </article>
    </section>
  </header>
</template>

<script setup>
import { langSelect } from '~/components/AppHeader/model/index.js';
const userData = useUserData();

const router = useRouter();
const ToLogin = () => {
  router.push('/auth/login');
};
</script>

<style scoped lang="scss">
.header {
  @apply sticky w-full flex justify-center;
  height: 5.625rem;
  /* height: 90px; */
  background: linear-gradient(180deg, #000 29.5%, rgba(0, 0, 0, 0) 100%);
  top: 0;
  z-index: $z-index-3;
  @media screen and ($media-md-query) {
    @apply justify-between;
  }
  &-nav {
    @apply flex items-start;
    gap: $space-x-large-plus;
    padding-bottom: 2.0625rem;
    @media screen and ($media-md-query) {
      padding-bottom: 0;
    }
  }
  &-actions {
    @apply flex  justify-center items-center self-center;
    font-family: $base-font;
    height: 2.375rem;
    color: $white;
    font-size: 0.9rem;
    font-weight: 500;
    gap: 1.5rem;
    &__notifications {
      width: pxToRem(26);
    }
    &__link {
      line-height: 10px;
      font-size: pxToRem(15);
      color: rgba($color: #fff, $alpha: 0.9);
      &:hover {
        color: $gray-70;
        transition: 0.1s;
      }
    }
    &__theme {
      width: pxToRem(24);
      height: pxToRem(24);
      display: flex;
      justify-content: center;
      align-items: center;
      @media screen and ($media-md-query) {
        @apply hidden;
      }
    }
    @media screen and ($media-md-query) {
      @apply hidden;
    }
  }
  &-inner {
    @apply flex justify-between items-end;
    background: url('assets/icons/Header/Line.svg') no-repeat bottom 7px left;
    background-size: pxToRem(821);
    @media screen and ($media-md-query) {
      @apply items-center;
      background: none;
    }
  }
  &__logo {
    line-height: 20px;
    /* width: 180px; */
    width: pxToRem(180);
    @media screen and ($media-md-query) {
      width: pxToRem(136);
    }
  }
}
</style>
