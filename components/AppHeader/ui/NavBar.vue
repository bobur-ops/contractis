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
  min-width: 36.9375rem;
  @media screen and ($media-md-query) {
    @apply hidden;
  }
  &__item {
    color: rgba($color: #fff, $alpha: 0.9);
    font-family: $base-font;
    font-size: pxToRem(15);
    font-weight: 400;
    line-height: 0.9375rem;
    &:hover {
      color: $gray-70;
      transition: 0.1s;
    }
    &_selected {
      @include gradient-text($base-font, 0.9rem, 500, 0.9rem);
    }
  }
}
</style>
