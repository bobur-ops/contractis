<template>
  <div
    class="absolute sidebar lg:hidden left-0 top-0 w-screen h-screen z-10 bg-black/85 transition-all duration-300 ease-in-out"
    style="backdrop-filter: blur(10px)"
    :class="{ open: open }"
  >
    <div class="text-white p-10 relative">
      <div
        class="absolute top-4 right-4 cursor-pointer"
        @click="emits('close-sidebar')"
      >
        <Icon name="material-symbols-light:close-small-outline" size="36" />
      </div>
      <div class="">
        <menu class="menu">
          <li v-for="item in NavItems" :key="item.id" class="menu__item">
            <a href="#">{{ item.name }}</a>
          </li>
        </menu>
        <div class="mt-2 space-y-4">
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
          <div class="w-fit">
            <app-header-lang-select class="header-actions__select" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['close-sidebar']);

const NavItems = ref([
  {
    id: 1,
    name: 'Биржа заказов'
  },
  {
    id: 2,
    name: 'О сервисе'
  },
  {
    id: 3,
    name: 'Исполнители'
  },
  {
    id: 4,
    name: 'Новости'
  },
  {
    id: 5,
    name: 'Тарифы'
  }
]);
</script>
<style lang="scss" scoped>
.sidebar {
  transform: translateX(100vw);
  &.open {
    transform: translateX(0);
  }
}

.menu {
  gap: $space-x-large-plus;
  &__item {
    color: $white;
    font-family: $base-font;
    height: 29px;
    font-size: 15px;
    font-weight: 500;
    line-height: 150%;
    @media screen and ($media-xl-query) {
      /* font-size: 22px; */
    }
    a {
      white-space: nowrap;
    }
  }
}
</style>
