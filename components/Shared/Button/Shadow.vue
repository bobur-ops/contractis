<template>
  <button
    ref="btn"
    class="shadow-button"
    :class="{ 'shadow-button_disabled': disabled }"
  >
    <slot name="icon" />
    <shared-arrow-text
      :font-size="fontSize"
      :font-weight="fontWeight"
      :arrow-gap="arrowGap"
      :hover="!isOutside"
      arrow-color="0.3"
    >
      <slot name="text" />
    </shared-arrow-text>
  </button>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

defineProps({
  width: { type: String, required: true },
  height: { type: String, required: true },
  fontSize: { type: String, required: true },
  fontWeight: { type: String, required: true },
  arrowGap: { type: String, default: '10px' },
  disabled: { type: Boolean, default: false },
  borderRadius: { type: String, default: '10px' }
});
const btn = ref();
const { isOutside } = useMouseInElement(btn);
</script>

<style scoped lang="scss">
.shadow-button {
  @apply flex justify-center items-center;
  gap: v-bind(arrowGap);
  border: 1px solid $border-block;
  color: $white;
  line-height: 10px;
  width: v-bind(width);
  height: v-bind(height);
  transition: border 0.2s ease-in-out;
  background: transparent;
  border-radius: v-bind(borderRadius);
  &:hover {
    animation: change-shadow-color 0.2s forwards;
  }
  &_disabled {
    @apply opacity-60 cursor-no-drop;
  }
}
</style>
