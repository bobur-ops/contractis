<template>
  <button
    ref="btn"
    class="ghost-button"
    :class="`size-${size}`"
    :disabled="disabled"
  >
    <shared-arrow-text
      :font-size="fontSize"
      :font-weight="fontWeight"
      :arrow-gap="arrowGap"
      :hover="!isOutside"
      :size="size"
    >
      <slot />
    </shared-arrow-text>
  </button>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

defineProps({
  width: { type: String, default: 'auto' },
  height: { type: String, required: true },
  fontSize: { type: String, required: true },
  fontWeight: { type: String, required: true },
  // padding: { type: String, default: '0' },
  size: {
    type: String,
    default: 'md'
  },
  arrowGap: { type: String, default: '10px' },
  disabled: { type: Boolean, default: false }
});
const btn = ref();
const { isOutside } = useMouseInElement(btn);
</script>

<style scoped lang="scss">
.ghost-button {
  @apply flex justify-center items-center;
  border: 1px solid rgba($color: #fff, $alpha: 0.6);
  color: rgba($color: #fff, $alpha: 0.9);
  line-height: 10px;
  /* width: v-bind(width); */
  transition: background-color 0.2s ease-in-out;
  background: transparent;
  border-radius: calcWidth(10);
  @media screen and ($media-lg-query) {
    border-radius: calculateVw768(10);
  }
  &:hover {
    animation: change-color 0.2s forwards;
  }
  &.size-md {
    padding: calcWidth(18) calcWidth(50);
    height: calcWidth(48);

    @media screen and ($media-lg-query) {
      padding: calculateVw768(18) calculateVw768(50);
      height: calculateVw768(48);
    }
  }
  &.size-sm {
    padding: calcWidth(14) calcWidth(22);
    height: calcWidth(38);
    @media screen and ($media-lg-query) {
      padding: calculateVw768(14) calculateVw768(22);
      height: calculateVw768(38);
    }
  }
}
</style>
