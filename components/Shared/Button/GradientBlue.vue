<template>
  <button
    :disabled="disabled"
    :type="attrs.type"
    class="button-gradient-blue"
    :class="`size-${size}`"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  fontSize: {
    type: String,
    required: false
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
    default: 'medium'
  }
});
const attrs = useAttrs();
</script>
<style scoped lang="scss">
.button-gradient-blue {
  @apply flex justify-center items-center;
  font-family: $base-font;
  letter-spacing: 0.6px;
  max-width: 100%;
  background: $gradient-skyblue-blue;
  width: 100%;
  &:hover {
    transition: 0.2s;
    box-shadow: 0 10px 40px 0 rgba(54, 51, 208, 0.6);
  }
  &.size-medium {
    font-size: pxToRem(18);
    font-weight: 500;
    border-radius: pxToRem(12);
    height: pxToRem(50);
    @media screen and ($media-md-query) {
      font-size: pxToRem(16);
      height: pxToRem(44);
    }
  }
}
</style>
