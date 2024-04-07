<template>
  <menu class="menu">
    <nuxt-link
      v-for="item in NavItems"
      :key="item.id"
      :to="item.link"
      class="menu__item"
      :class="{
        menu__item_selected: item.link === route.path
      }"
    >
      {{ item.name }}
    </nuxt-link>
  </menu>
</template>

<script setup>
import { NavItems } from '../model';
const route = useRoute();
</script>

<style scoped lang="scss">
.menu {
  @apply flex justify-between;
  @media screen and ($media-lg-query) {
    @apply hidden;
  }
  min-width: calcWidth(591);
  /* min-width: 591px; */
  &__item {
    color: white;
    opacity: 90;
    letter-spacing: 0%;
    font-family: $base-font;
    font-size: calcWidth(15);
    font-weight: 400;
    /* line-height: 15px; */
    &:hover {
      color: $gray-70;
      transition: 0.1s;
    }
    &_selected {
      @include gradient-text($base-font, calcWidth(15), 500, calcWidth(15));
    }
  }
}
</style>
