<template>
  <header class="header">
    <section class="header-wrapper container">
      <article class="header-nav">
        <nuxt-link to="/">
          <svgo-logo class="header__logo" />
        </nuxt-link>
        <app-header-nav-bar />
      </article>
      <article class="header-actions">
        <nuxt-link to="/signup" class="header-actions__link"
          >Регистрация</nuxt-link
        >
        <button-ghost
          width="125px"
          height="38px"
          font-size="15px"
          font-weight="500"
          @click="ToLogin"
        >
          <arrow-text font-size="15px" font-weight="500"> Войти </arrow-text>
        </button-ghost>
        <app-header-lang-select class="header-actions__select" />
      </article>
      <article class="lg:hidden">
        <nuxt-icon
          name="burger"
          class="text-white/60 hover:text-white cursor-pointer transition-all"
          @click="emits('open-sidebar')"
        />
      </article>
    </section>
  </header>
</template>

<script setup>
const router = useRouter();
const ToLogin = () => {
  router.push('/login');
};

const emits = defineEmits(['open-sidebar']);
</script>

<style scoped lang="scss">
.header {
  @apply sticky w-full flex justify-center;
  height: calcHeight(119px);
  background: linear-gradient(180deg, #000 29.5%, rgba(0, 0, 0, 0) 100%);
  padding: 0 15px;
  @media screen and ($media-sm-query) {
    padding: 0 50px;
  }
  top: 0;
  &-nav {
    @apply flex;
    gap: $space-x-big-plus;
  }
  &-actions {
    display: none;
    font-family: $base-font;
    color: $white;
    font-size: 15px;
    font-weight: 500;
    gap: $space-medium-plus;
    &__link {
      height: 29px;
    }
    @media screen and ($media-lg-query) {
      @apply flex h-full justify-center items-center;
    }
  }
  &-wrapper {
    @apply flex justify-between items-center;
    padding-bottom: calcHeight(8px);
    @media screen and ($media-lg-query) {
      background: url('assets/icons/Header/Line.svg') no-repeat bottom
        calcHeight(10px, var(--step)) left;
    }
  }
  &__logo {
    @media screen and ($media-md-query) {
      height: 28px;
    }
    height: 15px;
  }
}
</style>
