<template>
  <article
    ref="dashboardItem"
    class="dashboard-role-card"
    :class="{
      'dashboard-role-card_lightning': !isOutside
    }"
  >
    <div class="dashboard-role-card__role">
      <h3 class="dashboard-role-card__role-title">Вы - Заказчик</h3>
      <shared-button-ghost
        width="220px"
        height="30px"
        font-size="14px"
        font-weight="500"
        :disabled="isDisabled"
        @click="roleSwitcher('performer')"
      >
        Войти как исполнитель
      </shared-button-ghost>
      <img
        src="/assets/images/dashboard/role-customer.png"
        alt="customer"
        class="dashboard-role-card__role-img"
      />
    </div>
    <span class="dashboard-role-card__separator" />
    <div class="dashboard-role-card__subscribe" />
  </article>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';
import { AuthUser } from '~/utils/api';
const userData = useUserData();
const isDisabled = ref(false);
const { clearToken, statesRefresh } = useStore();
const roleSwitcher = async (role) => {
  userData.value.role = role;
  const { data, error } = await AuthUser.setRole(role);

  if (data.value) {
    isDisabled.value = false;
  } else if (error.value) {
    if (error.value.statusCode === 401) {
      statesRefresh();
      clearToken();
      userData.value = null;
      await router.push('/auth/login');
    }
    isDisabled.value = false;
  }
};

const dashboardItem = ref();
const gradientX = ref();
const gradientY = ref();

const { elementX, elementY, isOutside } = useMouseInElement(dashboardItem);
watch([elementX, elementY], () => {
  if (!isOutside.value) {
    gradientX.value = elementX.value + 'px';
    gradientY.value = elementY.value + 'px';
  }
});
</script>

<style scoped lang="scss">
.dashboard-role-card {
  @apply flex;
  grid-area: role;
  padding: 0 40px;
  gap: 35px;
  background: $bg-black-block;
  border: 1px solid $border-block;
  border-radius: $border-radius-m;
  &__role {
    @apply relative;
    width: 380px;
    padding: 32px 0;
  }
  &__role-title {
    font-size: 20px;
    line-height: 14px;
    font-weight: 600;
    margin-bottom: 25px;
  }
  &__role-img {
    @apply absolute bottom-0 right-0;
  }
  &__separator {
    @apply self-center;
    width: 1px;
    height: 110px;
    background: $border-block;
  }
  &__subscribe {
    @apply relative;
    padding: 32px 0;
    min-width: 385px;
  }
  &__subscribe-title {
    font-size: 20px;
    line-height: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  &__gradient-title {
    @include gradient-text($base-font, 20px, 600, 14px);
  }
  &__text {
    font-size: 14px;
    color: $white;
    margin-bottom: 4px;
  }
  &__card-img {
    @apply absolute bottom-0 right-0;
  }
  &_lightning {
    background: radial-gradient(
        circle at v-bind(gradientX) v-bind(gradientY),
        $radial-glow-start 0,
        $radial-glow-end 420px
      ),
      $bg-inputs;
  }
}
</style>
