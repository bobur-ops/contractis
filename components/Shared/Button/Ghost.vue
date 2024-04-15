<template>
  <button
    ref="btn"
    class="ghost-button"
    :class="`size-${size} ${fullWidth ? 'full' : 'fit'}`"
    :disabled="disabled"
  >
    <shared-arrow-text
      :font-size="fontSize"
      :font-weight="fontWeight"
      :arrow-gap="arrowGap"
      :hover="!isOutside"
    >
      <slot />
    </shared-arrow-text>
  </button>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

defineProps({
  width: { type: String, default: 'auto' },
  height: { type: String, required: false },
  fontSize: { type: String, required: false },
  fontWeight: { type: String, required: false },
  padding: { type: String, default: '0' },
  arrowGap: { type: String, default: '10px' },
  disabled: { type: Boolean, default: false },
  size: { type: String, default: 'medium' },
  fullWidth: { type: Boolean, default: false }
});
const btn = ref();
const { isOutside } = useMouseInElement(btn);
</script>

<style scoped lang="scss">
.ghost-button {
  @apply flex justify-center items-center;
  border: 1px solid rgba($color: #fff, $alpha: 0.6);
  color: rgba($color: #fff, $alpha: 0.9);
  transition: background-color 0.2s ease-in-out;
  background: transparent;
  border-radius: $border-radius-s;
  &:hover {
    animation: change-color 0.2s forwards;
  }
  &.size {
    &-medium {
      padding: 0 pxToRem(50);
      font-size: pxToRem(18);
      height: pxToRem(48);
    }
    &-small {
      padding: 0 pxToRem(22);
      font-size: pxToRem(14);
      height: pxToRem(38);
    }
  }
  &.full {
    width: 100%;
  }
  &.fit {
    width: fit-content;
  }
}
</style>
