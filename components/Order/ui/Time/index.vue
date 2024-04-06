<template>
  <div class="order-ui-time">
    <svgo-green-time class="order-ui-time__icon" />3 часа 25 минут назад
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.order-ui-time {
  @apply inline-flex items-center;
  line-height: 10px;
  color: $lite-green;
  font-size: 14px;
  gap: 10px;
  &__icon {
    width: 20px;
  }
}
</style>
