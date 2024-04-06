<template>
  <aside class="app-menu">
    <div class="app-menu__inner">
      <svgo-menu-home
        class="app-menu__icon"
        :class="{ 'app-menu__icon_active': currentSlide === 1 && isDashboard }"
        @click="switchSlide(1)"
      />
      <svgo-menu-order
        class="app-menu__icon"
        :class="{ 'app-menu__icon_active': currentSlide === 2 && isDashboard }"
        @click="switchSlide(2)"
      />
      <svgo-menu-casino
        class="app-menu__icon"
        :class="{ 'app-menu__icon_active': currentSlide === 3 && isDashboard }"
        @click="switchSlide(3)"
      />
      <svgo-menu-profile
        class="app-menu__icon"
        :class="{ 'app-menu__icon_active': currentSlide === 4 && isDashboard }"
        @click="switchSlide(4)"
      />
    </div>
  </aside>
</template>

<script setup>
const { currentSlide } = useDashboard();
const route = useRoute();
const router = useRouter();

const isDashboard = computed(() => route.path === '/dashboard');
const switchSlide = (slide) => {
  currentSlide.value = slide;
  if (route.path !== '/dashboard') {
    router.push('/dashboard');
  }
};
</script>

<style scoped lang="scss">
.app-menu {
  @apply fixed top-1/2 flex justify-center items-start;
  z-index: $z-index-3;
  left: 20px;
  width: 65px;
  min-height: 390px;
  padding: 20px 0;
  border-radius: $border-radius-l;
  background: $gray-05;
  transform: translateY(-50%);
  &__inner {
    @apply w-full h-full flex flex-col justify-center items-center;
    gap: $space-medium;
  }
  &__icon {
    width: 45px;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s;
    &_active {
      opacity: 1;
    }
  }
}
</style>
