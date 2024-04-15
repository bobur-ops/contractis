<template>
  <section v-if="userData || true" class="dashboard">
    <div class="dashboard__inner container">
      <div class="dashboard__title">
        <div class="dashboard__title-mark" />
        <h1 class="dashboard__title-text">
          {{ title }}
        </h1>
      </div>
      <transition name="slide-fade">
        <!-- <DashboardUiSlideProfile /> -->
        <component :is="currentComponent" />
      </transition>
    </div>
  </section>
</template>

<script setup>
// TODO разделить на отдельные страницы
definePageMeta({
  layout: 'menu',
  middleware: ['auth', 'filters']
});
const userData = useUserData();
const components = {
  home: resolveComponent('DashboardUiSlideHome'),
  orders: resolveComponent('DashboardUiSlideOrders'),
  casino: resolveComponent('DashboardUiSlideCasino'),
  profile: resolveComponent('DashboardUiSlideProfile')
};

const currentComponent = shallowRef('DashboardUiSlideHome');

const { currentSlide } = useDashboard();

const title = computed(() => {
  switch (currentSlide.value) {
    case 1:
      currentComponent.value = components.home;
      return 'Dashboard';
    case 2:
      currentComponent.value = components.orders;
      return 'Ваши заказы';
    case 3:
      currentComponent.value = components.casino;
      return 'Бонусы';
    case 4:
      currentComponent.value = components.profile;
      if (userData.value?.user.lastName)
        return `${userData.value?.user.firstName} ${userData.value?.user.lastName}`;
      else return userData.value?.user.firstName;
  }
});
</script>

<style scoped lang="scss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
  @apply fixed;
}

.slide-fade-enter-from {
  transform: translateX(-50px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translatex(50px);
  opacity: 0;
}

.dashboard {
  @apply flex items-center w-full h-full flex-col-reverse;
  padding-top: calcHeight(35px);
  &__inner {
    @apply w-full h-full;
  }
  &__title {
    @apply flex items-end;
    gap: $space-small;
    margin-bottom: calcHeight(35px);
    &-text {
      font-size: 30px;
      line-height: 21px;
      font-weight: 600;
    }
    &-mark {
      @include h1-gradient-mark;
      margin-bottom: 2px;
    }
  }
}
</style>
