<template>
  <div class="another-auth">
    <div class="another-auth__line"></div>
    <span class="another-auth__text">{{ text }}</span>
    <div class="another-auth__line"></div>
  </div>
  <div class="another-auth__socials">
    <img
      src="assets/images/social-networks/VK.png"
      alt="VK"
      class="another-auth__socials-item"
    />
    <img
      src="assets/images/social-networks/Yandex.png"
      alt="Yandex"
      class="another-auth__socials-item"
    />
    <img
      src="assets/images/social-networks/Google.png"
      alt="Google"
      class="another-auth__socials-item"
    />
    <img
      src="assets/images/social-networks/Telegram.png"
      alt="Telegram"
      class="another-auth__socials-item"
    />
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  }
});
</script>

<style scoped lang="scss">
.another-auth {
  @apply inline-flex w-full items-center;
  margin: calcHeight(20px) 0;
  gap: 3px;
  &__socials {
    @apply flex;
    width: calcHeight(90px);
    height: calcHeight(49px);
    gap: calcHeight(30px);
  }
  &__line {
    @apply w-full inline-block;
    height: 1px;
    background: $white;
  }
  &__text {
    font-family: $base-font;
    font-size: calcHeight(18px);
    font-weight: 400;
  }
}
</style>
