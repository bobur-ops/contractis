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
    max-width: calcWidth(768);
    margin-top: calcHeight(81px);
    @media screen and ($media-lg-query) {
      max-width: calculateVw768(768);
    }
    &-name {
      font-family: $base-font;
      font-size: calcWidth(50);
      letter-spacing: calcWidth(3.25);
      font-style: normal;
      font-weight: 500;
      color: rgba($color: #fff, $alpha: 0.85);
      line-height: 100%; /* 80px */
      &_gradient {
        @include gradient-text($logo-font, calcWidth(42), 700);
        letter-spacing: -1.1px;
        @media screen and ($media-lg-query) {
          @include gradient-text($logo-font, calculateVw768(42), 700);
        }
      }
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(50);
      }
    }
    &-description {
      font-family: $base-font;
      font-style: normal;
      color: #ffffff;
      opacity: 0.9;
      font-weight: 400;
      font-size: calcWidth(17);
      max-width: calcWidth(597);
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(17);
        max-width: calculateVw768(597);
      }
    }

    &-buttons {
      @apply flex;
      gap: $space-large-plus;
      @media screen and ($media-lg-query) {
        @apply justify-between;
      }
    }

    &-advantages {
      @apply flex;
      gap: $space-large;
      @media screen and ($media-lg-query) {
        /* gap: calculateVw768(40); */
        @apply justify-between;
      }
      &-item {
        @apply flex flex-col;
        line-height: normal;
        font-family: $base-font;
        font-size: calcWidth(15);
        font-weight: 500;
        gap: calcWidth(15);
        color: rgba($color: #fff, $alpha: 0.9);
        @media screen and ($media-lg-query) {
          font-size: calculateVw768(15);
        }
      }
      &-count {
        font-family: $title-font;
        font-size: calcWidth(30);
        font-weight: 700;
        @media screen and ($media-lg-query) {
          font-size: calculateVw768(30);
        }
      }
    }
  }
  &__earth {
    background: url('/assets/images/Earth.gif') top (-110px) left (-120px);
    background-size: 730px;
    background-repeat: no-repeat;
    border-radius: 100%;
    width: calcWidth(470);
    transform: scale(0.75);
    height: calcWidth(470);
    /* @include earth-gif(
      calcHeight(750.39px),
      calcHeight(100.47px),
      calcHeight(145.18px)
    ); */
    @apply flex justify-center;
    /* width: calcHeight(714px);
    height: calcHeight(709.24px); */
    width: calcWidth(615);
    height: calcWidth(622);
    @media screen and ($media-lg-query) {
      @apply hidden;
    }
  }
}
</style>
