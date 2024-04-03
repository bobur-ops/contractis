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
          <arrow-text font-size="15px" font-weight="400"> Войти </arrow-text>
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
  /* height: calcHeight(119px); */
  height: calcHeight(119px);
  background: linear-gradient(180deg, #000 29.5%, rgba(0, 0, 0, 0) 100%);
  padding: 0 calcWidth(15);
  top: 0;
  &-nav {
    @apply flex;
    gap: $space-x-big-plus;
  }
  &-actions {
    @apply flex h-full justify-center items-center;
    font-family: $base-font;
    color: $white;
    font-size: calcWidth(18);
    font-weight: 500;
    gap: $space-medium-plus;
    @media screen and ($media-lg-query) {
      @apply hidden;
    }
    &__link {
      /* height: 29px; */
      opacity: 0.9;
      font-size: calcWidth(15);
    }
  }
  &-wrapper {
    @apply flex justify-between items-center;
    padding-bottom: calcWidth(8);
    background: url('assets/icons/Header/Line.svg') no-repeat bottom
      calcWidth(13) left;
    /* background: url('assets/icons/Header/Line.svg') no-repeat bottom
      calcHeight(10px, var(--step)) left; */
    @media screen and ($media-lg-query) {
      background: none;
    }
  }
  &__logo {
    height: calcWidth(30);
    @media screen and ($media-lg-query) {
      height: calculateVw768(30);
    }
  }
}
</style>
