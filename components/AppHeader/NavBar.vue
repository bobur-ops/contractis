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
  display: flex;
  /* gap: $space-x-large-plus; */
  gap: calcWidth(35);
  @media screen and ($media-lg-query) {
    @apply hidden;
  }
  &__item {
    color: $white;
    opacity: 0.9;
    /* letter-spacing: 0.75px; */
    font-family: $base-font;
    /* height: 29px; */
    font-size: calcWidth(15);
    font-weight: 400;
    line-height: 150%;
    a {
      white-space: nowrap;
    }
  }
}
</style>
