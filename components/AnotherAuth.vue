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
      @click="toVK"
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
      @click="toGoogle"
    />
    <div class="another-auth__socials-item another-auth__socials-item_tg">
      <component
        :is="'script'"
        async
        src="https://telegram.org/js/telegram-widget.js"
        data-telegram-login="contractis_ro_bot"
        data-size="large"
        data-userpic="false"
        data-auth-url="https://dev.contractis.ru/api/tg/auth/callback"
        data-request-access="write"
      ></component>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  }
});
const toVK = () => {
  window.location.href = `https://dev.contractis.ru/api/vk/auth/`;
};
const toGoogle = () => {
  window.location.href = `https://dev.contractis.ru/api/gmail/auth/`;
};
</script>

<style scoped lang="scss">
.another-auth {
  @apply inline-flex w-full items-center;
  margin: 27px 0;
  gap: 6px;
  &__socials {
    @apply flex justify-between;
    &-item {
      width: 79px;
      height: 42.5px;
      cursor: pointer;
      &_tg {
        @apply relative;
        background: url('assets/images/social-networks/Telegram.png');
        background-size: 79px 42.5px;
        overflow: hidden;
        border-radius: 11px;
        cursor: pointer;
      }
    }
  }
  &__line {
    @apply w-full inline-block;
    height: 1px;
    background: $white;
  }
  &__text {
    line-height: 13px;
    font-family: $base-font;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
