<template>
  <article class="home-slide-start">
    <div class="home-slide-start__wrapper container">
      <div class="home-slide-start__info">
        <h1 class="home-slide-start__info-name">
          Будущее IT-фриланса <br />
          уже в
          <span class="home-slide-start__info-name_gradient">CONTRACTIS</span>
        </h1>
        <p class="home-slide-start__info-description">
          Разместите заказ и получайте предложения от профессиональных команд и
          фрилансеров с реальными ценами и сроками. Или выберите подрядчика
          вручную из обширного каталога.
        </p>
        <div class="home-slide-start__info-buttons">
          <button-gradient font-size="18px" font-weight="500">
            О сервисе
          </button-gradient>

          <button-ghost font-weight="500" @click="ToLogin">
            <arrow-text font-size="22px" font-weight="500">
              Начать работу
            </arrow-text>
          </button-ghost>
        </div>
        <ul class="home-slide-start__info-advantages">
          <li
            v-for="advantage in advantages"
            :key="advantage.id"
            class="home-slide-start__info-advantages-item"
          >
            <span class="home-slide-start__info-advantages-count">
              {{ advantage.count }}+
            </span>
            <span>{{ advantage.name }}</span>
          </li>
        </ul>
      </div>
      <div class="home-slide-start__earth" />
    </div>
  </article>
</template>

<script setup>
defineProps({
  advantages: { type: Array, required: true }
});
const router = useRouter();
const ToLogin = () => {
  router.push('/login');
};
</script>

<style scoped lang="scss">
.home-slide-start {
  @apply w-full flex justify-center;
  color: $white;
  &__wrapper {
    padding-top: calc(100vh / 11.74);
    @apply flex justify-between;
  }
  &__info {
    @apply flex flex-col;
    gap: calcHeight(40px);
    max-width: 736px;
    margin-top: calcHeight(81px);
    &-name {
      font-family: $base-font;
      font-size: 22px;
      letter-spacing: calcHeight(1.1px);
      @media screen and ($media-lg-query) {
        font-size: calcHeight(50px);
        letter-spacing: 3.25px;
      }
      font-style: normal;
      font-weight: 500;
      line-height: 100%; /* 80px */
      &_gradient {
        @include gradient-text($logo-font, 18px, 700);
        letter-spacing: -1.1px;
        @media screen and ($media-lg-query) {
          @include gradient-text($logo-font, calcHeight(42px), 700);
          letter-spacing: -3.25px;
        }
      }
    }
    &-description {
      font-family: $base-font;
      font-style: normal;
      font-weight: 400;
      font-size: calcHeight(15px);

      @media screen and ($media-lg-query) {
        line-height: 150%;
        max-width: 597px;
        font-size: calcHeight(17px);
      }
    }

    &-buttons {
      @apply flex justify-between;
      @media screen and ($media-lg-query) {
        @apply justify-start;
        gap: $space-large-plus;
      }
    }

    &-advantages {
      @apply flex justify-between;
      @media screen and ($media-md-query) {
        @apply justify-start;
        gap: $space-large;
      }
      &-item {
        @apply flex flex-col;
        line-height: normal;
        font-family: $base-font;
        font-size: calcHeight(15px);
        font-weight: 500;
        gap: calcHeight(12px);
      }
      &-count {
        font-family: $title-font;
        font-size: 18px;
        font-weight: 700;
        @media screen and ($media-lg-query) {
          font-size: 36px;
        }
      }
    }
  }
  &__earth {
    @include earth-gif(
      calcHeight(929.39px),
      calcHeight(134.47px),
      calcHeight(145.18px)
    );
    display: none;
    @media screen and ($media-lg-query) {
      @apply flex justify-center;
    }
    width: calcHeight(714px);
    height: calcHeight(709.24px);
  }
}
</style>
