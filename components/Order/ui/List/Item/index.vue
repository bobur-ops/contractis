<template>
  <li
    ref="orderItem"
    class="order-list-item"
    :class="{
      'order-list-item_lightning': !isOutside
    }"
  >
    <div class="order-list-item__inner">
      <div class="order-list-item__description">
        <div class="order-list-item__top">
          <div>
            <nuxt-link :to="cardPath">
              <h2 class="order-list-item__title">
                {{ trimText(title, 40) }}
                <svgo-profile-team
                  v-if="team === 'Team'"
                  class="order-list-item__person-icon"
                />
                <svgo-profile-solo
                  v-else-if="team === 'Solo'"
                  class="order-list-item__person-icon"
                />
              </h2>
            </nuxt-link>
            <shared-category
              v-if="category"
              :category="category"
              :specialization="specialization"
              class="order-list-item__categories"
            />
            <h3 v-if="keywords !== null" class="order-list-item__keywords">
              Ключевые слова:
              <span class="order-list-item__keywords-list">{{ keywords }}</span>
            </h3>
          </div>
          <div class="order-list-item__top-price">
            <span v-if="startPrice || endPrice" class="order-list-item__price">
              <span v-if="startPrice">
                {{ new Intl.NumberFormat('ru-RU').format(startPrice) }}
              </span>
              <span v-if="endPrice">
                - {{ new Intl.NumberFormat('ru-RU').format(endPrice) }}
              </span>
              <span class="order-list-item__price-format">₽</span>
            </span>
            <shared-deadline
              :format-period="formatPeriod"
              :min-period="minPeriod"
              :max-period="maxPeriod"
              class="order-list-item__period"
            />
          </div>
        </div>
        <h3 class="order-list-item__technologies">
          Технологии:
          <shared-technologies
            v-if="technologies.length"
            :technologies="technologies"
          />
          <span v-else>нет</span>
        </h3>
        <div class="order-list-item__description-text">
          <p>
            {{ trimText(description, 170) }}
          </p>
        </div>
        <div class="order-list-item__additional-data">
          <order-ui-time />
          <order-ui-responses
            v-if="responses.count"
            :responses="responses.count"
          />
        </div>
      </div>
      <div class="order-list-item__avatar-block">
        <img
          v-if="true"
          class="order-list-item__avatar"
          src="/assets/images/avatars/avatar.png"
          alt="avatar"
        />
        <div
          v-else
          class="order-list-item__avatar order-list-item__avatar_white"
        />
        <span class="order-list-item__name">
          {{ clientData.firstName }} {{ clientData.lastName }}
        </span>
      </div>
    </div>
  </li>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';
const props = defineProps({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  team: { type: String, required: true },
  startPrice: { type: Number, required: true },
  endPrice: { type: Number, default: null },
  minPeriod: { type: Number, default: null },
  maxPeriod: { type: Number, default: null },
  formatPeriod: { type: String, default: 'h' },
  category: { type: Object, default: () => {} },
  specialization: { type: Object, default: () => {} },
  files: { type: Array, default: () => [] },
  keywords: { type: Array, default: () => [] },
  technologies: { type: Array, default: () => [] },
  clientData: { type: Object, default: () => {} },
  performerData: { type: Object, default: () => {} },
  responses: { type: Object, default: () => {} },
  pathOrderDataPatch: { type: String, default: '' }
});

const { path: routePath } = useRoute();

const cardPath = computed(() => {
  if (routePath !== '/dashboard') {
    return `/order/${props.id}`;
  } else if (routePath === '/dashboard') {
    return props.pathOrderDataPatch;
  }
});

const { trimText } = useFormatting();

const keywords = computed(() =>
  props.keywords.length
    ? props.keywords.map((item) => item.name).join(', ')
    : 'нет'
);

const orderItem = ref();
const { elementX, elementY, isOutside } = useMouseInElement(orderItem);
const gradientX = computed(() => {
  return !isOutside.value ? elementX.value.toString() + 'px' : '0px';
});
const gradientY = computed(() => {
  return !isOutside.value ? elementY.value.toString() + 'px' : '0px';
});
</script>

<style scoped lang="scss">
@import 'style';
.order-list-item {
  &__inner {
    @apply w-full h-full relative;
  }
  &_lightning {
    background: radial-gradient(
        circle at v-bind(gradientX) v-bind(gradientY),
        $radial-glow-start 0,
        $radial-glow-end 300px
      ),
      $bg-black-block;
  }
}
</style>
