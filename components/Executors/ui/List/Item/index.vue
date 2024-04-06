<template>
  <li
    ref="executorsItem"
    class="executors-list-item"
    :class="{
      'executors-list-item_lightning': !isOutside
    }"
  >
    <div class="executors-list-item__inner">
      <article class="executors-list-item__top">
        <div class="executors-list-item__profile">
          <img
            v-if="avatarPath"
            class="executors-list-item__profile-avatar"
            src="/assets/images/avatars/avatar.png"
            alt="avatar"
          />
          <profile-ui-default-avatar
            v-else
            class="executors-list-item__profile-avatar"
          />
          <nuxt-link
            v-if="site"
            to="#"
            class="executors-list-item__profile-link"
          >
            <svgo-ethernet class="executors-list-item__profile-link-icon" />
            {{ trimText(site, 11) }}
          </nuxt-link>
        </div>
        <div class="executors-list-item__main">
          <div class="executors-list-item__top">
            <div>
              <div class="executors-list-item__title">
                <h2 class="executors-list-item__name">
                  {{ lastName }} {{ firstName }}
                  <svgo-verified
                    v-if="false"
                    class="executors-list-item__name-verified"
                  />
                </h2>
                <h2 class="executors-list-item__rating">
                  {{ rating }}
                  <svgo-star class="executors-list-item__rating-star" />
                </h2>
              </div>
              <p class="executors-list-item__region">
                <img
                  alt="rus"
                  src="/assets/images/header/rus.png"
                  class="executors-list-item__region-img"
                />
                {{ country?.name }}, г. {{ city?.name }}
              </p>
            </div>
            <div class="executors-list-item__top-right">
              <span class="executors-list-item__price">
                {{ new Intl.NumberFormat('ru-RU').format(hourlyRate) }}
                ₽ / час
              </span>
              <shared-category
                class="executors-list-item__categories"
                :category="4"
              />
            </div>
          </div>
          <h2 class="executors-list-item__technologies">
            Технологии:
            <shared-technologies :technologies="technologies" />
          </h2>
          <shared-stats
            :team-count="stats.teamCount"
            :experience="stats.experience"
            :negative-reviews="stats.reviews.negative"
            :positive-reviews="stats.reviews.positive"
            :portfolio-count="stats.portfolioCount"
            class="executors-list-item__stats"
          />
        </div>
      </article>
      <p v-if="type === 'extended'" class="executors-list-item__description">
        {{ trimText(description ?? '', descriptionLength) }}
      </p>
      <transition @enter="onEnter" @leave="onLeave">
        <article
          v-show="isShowedBottom"
          style="height: 0"
          class="executors-list-item__bottom"
        >
          <p v-if="type === 'default'" class="executors-list-item__description">
            {{ trimText(description ?? '', 500) }}
          </p>
          <shared-examples
            v-if="type === 'extended'"
            :type="type"
            :examples="[
              'Ракета Илона Маска',
              'Фитнес трекер',
              'Это изобретение изменит мир!, читать далее...'
            ]"
          />
          <div class="executors-list-item__buttons">
            <shared-button-shadow
              width="185px"
              height="40px"
              font-size="14px"
              font-weight="500"
            >
              <template #icon>
                <svgo-message class="executors-list-item__buttons-icon" />
              </template>
              <template #text> Перейти в чат </template>
            </shared-button-shadow>
            <shared-button-shadow
              width="230px"
              height="40px"
              font-size="14px"
              font-weight="500"
            >
              <template #icon>
                <svgo-person class="executors-list-item__buttons-icon" />
              </template>
              <template #text> Перейти в профиль </template>
            </shared-button-shadow>
          </div>
        </article>
      </transition>
    </div>
    <div class="executors-list-item__bottom-line" @click="switchShower">
      <div class="executors-list-item__bottom-line-elements">
        <div class="executors-list-item__bottom-line-element" />
        <div class="executors-list-item__bottom-line-element" />
      </div>
    </div>
  </li>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

const props = defineProps({
  id: { type: Number, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  avatarPath: { type: String, default: '' },
  team: { type: Boolean, default: false },
  teamCount: { type: Number, default: 0 },
  site: { type: String, default: '' },
  experience: { type: String, default: '' },
  hourlyRate: { type: Number, default: null },
  rating: { type: Number, default: null },
  mainCategory: { type: String, default: '' },
  type: { type: String, default: 'default' },
  technologies: { type: Array, default: () => [] },
  description: { type: String, default: '' },
  country: { type: Object, default: () => {} },
  city: { type: Object, default: () => {} },
  portfolioCount: { type: Number, default: 0 }
});
const { getNoun } = useWordCase();
const stats = reactive({
  experience: props.experience
    ? `${props.experience} ${getNoun(props.experience, 'месяц', 'месяца', 'месяцев')}`
    : null,
  portfolioCount: props.portfolioCount
    ? `${props.portfolioCount} ${getNoun(props.portfolioCount, 'работа', 'работы', 'работ')}`
    : null,
  reviews: {
    positive: 22,
    negative: 3
  },
  teamCount: props.teamCount
    ? `${props.teamCount} ${getNoun(props.teamCount, 'человек', 'человека', 'человек')}`
    : null
});

const { trimText } = useFormatting();

const isShowedBottom = ref(false);
const descriptionLength = ref(200);
const switchShower = () => {
  isShowedBottom.value = !isShowedBottom.value;
  if (isShowedBottom.value) descriptionLength.value = 0;
  else descriptionLength.value = 200;
};

const onEnter = (target) => {
  target.style.height = target.scrollHeight + 25 + 'px';
};
const onLeave = (target) => {
  target.style.height = '0px';
};

const executorsItem = ref();
const gradientX = ref();
const gradientY = ref();

const { elementX, elementY, isOutside } = useMouseInElement(executorsItem);
watch([elementX, elementY], () => {
  if (!isOutside.value) {
    gradientX.value = elementX.value + 'px';
    gradientY.value = elementY.value + 'px';
  }
});
</script>
<style scoped lang="scss">
@import 'style';

.executors-list-item {
  &_lightning {
    background: radial-gradient(
        circle at v-bind(gradientX) v-bind(gradientY),
        $radial-glow-start 0,
        $radial-glow-end 420px
      ),
      $bg-black-block;
  }
}
</style>
