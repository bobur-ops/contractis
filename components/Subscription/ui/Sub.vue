<template>
  <article class="subscription__sub">
    <div class="subscription__sub-left">
      <h3 class="subscription__sub-title">
        Количество месяцев действия подписки
      </h3>
      <subscription-ui-range />
    </div>
    <div class="subscription__sub-sum">
      <div class="subscription__sub-sum-percent">-20%</div>
      <span class="subscription__sub-sum-new">5499 ₽</span>
      <span class="subscription__sub-sum-old">6000 ₽</span>
    </div>
    <img
      src="assets/images/astronauts/astronaut-sub.png"
      alt="astronaut"
      class="subscription__sub-astronaut"
    />
  </article>
</template>

<script setup></script>

<style scoped lang="scss">
.subscription__sub {
  @apply flex relative;
  margin-bottom: $space-large-plus;
  border-radius: 12px;
  border: 1px solid $border-block;
  background: $bg-black-block;
  padding: $space-x-large;
  max-width: 1213px;
  min-height: 253px;
  color: $white;
  &-astronaut {
    @apply absolute;
    bottom: -108%;
    right: -160px;
  }
  &-left {
    @apply flex flex-col;
    width: 938px;
  }
  &-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 16px;
    margin-bottom: $space-xx-large-plus;
  }
  &-sum {
    @apply flex flex-col;
    margin-top: $space-small-plus;
    gap: $space-small;
    &-new {
      line-height: 34px;
      font-weight: 500;
      font-size: 48px;
    }
    &-old {
      line-height: 26px;
      font-weight: 500;
      font-size: 36px;
      color: $gray-50;
      text-decoration-line: line-through;
    }
    &-percent {
      @apply flex justify-center items-center;
      line-height: 17px;
      width: 77px;
      height: 29px;
      border-radius: 10px;
      background: $light-red;
      font-size: 20px;
      font-weight: 500;
    }
  }
}
</style>
