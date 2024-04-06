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
              width="245px"
              height="45px"
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
              отзывов поможет вам определиться с конечным Исполнителем, а
              Telegram-взаимодействие сделает его удобным!
            </p>
            <shared-button-ghost
              width="302px"
              height="45px"
              font-size="18px"
              font-weight="600"
              arrow-gap="15px"
              class="home-slide-roles__button"
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
  color: $white;
  min-height: $full-height;
  &__inner {
    min-height: $full-height;
    @apply relative;
  }
  &__executor-block,
  &__customer-block {
    @apply absolute flex;
    min-height: $full-height;
    column-gap: calcWidth(90);
    @media screen and ($media-lg-query) {
      column-gap: calculateVw768(90);
    }
  }
  &__role-image {
    height: calcWidth(650);
    @apply self-end;
    @media screen and ($media-lg-query) {
      @apply hidden;
    }
  }
  &__title {
    @include gradient-text($title-font, calcWidth(50), 500, 150%);
    margin-bottom: calcWidth(60);
    @media screen and ($media-lg-query) {
      @include gradient-text($title-font, calculateVw768(50), 500, 150%);
      margin-bottom: calculateVw768(60);
    }
    /* @include gradient-text($title-font, 70px, 700, 70px); */
    /* margin-bottom: 65px; */
  }
  &__text {
    line-height: calcWidth(33);
    max-width: calcWidth(980);
    font-size: calcWidth(17);
    font-weight: 400;
    color: rgba($color: #fff, $alpha: 0.6);
    margin-bottom: calcWidth(15);
    @media screen and ($media-lg-query) {
      line-height: calculateVw768(33);
      max-width: calculateVw768(980);
      font-size: calculateVw768(17);
      margin-bottom: calculateVw768(15);
    }
    span {
      font-weight: 500;
      color: rgba($color: #fff, $alpha: 0.9);
    }
    &:last-of-type {
      margin-bottom: calcWidth(60);
      @media screen and ($media-lg-query) {
        margin-bottom: calculateVw768(60);
      }
    }
  }
  &__button {
    width: fit-content;
  }
  &__text-block {
    @apply flex flex-col justify-center;
    margin-bottom: calcWidth(190);
    @media screen and ($media-lg-query) {
      margin-bottom: calculateVw768(190);
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
