<template>
  <div v-if="socialName === 'Telegram'" class="social-link social-link_tg">
    <img
      src="assets/images/social-networks/Telegram.png"
      alt="Telegram"
      class="social-link__img social-link__img_tg"
    />
    <component
      :is="'script'"
      async
      src="https://telegram.org/js/telegram-widget.js"
      data-telegram-login="contractis_ro_bot"
      data-size="large"
      data-userpic="false"
      :data-auth-url="`https://dev.contractis.ru/api/tg/bind/callback?token=${userToken}`"
      data-request-access="write"
    >
    </component>
    <h3 class="social-link__title social-link__title_tg">Привязать</h3>
    <shared-button-arrow
      class="social-link__button_tg"
      height="39px"
      width="52px"
      arrow-width="19px"
    />
  </div>
  <div v-else class="social-link">
    <img
      v-if="socialName === 'VK'"
      src="assets/images/social-networks/VK.png"
      alt="VK"
      class="social-link__img"
    />
    <img
      v-else-if="socialName === 'Yandex'"
      src="assets/images/social-networks/Yandex.png"
      alt="Yandex"
      class="social-link__img"
    />
    <img
      v-else-if="socialName === 'Google'"
      src="assets/images/social-networks/Google.png"
      alt="Google"
      class="social-link__img"
    />
    <h3 class="social-link__title">Привязать</h3>
    <shared-button-arrow
      class="social-link__button"
      height="39px"
      width="52px"
      arrow-width="19px"
    />
  </div>
</template>

<script setup>
const { token: userToken } = useStore();
defineProps({
  socialName: { type: String, required: true }
});
</script>

<style scoped lang="scss">
.social-link {
  &_tg {
    @apply relative;
  }
  &_tg > #telegram-login-contractis_ro_bot {
    @apply justify-self-end;
  }
  @apply flex w-full items-center justify-between;
  outline: 1px solid $border-block;
  outline-offset: 4px;
  border-radius: $border-radius-s;
  &__title {
    font-size: 18px;
  }
  &__img {
    height: 47px;
  }
}
</style>
