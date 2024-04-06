<template>
  <article class="subscription__advantages">
    <div
      ref="advantages_first"
      class="subscription__advantages-block subscription__advantages-block_first"
      :class="{
        'subscription__advantages-block_first_lightning':
          isFirstOutside !== true
      }"
    >
      <div class="subscription__advantages-block-text">
        <p class="subscription__advantages-block-title">
          <b class="subscription__advantages-block-title_strong">
            Безграничный доступ к базе заказов
          </b>
          от более, чем 10 000 Заказчиков и
          <b class="subscription__advantages-block-title_strong">
            безграничные отклики
          </b>
        </p>
        <shared-arrow-text-animate
          font-weight="500"
          font-size="16px"
          arrow-height="12px"
          class="subscription__advantages-block-link"
        >
          Приобрести
        </shared-arrow-text-animate>
      </div>
    </div>
    <div
      ref="advantages_second"
      class="subscription__advantages-block subscription__advantages-block_second"
      :class="{
        'subscription__advantages-block_second_lightning':
          isSecondOutside !== true
      }"
    >
      <div class="subscription__advantages-block-text">
        <p class="subscription__advantages-block-title">
          <b class="subscription__advantages-block-title_strong">
            Продвинутая система лояльности
          </b>
          Каждый день у вас будет возможность выиграть приз в рулетке
        </p>
        <shared-arrow-text-animate
          font-weight="500"
          font-size="16px"
          arrow-height="12px"
          class="subscription__advantages-block-link"
        >
          Узнать подробнее
        </shared-arrow-text-animate>
      </div>
    </div>
  </article>
</template>
<script setup>
import { useMouseInElement } from '@vueuse/core';

const advantages_first = ref();
const advantages_second = ref();

const {
  elementX: firstPosX,
  elementY: firstPosY,
  isOutside: isFirstOutside
} = useMouseInElement(advantages_first);
const firstX = computed(() => {
  return !isFirstOutside.value ? firstPosX.value.toString() + 'px' : '0px';
});
const firstY = computed(() => {
  return !isFirstOutside.value ? firstPosY.value.toString() + 'px' : '0px';
});

const {
  elementX: secondPosX,
  elementY: secondPosY,
  isOutside: isSecondOutside
} = useMouseInElement(advantages_second);
const secondX = computed(() => {
  return !isSecondOutside.value ? secondPosX.value.toString() + 'px' : '0px';
});
const secondY = computed(() => {
  return !isSecondOutside.value ? secondPosY.value.toString() + 'px' : '0px';
});
</script>

<style scoped lang="scss">
.subscription__advantages {
  @apply flex;
  margin-bottom: 70px;
  gap: 4.5%;
  &-block {
    overflow: hidden;
    width: 47.75%;
    height: 492px;
    border-radius: 12px;
    border: 1px solid $border-block;
    &-text {
      @apply flex flex-col;
      gap: $space-large;
    }
    &-title {
      max-width: 420px;
      font-size: 20px;
      font-weight: 500;
      color: $gray-50;
      line-height: 24px;
      &_strong {
        color: $white;
        font-weight: 600;
      }
    }
    &_first {
      transition: all 0.2s;
      background:
        url('assets/images/subscription/advantages/Macbook-left.png') right
          bottom 25px no-repeat,
        $bg-black-block;
      padding: 38px 37px;
      &_lightning {
        background:
          url('assets/images/subscription/advantages/Macbook-left.png') right
            bottom 25px no-repeat,
          radial-gradient(
            circle at v-bind(firstX) v-bind(firstY),
            $radial-glow-start 0,
            $radial-glow-end 420px
          ),
          $bg-black-block;
      }
    }
    &_second {
      background:
        url('assets/images/subscription/advantages/man.png') left 134px bottom
          no-repeat,
        url('assets/images/subscription/advantages/fortuna.png') right bottom
          no-repeat,
        url('assets/images/subscription/advantages/Macbook-right.png') left top
          no-repeat,
        $bg-black-block;
      background-size: auto, 250px, auto;
      margin-top: 150px;
      padding: 51px 77px;
      &_lightning {
        background:
          url('assets/images/subscription/advantages/man.png') left 134px bottom
            no-repeat,
          url('assets/images/subscription/advantages/fortuna.png') right bottom
            no-repeat,
          url('assets/images/subscription/advantages/Macbook-right.png') left
            top no-repeat,
          radial-gradient(
            circle at v-bind(secondX) v-bind(secondY),
            $radial-glow-start 0,
            $radial-glow-end 420px
          ),
          $bg-black-block;
      }
    }
  }
}
</style>
