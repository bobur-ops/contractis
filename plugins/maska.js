import { vMaska } from 'maska';

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('maska', vMaska);
});
