import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('fancybox', Fancybox);
});
