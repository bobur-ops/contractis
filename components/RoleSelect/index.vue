<template>
  <client-only>
    <teleport to="main">
      <section class="role-select flex items-center">
        <div
          class="h-fit w-full relative flex justify-center items-center container mx-auto"
        >
          <img
            class="planet"
            src="assets/images/auth/Planet.png"
            alt="planet"
          />
          <article class="role-select__inner">
            <h2 class="role-select__title">Выберите вашу роль</h2>
            <div class="role-select__roles">
              <div class="role-select__role-block">
                <div
                  class="role-select__img-block"
                  :class="{ active: selectedRole === 'performer' }"
                  @click="selectedRole = 'performer'"
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
                  @click="selectedRole = 'performer'"
                >
                  Исполнитель
                </shared-arrow-text-animate>
              </div>
              <div class="role-select__role-block">
                <div
                  class="role-select__img-block"
                  :class="{ active: selectedRole === 'client' }"
                  @click="selectedRole = 'client'"
                >
                  <img
                    src="/assets/images/role-select/customer.png"
                    alt="customer"
                    class="role-select__img"
                  />
                </div>
                <shared-arrow-text-animate font-size="18px" font-weight="500">
                  Заказчик
                </shared-arrow-text-animate>
              </div>
            </div>
            <shared-button-gradient-blue
              button-height="50px"
              font-size="20px"
              :disabled="selectedRole === null"
              @click="() => toDashboard(selectedRole)"
            >
              <shared-arrow-text> Подтвердить </shared-arrow-text>
            </shared-button-gradient-blue>
            <img
              src="assets/images/astronauts/Astronaut-auth.png"
              class="astronaut"
              alt="astronaut"
            />
          </article>
        </div>
      </section>
    </teleport>
  </client-only>
</template>

<script setup>
import { AuthUser } from '~/utils/api/index.js';
const selectedRole = ref(null);

// toDashboard("performer");
// toDashboard("client");

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
    @apply flex flex-col justify-center items-center h-full relative;
    width: pxToRem(462);
    padding: pxToRem(35);
    border: 1px solid rgba($color: #fff, $alpha: 0.8);
    height: fit-content;
    border-radius: pxToRem(20);
  }
  &__title {
    @apply w-full;
    font-size: pxToRem(30);
    font-weight: 500;
    color: rgba($color: #fff, $alpha: 0.85);
    margin-bottom: pxToRem(32);
    text-align: left;
  }
  &__roles {
    @apply flex;
    gap: pxToRem(30);
    margin-bottom: pxToRem(35);
  }
  &__img-block {
    @apply flex justify-center items-end;
    width: pxToRem(182);
    height: pxToRem(135);
    background: $bg-black-block;
    border: 1px solid $border-block;
    border-radius: $border-radius-m;
    margin-bottom: pxToRem(20);
    cursor: pointer;

    &.active {
      background: $gradient-skyblue-blue;
      border: 1px solid rgba($color: #fff, $alpha: 0.8);
    }
    img {
      width: pxToRem(133);
      height: pxToRem(162);
    }
  }
}

.astronaut {
  @apply absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -99%;
}
.planet {
  @apply absolute;
  top: pxToRem(120);
  width: pxToRem(210);
  height: pxToRem(209);
  left: 0;
}
</style>
