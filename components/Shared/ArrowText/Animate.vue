<template>
  <div
    ref="arrowTextAnimate"
    class="arrow-text-animate"
    :class="{ 'items-end': revers }"
  >
    <shared-arrow-text
      :hover="!isOutside"
      :font-size="fontSize"
      :font-family="fontFamily"
      :arrow-height="arrowHeight"
      :font-weight="fontWeight"
      :revers="revers"
      :arrow-gap="arrowGap"
      :color="color"
    >
      <slot />
    </shared-arrow-text>
    <div
      class="arrow-text-animate__line"
      :class="{ 'arrow-text-animate__line_red': color === 'red' }"
    />
  </div>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

defineProps({
  fontSize: { type: String, required: true },
  fontWeight: { type: String, required: true },
  fontFamily: { type: String, default: 'base' },
  arrowHeight: { type: String, default: '10px' },
  arrowGap: { type: String, default: '10px' },
  revers: { type: Boolean, default: false },
  color: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'red'].includes(value)
  }
});

const arrowTextAnimate = ref();

const { isOutside } = useMouseInElement(arrowTextAnimate);
</script>

<style scoped lang="scss">
.arrow-text-animate {
  @apply w-fit h-fit flex flex-col cursor-pointer;
  &:hover .arrow-text-animate__line {
    width: calc(100% - 20px);
  }
  &__line {
    transition: 0.2s;
    height: 1px;
    width: 0;
    background: $white;
    &_red {
      background: $light-red;
    }
  }
}
</style>
