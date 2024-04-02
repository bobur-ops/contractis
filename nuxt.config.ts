// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
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
    'nuxt-icon'
  ],
  svgo: {
    defaultImport: 'component'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
});
