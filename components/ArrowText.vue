<template>
  <span
    class="arrow-text"
    :class="{
      'arrow-text__base': fontFamily === 'base',
      'arrow-text__title': fontFamily === 'title',
      'arrow-text__logo': fontFamily === 'logo'
    }"
  >
    <slot />
  </span>
</template>

<script setup>
defineProps({
  fontSize: { type: String, required: true },
  fontWeight: { type: String, required: true },
  fontFamily: { type: String, default: 'base' }
});
</script>

<style lang="scss">
.arrow-text {
  @apply flex items-center;
  gap: 10px;
  font-size: calcWidth(18);
  font-weight: v-bind(fontWeight);
  &:after {
    content: url('assets/icons/arrow.svg');
    transform: rotate(-90deg);
  }
  &__base {
    font-family: $base-font;
  }
  &__title {
    font-family: $title-font;
  }
  &__logo {
    font-family: $logo-font;
  }
  @media screen and ($media-lg-query) {
    font-size: calculateVw768(18);
  }
}
</style>
