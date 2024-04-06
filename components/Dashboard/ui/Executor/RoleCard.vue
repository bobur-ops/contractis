<template>
  <article
    ref="dashboardItem"
    class="dashboard-role-card"
    :class="{
      'dashboard-role-card_lightning': !isOutside
    }"
  >
    <div class="dashboard-role-card__role">
      <h3 class="dashboard-role-card__role-title">Вы - Исполнитель</h3>
      <shared-button-ghost
        width="190px"
        height="30px"
        font-size="14px"
        font-weight="500"
        :disabled="isDisabled"
        @click="roleSwitcher('client')"
      >
        Войти как заказчик
      </shared-button-ghost>
      <img
        src="/assets/images/dashboard/role-executor.png"
        alt="executor"
        class="dashboard-role-card__role-img"
      />
    </div>
    <span class="dashboard-role-card__separator" />
    <div class="dashboard-role-card__subscribe">
      <h3 class="dashboard-role-card__subscribe-title">
        Ваша подписка
        <span class="dashboard-role-card__gradient-title">активна!</span>
      </h3>
      <p class="dashboard-role-card__text">Действует до 30 июля 2024 г.</p>
      <shared-arrow-text-animate font-size="16px" font-weight="400">
        Продлить
      </shared-arrow-text-animate>
      <img
        src="/assets/images/dashboard/cards.png"
        alt="cards"
        class="dashboard-role-card__card-img"
      />
    </div>
  </article>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';
import { AuthUser } from '~/utils/api';
const router = useRouter();
const userData = useUserData();
const { clearToken, statesRefresh } = useStore();
const isDisabled = ref(false);

const roleSwitcher = async (role) => {
  if (isDisabled.value) return;
  isDisabled.value = true;
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
  gap: 50px;
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
      $bg-black-block;
  }
}
</style>
