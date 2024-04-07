<template>
  <header class="header">
    <section class="header-inner container">
      <img
        src="../../../assets/icons/Header/Line.svg"
        class="header-inner__svg--line"
      />
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
        <shared-button-ghost
          width="105px"
          height="38px"
          font-size="15px"
          font-weight="500"
          size="sm"
          @click="ToLogin"
        >
          Войти
        </shared-button-ghost>
        <app-header-ui-lang-select
          class="header-actions__select"
          :lang-list="langSelect"
        />
        <svgo-light class="header-actions__theme" />
      </article>
      <article v-else-if="userData" class="header-actions">
        <svgo-notification-avail class="header-actions__notifications" />
        <app-header-ui-user-card :user-data="userData" />
        <app-header-ui-lang-select
          class="header-actions__select"
          :lang-list="langSelect"
        />
        <svgo-light class="header-actions__theme" />
      </article>
      <article class="lg:hidden">
        <!-- <nuxt-icon
          name="burger"
          class="text-white/60 hover:text-white cursor-pointer transition-all"
          @click="emits('open-sidebar')"
        /> -->
        <svgo-burger
          class="w-[28px] h-[16px] cursor-pointer"
          @click="emits('open-sidebar')"
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

const emits = defineEmits(['open-sidebar']);
</script>

<style scoped lang="scss">
.header {
  @apply sticky w-full flex justify-center;
  height: calcWidth(90);
  background: linear-gradient(180deg, #000 29.5%, rgba(0, 0, 0, 0) 100%);
  top: 0;
  z-index: $z-index-3;
  @media screen and ($media-lg-query) {
    height: calculateVw768(90);
  }
  @media screen and ($media-md-query) {
    height: calculateVw425(90);
  }
  &-nav {
    @apply flex items-start;
    /* gap: $space-x-large-plus; */
    gap: calcWidth(60);
    /* padding-bottom: calcWidth(33); */
    @media screen and ($media-lg-query) {
      gap: calculateVw768(60);
    }
    @media screen and ($media-md-query) {
      gap: calculateVw425(60);
    }
  }
  &-actions {
    @apply flex h-full justify-center items-center self-center;
    font-family: $base-font;
    color: rgba($color: #fff, $alpha: 0.9);
    font-size: calcWidth(15);
    font-weight: 500;
    gap: $space-medium-plus;
    @media screen and ($media-lg-query) {
      @apply hidden;
    }
    &__notifications {
      width: calcWidth(26);
    }
    &__link {
      line-height: 10px;
      &:hover {
        color: $gray-70;
        transition: 0.1s;
      }
    }
    &__theme {
      width: calcWidth(24);
      height: calcWidth(24);
    }
  }
  &-inner {
    @apply flex justify-between items-center;
    /* background-size: 821px; */
    position: relative;
    /* background: url('assets/icons/Header/Line.svg') no-repeat bottom
      calcWidth(7) left; */
    @media screen and ($media-lg-query) {
      background: none;
    }
    &__svg--line {
      position: absolute;
      left: 0;
      bottom: calcWidth(10);
      width: calcWidth(821);
      height: calcWidth(14);
      @media screen and ($media-lg-query) {
        display: none;
      }
    }
  }
  &__logo {
    /* line-height: 20px; */
    width: calcWidth(180);

    @media screen and ($media-lg-query) {
      width: calculateVw768(180);
    }
    @media screen and ($media-md-query) {
      width: calculateVw425(180);
    }
  }
}
</style>
