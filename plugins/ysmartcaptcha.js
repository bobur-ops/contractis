import YSmartCaptcha from 'vue3-yandex-smartcaptcha';

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(YSmartCaptcha, {
    siteKey: 'ysc1_Zxj7cJubBrx6BxPAcOx4NJgjfEkUa6qmIZWosHfc84827e48',
    lang: 'ru'
  });
});
