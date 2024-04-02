<template>
  <button class="gradient-button">
    <span class="gradient-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup>
defineProps({
  width: { type: String, required: true },
  height: { type: String, required: true },
  fontSize: { type: String, required: true },
  fontWeight: { type: String, required: true },
  className: { type: String, default: '' }
});
</script>

<style scoped lang="scss">
.gradient-button {
  @apply flex justify-center items-center;
  color: $white;
  background: url('/assets/images/buttons/gradient-button.svg');
  height: 37px;
  padding: 15px 25px;
  @media screen and ($media-lg-query) {
    padding: 15px 40px;
    height: 45px;
  }
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  /* width: v-bind(width);
  height: v-bind(height); */
  background-blend-mode: color;
  //&:hover {
  //  mask-image: url("/assets/images/buttons/gradient-button.svg");
  //  background: rgba(0, 0, 0, 0.28);
  //}
  &__text {
    @apply flex items-center;
    gap: 10px;
    font-family: $base-font;
    font-size: 13px;
    white-space: nowrap;
    font-weight: 500;
    @media screen and ($media-lg-query) {
      font-size: 18px;
      font-weight: 500;
    }
  }
}
</style>
