<template>
  <div class="button-edit">
    <button ref="button" class="button-edit__button" @click.prevent="toEdit">
      <svgo-button-preson-edit class="button-edit__icon" />
    </button>
    <div
      class="button-edit__inner"
      :class="{ 'button-edit__inner_blur': !isOutside }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

defineProps({
  top: { type: String, default: '20px' },
  right: { type: String, default: '20px' }
});
const emit = defineEmits(['toEdit']);
const toEdit = () => emit('toEdit');

const button = ref();
const { isOutside } = useMouseInElement(button);
</script>

<style scoped lang="scss">
.button-edit {
  @apply relative;
  &__button {
    @apply absolute flex justify-center items-center;
    height: 40px;
    width: 40px;
    border-radius: $border-radius-s;
    border: 1px solid $white;
    right: v-bind(right);
    top: v-bind(top);
    z-index: $z-index-2;
  }
  &__icon {
    height: 19px;
  }
  &__inner {
    transition: 0.1s;
    &_blur {
      filter: blur(1px);
      opacity: 0.85;
    }
  }
}
</style>
