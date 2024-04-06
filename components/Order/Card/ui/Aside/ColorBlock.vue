<template>
  <div
    v-if="typeof value === 'number'"
    class="order-card-aside-color-block"
    :class="{
      'background-blue': color === 'blue',
      'background-green': color === 'green',
      'background-red': color === 'red'
    }"
  >
    {{ value }}
  </div>
  <ul
    v-else-if="typeof value === 'object'"
    class="order-card-aside-color-block__list"
  >
    <li class="order-card-aside-color-block background-green">
      {{ value.positive }}
    </li>
    <li class="order-card-aside-color-block background-red">
      {{ value.negative }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  value: { type: [Number, Object], required: true },
  color: {
    type: String,
    required: true,
    validator: (value) => ['blue', 'red', 'green'].includes(value)
  },
  borderRadius: { type: String, default: '10px' }
});
</script>

<style scoped lang="scss">
.order-card-aside-color-block {
  @apply w-fit h-fit;
  padding: 6px 10px;
  line-height: 10px;
  border-radius: v-bind(borderRadius);
  font-size: 14px;
  font-weight: 400;
  &__list {
    @apply flex;
    gap: $space-smaller;
  }
}
.background {
  &-blue {
    @include color-block('blue');
  }
  &-red {
    @include color-block('red');
  }
  &-green {
    @include color-block('green');
  }
}
</style>
