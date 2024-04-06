<template>
  <start-animation v-if="loading" />
  <nuxt-layout :class="{ hidden: loading }">
    <div class="not-found">
      <div class="not-found__content">
        <div class="not-found__title-block">
          <h1 class="not-found__error">{{ error.statusCode }}</h1>
          <h2 class="not-found__title">Упс!</h2>
        </div>
        <h3 v-if="error.statusCode === 404" class="not-found__sub-title">
          Страница не найдена
        </h3>
        <p v-if="error.statusCode === 404" class="not-found__description">
          К сожалению, запрашиваемая Вами страница попала в черную дыру, а,
          возможно, её никогда не было.
        </p>
        <p v-else class="not-found__description">
          {{ error.message }}
        </p>
        <div class="not-found__button-block">
          <shared-button-gradient-blue
            button-height="45px"
            button-width="296px"
            font-size="18px"
            @click="ToHome"
          >
            Вернуться на главную
          </shared-button-gradient-blue>
          <shared-button-ghost
            width="264px"
            height="45px"
            font-size="18px"
            font-weight="600"
            arrow-gap="15px"
            @click="back"
          >
            Вернуться назад
          </shared-button-ghost>
        </div>
      </div>
      <img
        src="assets/images/404planet.png"
        alt="planet"
        class="not-found__planet"
      />
    </div>
  </nuxt-layout>
</template>

<script setup>
const loading = ref(true);
onMounted(() => (loading.value = false));

const router = useRouter();
const ToHome = () => {
  router.push('/');
};
const back = () => {
  router.back();
};
const error = useError();
</script>

<style scoped lang="scss">
.not-found {
  @apply flex mx-auto justify-between items-center;
  color: $white;
  max-width: 1420px;
  height: $full-height;
  padding-bottom: $header-height;
  &__planet {
    height: calcHeight(514px);
    width: calcHeight(522px);
  }
  &__content {
    text-align: center;
  }
  &__button-block {
    @apply flex justify-center;
    gap: calcWidth(40px);
  }
  &__title-block {
    @apply flex justify-center items-end;
    gap: calcWidth(50px);
    margin-bottom: calcHeight(55px);
  }
  &__error {
    font-size: 200px;
    font-weight: 400;
    line-height: 140px;
  }
  &__title {
    font-size: 80px;
    font-weight: 400;
    line-height: 56px;
  }
  &__sub-title {
    font-size: 50px;
    font-weight: 500;
    line-height: 35px;
    margin-bottom: calcHeight(80px);
  }
  &__description {
    color: $gray;
    font-size: 25px;
    font-weight: 500;
    line-height: 23px;
    max-width: 730px;
    margin-bottom: calcHeight(65px);
  }
}
</style>
