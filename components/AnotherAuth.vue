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
  margin: calcWidth(27) 0;
  gap: calcWidth(6);
  @media screen and ($media-lg-query) {
    margin: calculateVw768(27) 0;
    gap: calculateVw768(6);
  }
  @media screen and ($media-md-query) {
    margin: calculateVw425(27) 0;
    gap: calculateVw425(6);
  }
  &__text {
    font-size: calcWidth(18);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(18);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(18);
    }
  }
  &__socials {
    @apply flex justify-between;
    &-item {
      width: calcWidth(79);
      height: calcWidth(42);
      cursor: pointer;
      @media screen and ($media-lg-query) {
        width: calculateVw768(79);
        height: calculateVw768(42);
      }
      @media screen and ($media-md-query) {
        width: calculateVw425(79);
        height: calculateVw425(42);
      }
      &_tg {
        @apply relative;
        background: url('assets/images/social-networks/Telegram.png');
        background-size: calcWidth(79) calcWidth(42);
        overflow: hidden;
        border-radius: calcWidth(11);
        cursor: pointer;
        @media screen and ($media-lg-query) {
          background-size: calculateVw768(79) calculateVw768(42);
          border-radius: calculateVw768(11);
        }
        @media screen and ($media-md-query) {
          background-size: calculateVw425(79) calculateVw425(42);
          border-radius: calculateVw425(11);
        }
      }
    }
  }
  &__line {
    @apply w-full inline-block;
    height: calcWidth(1);
    background: $white;
    @media screen and ($media-lg-query) {
      height: calculateVw768(1);
    }
    @media screen and ($media-md-query) {
      height: calculateVw425(1);
    }
  }
  &__text {
    line-height: calcWidth(13);
    font-family: $base-font;
    font-size: calcWidth(16);
    font-weight: 400;
    @media screen and ($media-lg-query) {
      line-height: calculateVw768(13);
      font-size: calculateVw768(16);
    }
  }
}
</style>
