<template>
  <button class="button-gradient-blue">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: ''
  }
});
</script>
<style scoped lang="scss">
.button-gradient-blue {
  font-family: $base-font;
  font-weight: 500;
  border-radius: $border-radius-s;
  letter-spacing: 0.72px;
  font-size: calcHeight(20px);
  @apply w-full flex justify-center items-center;
  height: calcHeight(50px);
  background: $gradient-skyblue-blue;
}
</style>
