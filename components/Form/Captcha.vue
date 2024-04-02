<template>
  <div class="form-captcha">
    <form-checkbox :id="id" :gap="gap">{{ label }}</form-checkbox>
    <img
      class="form-captcha__image"
      src="/assets/images/form/captcha.png"
      alt="captcha"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  gap: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: '1'
  }
});
</script>

<style scoped lang="scss">
.form-captcha {
  @apply w-full flex items-center justify-between;
  height: calcHeight(55px);
  padding: 0 calcHeight(25px);
  border-radius: $border-radius-s;
  border: 1px solid $white;
  &__image {
    width: calcHeight(37px);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
