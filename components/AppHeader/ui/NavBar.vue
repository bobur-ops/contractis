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
  &__item {
    color: $white;
    font-family: $base-font;
    font-size: 0.9rem;
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
