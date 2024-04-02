<template>
  <menu class="menu">
    <li v-for="item in NavItems" :key="item.id" class="menu__item">
      <a href="#">{{ item.name }}</a>
    </li>
  </menu>
</template>

<script setup>
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

<style scoped lang="scss">
.menu {
  display: none;
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

@media screen and ($media-lg-query) {
  .menu {
    @apply flex;
  }
}
</style>
