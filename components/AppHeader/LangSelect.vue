<template>
  <div class="lang-select">
    <div class="lang-select__wrapper">
      <img
        class="lang-select__image"
        alt="rus"
        src="assets/images/header/rus.png"
      />
      <span class="lang-select__name"> Rus </span>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.lang-select {
  @apply flex h-full justify-center;
  &__wrapper {
    @apply flex items-center;
    gap: 10px;
    &:after {
      content: url('assets/icons/arrow.svg');
      height: 26px;
      margin-left: $space-smaller;
    }
  }
  &__name {
    line-height: 150%;
    /* height: 26px; */
    height: calcWidth(26);
  }
  &__image {
    /* width: 34px;
    height: 24px; */
    width: calcWidth(34);
    height: calcWidth(24);
    margin-left: 7px;
  }
}
</style>
