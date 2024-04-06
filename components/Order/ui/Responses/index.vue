<template>
  <div class="order-responses">
    <div class="order-responses__avatar-list">
      <img
        v-for="item in countAvatars"
        :key="item"
        class="order-responses__avatar-item"
        src="/assets/images/avatars/avatar.png"
        alt="avatar"
      />
    </div>
    <span class="order-responses__title">{{ responses }} откликов</span>
  </div>
</template>

<script setup>
const props = defineProps({
  responses: { type: Number, required: true }
});

const countAvatars = computed(() => {
  if (props.responses > 4) {
    return 4;
  } else return props.responses;
});
</script>

<style scoped lang="scss">
.order-responses {
  @apply inline-flex items-center;
  gap: $space-x-small;
  &__title {
    font-size: 14px;
    font-weight: 400;
    color: $gray-70;
    line-height: 100%;
  }
  &__avatar {
    &-list {
      @apply h-fit flex;
    }

    &-item {
      width: 22px;
      height: 22px;
      top: 0;
      border-radius: $border-radius-rounded;
      &:nth-child(2) {
        transform: translateX(-3px);
      }
      &:nth-child(3) {
        transform: translate(-6px);
      }
      &:nth-child(4) {
        transform: translate(-9px);
      }
    }
  }
}
</style>
