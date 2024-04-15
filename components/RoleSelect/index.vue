<template>
  <client-only>
    <teleport to="main">
      <section class="role-select">
        <div class="role-select__inner">
          <h2 class="role-select__title">Выберите вашу роль</h2>
          <div class="role-select__roles">
            <div class="role-select__role-block">
              <div
                class="role-select__img-block"
                @click="toDashboard('performer')"
              >
                <img
                  src="/assets/images/role-select/executor.png"
                  alt="executor"
                  class="role-select__img"
                />
              </div>
              <shared-arrow-text-animate
                font-size="18px"
                font-weight="500"
                @click="toDashboard('performer')"
              >
                Исполнитель
              </shared-arrow-text-animate>
            </div>
            <div class="role-select__role-block">
              <div
                class="role-select__img-block"
                @click="toDashboard('client')"
              >
                <img
                  src="/assets/images/role-select/customer.png"
                  alt="customer"
                  class="role-select__img"
                />
              </div>
              <shared-arrow-text-animate
                font-size="18px"
                font-weight="500"
                @click="toDashboard('client')"
              >
                Заказчик
              </shared-arrow-text-animate>
            </div>
          </div>
        </div>
      </section>
    </teleport>
  </client-only>
</template>

<script setup>
import { AuthUser } from '~/utils/api';
definePageMeta({
  layout: 'main'
});
useHead({
  bodyAttrs: {
    class: 'overflow-hidden'
  }
});
const userData = useUserData();
const { clearToken, statesRefresh } = useStore();
const isDisabled = ref(false);
const router = useRouter();
const toDashboard = async (role) => {
  isDisabled.value = true;
  userData.value.role = role;
  const { data, error } = await AuthUser.setRole(role);
  if (data.value) {
    userData.value.role = role;
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
  await router.push('/dashboard');
};
</script>

<style scoped lang="scss">
.role-select {
  @apply fixed top-0;
  height: 100vh;
  width: 100%;
  @include gb-blur();
  &__inner {
    @apply flex flex-col justify-center items-center h-full w-full;
  }
  &__title {
    font-size: 30px;
    font-weight: 600;
    color: $white;
    margin-bottom: 60px;
  }
  &__roles {
    @apply flex;
    gap: 90px;
  }
  &__img-block {
    @apply flex justify-center items-end;
    width: 220px;
    height: 250px;
    background: $bg-black-block;
    border: 1px solid $border-block;
    border-radius: $border-radius-m;
    margin-bottom: 20px;
    cursor: pointer;
  }
}
</style>
