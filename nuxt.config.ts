// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [{ src: '~/plugins/ysmartcaptcha.js', mode: 'client' }],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'CONTRACTIS'
    }
  },
  devtools: { enabled: true },
  css: ['@/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/common" as *; '
        }
      }
    }
  },
  components: [
    {
      path: '~/components'
    }
  ],
  modules: [
    '@vueuse/nuxt',
    'nuxt-svgo',
    'nuxt-swiper',
    '@nuxtjs/eslint-module',
    '@nuxt/ui',
    '@vee-validate/nuxt',
    '@nuxtjs/i18n'
  ],
  svgo: {
    defaultImport: 'component'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage'
    }
  },
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang'
    }
  }
});
