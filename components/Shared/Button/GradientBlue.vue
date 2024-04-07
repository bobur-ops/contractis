<template>
  <button
    :disabled="disabled"
    :type="attrs.type"
    class="button-gradient-blue"
    :class="{
      'button-gradient-blue--size--default': size === 'default',
      'button-gradient-blue--size-big': size === 'big',
      'button-gradient-blue--fullwidth': fullWidth
    }"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  fontSize: {
    type: String,
    required: true
  },
  buttonHeight: {
    type: String,
    required: true
  },
  buttonWidth: {
    type: String,
    default: '100%'
  },
  border: {
    type: String,
    default: '10px'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'default'
  },
  fullWidth: {
    type: Boolean,
    default: true
  }
});
const attrs = useAttrs();
</script>
<style scoped lang="scss">
.button-gradient-blue {
  font-family: $base-font;
  font-weight: 500;
  border-radius: calcWidth(12);
  letter-spacing: 0.6px;
  font-size: calcWidth(24);
  @apply flex justify-center items-center;
  max-width: 100%;
  width: fit-content;
  background: $gradient-skyblue-blue;
  @media screen and ($media-lg-query) {
    font-size: calculateVw768(24);
    border-radius: calculateVw768(12);
  }
  @media screen and ($media-md-query) {
    font-size: calculateVw425(24);
    border-radius: calculateVw425(12);
  }

  &:hover {
    transition: 0.2s;
    box-shadow: 0 10px 40px 0 rgba(54, 51, 208, 0.6);
  }
  &--size--default {
    height: calcWidth(50);
    padding: calcWidth(18) calcWidth(50);
    @media screen and ($media-lg-query) {
      padding: calculateVw768(18) calculateVw768(50);
      height: calculateVw768(50);
    }
    @media screen and ($media-md-query) {
      padding: calculateVw425(16) calculateVw425(50);
      height: calculateVw425(50);
    }
  }
  &--size-big {
    padding: 0 40px;
  }
  &--fullwidth {
    width: 100%;
  }
  &:disabled {
    opacity: 0.5;
  }
}
</style>
