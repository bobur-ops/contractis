<template>
  <li
    ref="executorsItem"
    class="executors-list-item"
    :class="{ 'executors-list-item_lightning': !isOutside }"
  >
    <div class="executors-list-item__inner">
      <div class="executors-list-item__profile">
        <img
          v-if="executor.avatarPath"
          class="executors-list-item__profile-avatar"
          src="/assets/images/avatars/avatar.png"
          alt="avatar"
        />
        <profile-ui-default-avatar
          v-else
          class="executors-list-item__profile-avatar"
        />
        <nuxt-link
          v-if="executor.site"
          to="#"
          class="executors-list-item__profile-link"
        >
          <svgo-ethernet class="executors-list-item__profile-link-icon" />
          {{ executor.site }}
        </nuxt-link>
      </div>
      <div class="executors-list-item__main">
        <div class="executors-list-item__top">
          <div class="executors-list-item__top-left">
            <h2 class="executors-list-item__name">
              {{ trimText(executor.lastName + ' ' + executor.firstName, 13) }}
              <svgo-verified
                v-if="executor.verified"
                class="executors-list-item__name-verified"
              />
            </h2>
            <h3 class="executors-list-item__rating">
              {{ executor.rating }}
              <svgo-star class="executors-list-item__rating-star" />
            </h3>
          </div>
          <span class="executors-list-item__price">
            {{ new Intl.NumberFormat('ru-RU').format(executor.price) }}
            ₽&nbsp;/&nbsp;час
          </span>
        </div>
        <p class="executors-list-item__region">
          <img
            alt="rus"
            src="/assets/images/header/rus.png"
            class="executors-list-item__region-img"
          />
          {{ executor.country }}, г. {{ executor.city }}
        </p>
        <h2 class="executors-list-item__technologies">
          Технологии:
          <shared-technologies
            class="executors-list-item__technologies-item"
            :technologies="executor.technologies"
            font-size="12px"
          />
        </h2>
        <shared-category :category="1" />
      </div>
    </div>
  </li>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

defineProps({
  executor: { type: Object, default: () => {} }
});

const { trimText } = useFormatting();

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
