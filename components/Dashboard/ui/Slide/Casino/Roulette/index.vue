<template>
  <section class="dashboard-casino-bonus">
    <div class="dashboard-casino-bonus__inner">
      <div class="dashboard-casino-bonus__info">
        <h2 class="dashboard-casino-bonus__title">Ваш ежедневный бонус</h2>
        <article class="dashboard-casino-bonus-actions">
          <h3 class="dashboard-casino-bonus-actions__title">Крутите рулетку</h3>
          <p class="dashboard-casino-bonus-actions__description">
            И бесплатно получайте бонусы для развития своего профиля на бирже
          </p>
          <shared-button-gradient-blue
            button-height="48px"
            font-size="18px"
            button-width="243px"
            border="10px"
            class="dashboard-casino-bonus-actions__button"
          >
            <shared-arrow-text font-size="18px" font-weight="500">
              Крутить рулетку
            </shared-arrow-text>
          </shared-button-gradient-blue>
          <p class="dashboard-casino-bonus-actions__time">
            <span class="dashboard-casino-bonus-actions__time-title">
              Следующая попытка через <br />
            </span>
            {{ fullHour }} {{ fullMin }} {{ fullSec }}
          </p>
          <p class="dashboard-casino-bonus-actions__loyalty">
            Читать условия программы лояльности
          </p>
        </article>
      </div>
      <img
        src="assets/images/dashboard/roulette-page/Roulette.png"
        alt="Roulette"
        class="dashboard-casino-bonus__roulette"
      />
    </div>
  </section>
</template>

<script setup>
const { timeFormat } = useFormatting();
const { getNoun } = useWordCase();
const time = useRouletteTime();
const timerInterval = setInterval(() => {
  time.value -= 1;
  if (time.value === 0) {
    clearInterval(timerInterval);
  }
}, 1000);

const fullHour = ref('');
const fullMin = ref('');
const fullSec = ref('');

const getTime = () => {
  const { sec, min, hour } = timeFormat(time.value);
  fullHour.value = hour + ` ${getNoun(hour, 'час', 'часа', 'часов')}`;
  fullMin.value = min + ` ${getNoun(min, 'минута', 'минуты', 'минут')}`;
  fullSec.value = sec + ` ${getNoun(sec, 'секунда', 'секунды', 'секунд')}`;
};

onMounted(() => getTime());
onUnmounted(() => clearInterval(timerInterval));
watch(time, getTime);
</script>

<style scoped lang="scss">
.dashboard-casino-bonus {
  @apply w-full;
  padding: 30px 25px 30px 30px;
  background: $bg-black-block;
  border: 1px solid $border-block;
  border-radius: 12px;
  &__inner {
    @apply w-full h-full flex justify-between items-center;
  }
  &__info {
    @apply h-full;
    max-width: 270px;
  }
  &__roulette {
    max-width: 383px;
    max-height: 378px;
  }
  &__title {
    line-height: 13px;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: $space-xx-large-plus;
  }
  &-actions {
    @apply flex flex-col;
    &__title {
      line-height: 13px;
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 27px;
    }
    &__description {
      max-width: 235px;
      font-weight: 300;
      font-size: 14px;
      line-height: 114%;
      color: $gray;
      margin-bottom: 32px;
    }
    &__button {
      margin-bottom: $space-medium-plus;
    }
    &__time {
      line-height: 147%;
      color: $white;
      margin-bottom: $space-medium-plus;
      &-title {
        font-weight: 300;
        font-size: 15px;
        color: $gray-60;
      }
    }
    &__loyalty {
      @apply cursor-pointer;
      font-weight: 300;
      font-size: 12px;
      line-height: 13px;
      text-decoration: underline;
    }
  }
}
</style>
