<template>
  <article class="home-slide-roles">
    <div class="home-slide-roles__inner container">
      <transition name="fade">
        <div
          v-if="role === 'executor'"
          ref="roleBlock"
          class="home-slide-roles__executor-block"
        >
          <img
            src="../../../assets/images/home/executor.png"
            alt="executor-full"
            class="home-slide-roles__role-image"
          />
          <div class="home-slide-roles__text-block">
            <h2 class="home-slide-roles__title">Исполнитель</h2>
            <p class="home-slide-roles__text">
              <span
                >В IT-сфере за 2020-2023 года Исполнители сильно
                разделились</span
              >
              по категориям, у кого-то команда, кто-то работает как фрилансер, а
              у кого-то организация.
            </p>
            <p class="home-slide-roles__text">
              <span>CONTRACTIS позволит работать</span> всем описанным выше
              категориям Исполнителей, честно и по своему уровню навыков.
            </p>
            <p class="home-slide-roles__text">
              <span>Начните делать первые шаги</span> для получения Заказа прямо
              сейчас!
            </p>
            <shared-button-ghost
              font-size="18px"
              font-weight="600"
              arrow-gap="15px"
              class="home-slide-roles__button"
              @click="ToLogin"
              >Начать работу</shared-button-ghost
            >
          </div>
        </div>
        <div
          v-else-if="role === 'customer'"
          class="home-slide-roles__customer-block"
        >
          <img
            src="../../../assets/images/home/customer.png"
            alt="executor-full"
            class="home-slide-roles__role-image"
          />
          <div class="home-slide-roles__text-block">
            <h2 class="home-slide-roles__title">Заказчик</h2>
            <p class="home-slide-roles__text">
              <span>Биржа CONTRACTIS</span> ориентирована на честную и
              взаимовыгодную работу Заказчика и Исполнителя. С каждым годом
              становится все сложнее и сложнее выбрать себе разработчика,
              фрилансера или подобрать профессиональную команду.
            </p>
            <p class="home-slide-roles__text">
              <span>CONTRACTIS и умная система рейтингов</span> и честных
              отзывов <span>поможет вам</span> определиться с конечным
              Исполнителем, а Telegram-взаимодействие сделает его удобным!
            </p>
            <shared-button-ghost
              width="302px"
              height="45px"
              font-size="18px"
              font-weight="600"
              arrow-gap="15px"
              @click="ToLogin"
              >Найти исполнителя</shared-button-ghost
            >
          </div>
        </div>
      </transition>
      <home-slide-roles-switcher @role-switch="roleSwitch" />
    </div>
  </article>
</template>

<script setup>
const role = ref('executor');
const roleSwitch = (switchRole) => {
  role.value = switchRole;
};
const router = useRouter();
const ToLogin = () => {
  router.push('/auth/login');
};
</script>

<style scoped lang="scss">
.home-slide-roles {
  @apply w-full flex justify-center relative;
  color: rgba($color: #fff, $alpha: 0.9);
  /* min-height: $full-height; */
  min-height: 100%;

  &__inner {
    min-height: $full-height;
    @apply relative;
  }
  &__executor-block,
  &__customer-block {
    @apply absolute flex;
    min-height: $full-height;
    column-gap: pxToRem(90);
    left: 0;
    top: 0;
    padding: 0 pxToRem(30);
  }
  &__role-image {
    height: pxToRem(480);
    @apply self-end;
    @media screen and ($media-md-query) {
      @apply hidden;
    }
  }
  &__title {
    @include gradient-text($base-font, pxToRem(50), 500, 150%);
    margin-bottom: pxToRem(45);
    @media screen and ($media-md-query) {
      @include gradient-text($base-font, pxToRem(26), 500, 150%);
      margin-bottom: pxToRem(25);
    }
  }
  &__text {
    line-height: pxToRem(33);
    max-width: pxToRem(798);
    font-size: pxToRem(18);
    font-weight: 400;
    margin-bottom: pxToRem(27);
    color: rgba($color: #fff, $alpha: 0.6);
    @media screen and ($media-md-query) {
      font-size: pxToRem(13);
      line-height: 150%;
      margin-bottom: pxToRem(15);
      max-width: unset;
    }
    &:last-of-type {
      margin-bottom: pxToRem(45);
      @media screen and ($media-md-query) {
        margin-bottom: pxToRem(25);
      }
    }
    span {
      font-weight: 500;
      color: rgba($color: #fff, $alpha: 0.9);
    }
  }
  &__button {
    margin-bottom: pxToRem(90);
  }
  &__text-block {
    @apply flex flex-col justify-center;
    transform: translateY(pxToRem(-100));
    @media screen and ($media-md-query) {
      @apply justify-start;
      transform: translateY(0);
      /* transform: translateY(pxToRem(100)); */
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
