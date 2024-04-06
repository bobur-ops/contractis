<template>
  <section class="subscription">
    <div class="subscription__inner container">
      <span class="subscription__path">Главная / Подписка</span>
      <div class="subscription__title">
        <div class="subscription__title-mark" />
        <h1 class="subscription__title-text">Подписка</h1>
      </div>
      <subscription-ui-sub />
      <div class="subscription__buttons">
        <form-send />
        <shared-button-gradient-blue
          button-height="45px"
          button-width="359px"
          font-size="18px"
        >
          Оформить подписку в 1 клик
        </shared-button-gradient-blue>
      </div>
      <h2 class="subscription__title-text subscription__title-text_advantages">
        Оформите подписку и получите
      </h2>
      <subscription-ui-advantages />
      <h2 class="subscription__title-text subscription__title-text_description">
        Сервис и биржа развивается каждый квартал
      </h2>
      <p class="subscription__description">
        Наш фриланс IT сервис не просто следует за трендами, он создает их. Наши
        талантливые специалисты, инновационные проекты и постоянное стремление к
        совершенству – вот что делает нас лидерами в этой динамичной индустрии.
        Но как быть в курсе всех событий и получить максимальную пользу от
        нашего сервиса? Ответ прост – подписка! С каждым прошедшим кварталом наш
        сервис становится мощнее, инновационнее и более гибким, чтобы
        соответствовать вашим требованиям и ожиданиям. Забудьте о стереотипах -
        фриланс не просто о дополнительном заработке. Это образ жизни, свобода
        выбора и неисчерпаемые возможности реализации себя.
      </p>
      <article
        ref="everyoneBlock"
        class="subscription__everyone"
        :class="{ subscription__everyone_lightning: !isOutside }"
      >
        <p class="subscription__everyone-title">Подписка едина для всех.</p>
        <p
          class="subscription__everyone-title subscription__everyone-title_small"
        >
          Вы покупаете только возможность отклика.
        </p>
        <shared-arrow-text-animate
          font-weight="500"
          font-size="16px"
          arrow-height="12px"
          class="subscription__everyone-link"
        >
          Подробнее о сервисе
        </shared-arrow-text-animate>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

definePageMeta({
  layout: 'astronaut',
  middleware: 'user'
});
const everyoneBlock = ref();
const gradientX = ref();
const gradientY = ref();

const { elementX, elementY, isOutside } = useMouseInElement(everyoneBlock);
watch([elementX, elementY], () => {
  if (!isOutside.value) {
    gradientX.value = elementX.value + 'px';
    gradientY.value = elementY.value + 'px';
  }
});
</script>

<style scoped lang="scss">
@import 'style';
.subscription {
  &__everyone_lightning {
    background:
      url('assets/images/subscription/advantages/Peoples.png') right center
        no-repeat,
      radial-gradient(
        circle at v-bind(gradientX) v-bind(gradientY),
        $radial-glow-start 0,
        $radial-glow-end 420px
      ),
      $bg-black-block;
  }
}
</style>
