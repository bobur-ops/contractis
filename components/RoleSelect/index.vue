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
    width: calcWidth(462);
    padding: calcWidth(35);
    border: 1px solid rgba($color: #fff, $alpha: 0.8);
    height: fit-content;
    border-radius: calcWidth(20);
    @media screen and ($media-lg-query) {
      width: 100%;
      /* padding: calculateVw768(35); */
      padding: 0;
      border-radius: calculateVw768(20);
      border: none;
    }
    @media screen and ($media-md-query) {
      width: 100%;
      padding: 0;
      border-radius: calculateVw425(20);
    }
  }
  &__title {
    @apply w-full;
    font-size: calcWidth(30);
    font-weight: 500;
    color: rgba($color: #fff, $alpha: 0.85);
    margin-bottom: calcWidth(32);
    text-align: left;
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(30);
      margin-bottom: calculateVw768(32);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(24);
      margin-bottom: calculateVw425(32);
    }
  }
  &__roles {
    @apply flex;
    gap: calcWidth(30);
    margin-bottom: calcWidth(35);
    @media screen and ($media-lg-query) {
      gap: calculateVw768(30);
      margin-bottom: calculateVw768(35);
    }
    @media screen and ($media-md-query) {
      gap: calculateVw425(30);
      margin-bottom: calculateVw425(35);
    }
  }
  &__img-block {
    @apply flex justify-center items-end;
    width: calcWidth(182);
    height: calcWidth(135);
    background: $bg-black-block;
    border: 1px solid $border-block;
    border-radius: $border-radius-m;
    margin-bottom: calcWidth(20);
    cursor: pointer;
    @media screen and ($media-lg-query) {
      width: calculateVw768(182);
      height: calculateVw768(135);
      margin-bottom: calculateVw768(20);
    }
    @media screen and ($media-md-query) {
      width: calculateVw425(150);
      height: calculateVw425(115);
      margin-bottom: calculateVw425(20);
    }

    &.active {
      background: $gradient-skyblue-blue;
      border: 1px solid rgba($color: #fff, $alpha: 0.8);
    }
    img {
      width: calcWidth(133);
      height: calcWidth(162);
      @media screen and ($media-lg-query) {
        width: calculateVw768(133);
        height: calculateVw768(162);
      }
      @media screen and ($media-md-query) {
        width: calculateVw425(112);
        height: calculateVw425(135);
      }
    }
  }
}

.astronaut {
  @apply absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -99%;
  @media screen and ($media-lg-query) {
    @apply hidden;
  }
}
.planet {
  @apply absolute;
  top: calcHeight(120px);
  left: 0;
  @media screen and ($media-lg-query) {
    @apply hidden;
  }
}
</style>
