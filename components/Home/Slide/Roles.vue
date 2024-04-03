<template>
  <article class="home-slide-roles">
    <div class="home-slide-roles__wrapper container">
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
            <button-ghost
              class="ghost-button"
              font-size="18px"
              font-weight="500"
              @click="ToLogin"
              >Начать работу</button-ghost
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
            <button-ghost
              width="321px"
              height="48px"
              font-size="18px"
              font-weight="500"
              @click="ToLogin"
            >
              <arrow-text font-size="18px" font-weight="500"
                >Найти исполнителя</arrow-text
              >
            </button-ghost>
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
  router.push('/login');
};
</script>

<style scoped lang="scss">
.home-slide-roles {
  @apply w-full flex justify-center relative;
  color: $white;
  min-height: $full-height;
  &__wrapper {
    min-height: $full-height;
    @apply relative;
  }
  &__executor-block,
  &__customer-block {
    @apply absolute flex;
    min-height: $full-height;
    column-gap: calcHeight(90px);
  }
  &__role-image {
    height: calcHeight(750px);
    @apply self-end;
    @media screen and ($media-lg-query) {
      @apply hidden;
    }
  }
  &__title {
    @include gradient-text($base-font, calcWidth(50), 500, calcHeight(70px));
    margin-bottom: calcHeight(65px);
    @media screen and ($media-lg-query) {
      @include gradient-text(
        $base-font,
        calculateVw768(50),
        500,
        calcHeight(70px)
      );
      margin-bottom: calcHeight(35px);
    }
  }
  &__text {
    max-width: calcHeight(980px);
    font-weight: 400;
    font-family: $base-font;
    margin-bottom: calcWidth(35);
    /* line-height: calcHeight(33px); */
    font-size: calcWidth(18);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(18);
      margin-bottom: calculateVw768(35);
    }
    span {
      font-weight: 500;
    }
    &:last-of-type {
      margin-bottom: calcHeight($space-big);
    }
  }
  &__text-block {
    padding-top: calcHeight(60px, var(--step));
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

.ghost-button {
  min-width: calcWidth(253);
  height: calcWidth(48);
  font-size: calcWidth(18);
  @media screen and ($media-lg-query) {
    min-width: calculateVw768(253);
    height: calculateVw768(48);
    font-size: calculateVw768(18);
  }
}
</style>
