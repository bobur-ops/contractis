<template>
  <article class="home-slide-start">
    <div class="home-slide-start__inner container">
      <div class="home-slide-start__info">
        <h1 class="home-slide-start__info-name">
          {{ localize('start.title') }}
          <span class="home-slide-start__info-name_gradient">CONTRACTIS</span>
        </h1>
        <p class="home-slide-start__info-description">
          {{ localize('start.description') }}
        </p>
        <div class="home-slide-start__info-buttons">
          <shared-button-gradient
            width="180px"
            height="45px"
            font-size="18px"
            font-weight="600"
          >
            {{ localize('start.about') }}
          </shared-button-gradient>

          <shared-button-ghost
            width="240px"
            height="45px"
            font-size="18px"
            font-weight="500"
            arrow-gap="15px"
            @click="ToLogin"
          >
            {{ localize('start.getStarted') }}
          </shared-button-ghost>
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
      <div class="home-slide-start__earth-block">
        <video
          autoplay
          loop
          muted
          class="home-slide-start__earth"
          src="assets/images/Earth.mp4"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  advantages: { type: Array, required: true }
});
const router = useRouter();
const ToLogin = () => {
  router.push('/auth/login');
};
const { t: localize } = useI18n({
  useScope: 'local'
});
</script>

<style scoped lang="scss">
@import 'style';
</style>

<i18n lang="json">
{
  "ru": {
    "start": {
      "title": "Будущее IT-фриланса уже в",
      "description": "Разместите заказ и получайте предложения от профессиональных команд и фрилансеров с реальными ценами и сроками. Или выберите подрядчика вручную из обширного каталога.",
      "about": "О сервисе",
      "getStarted": "Начать работу"
    }
  },
  "en": {
    "start": {
      "title": "The future of IT freelancing is already in",
      "description": "Place an order and receive offers from professional teams and freelancers with realistic prices and deadlines. Or select a contractor manually from an extensive directory.",
      "about": "About product",
      "getStarted": "Get started"
    }
  }
}
</i18n>
