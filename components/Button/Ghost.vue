<template>
  <button class="ghost-button">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  width: { type: String, required: true },
  height: { type: String, required: true },
  fontSize: { type: String, required: true },
  fontWeight: { type: String, required: true }
});
</script>

<style scoped lang="scss">
.ghost-button {
  @apply flex justify-center items-center;
  border-radius: $border-radius-m;
  border: 1px solid $white;
  color: $white;
  height: 37px;
  white-space: nowrap;
  font-size: 13px;
  padding: 15px 25px;
  @media screen and ($media-lg-query) {
    padding: 15px 40px;
    height: 45px;
    font-size: 18px;
  }
}
</style>
