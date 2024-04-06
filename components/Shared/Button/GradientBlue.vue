<template>
  <button :disabled="disabled" :type="attrs.type" class="button-gradient-blue">
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
  }
});
const attrs = useAttrs();
</script>
<style scoped lang="scss">
.button-gradient-blue {
  font-family: $base-font;
  font-weight: 600;
  border-radius: v-bind(border);
  letter-spacing: 0.6px;
  font-size: v-bind(fontSize);
  @apply flex justify-center items-center;
  height: v-bind(buttonHeight);
  max-width: 100%;
  width: v-bind(buttonWidth);
  background: $gradient-skyblue-blue;
  &:hover {
    transition: 0.2s;
    box-shadow: 0 10px 40px 0 rgba(54, 51, 208, 0.6);
  }
}
</style>
