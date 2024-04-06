<template>
  <div class="subscription__sub-range">
    <ul class="subscription__sub-range-nums">
      <li
        v-for="item in 12"
        :key="item"
        class="subscription__sub-range-nums-item"
        :class="{
          'subscription__sub-range-nums-item_selected': +rangeValue === item
        }"
      >
        {{ item }}
      </li>
    </ul>
    <div class="subscription__sub-range-block">
      <input
        v-model="rangeValue"
        type="range"
        :min="minValue"
        :max="maxValue"
        class="subscription__sub-range-input"
      />
      <progress :value="rangeValue - 0.48" max="12" />
    </div>
  </div>
</template>

<script setup>
const rangeValue = ref(6);
const minValue = 1;
const maxValue = 12;

const transform = computed(() => {
  if (+rangeValue.value <= 9) return 'translateX(-18px)';
  else if (+rangeValue.value === 10) return 'translateX(-10px)';
  else if (+rangeValue.value === 11) return 'translateX(4px)';
  else return 'translateX(17px)';
});
</script>

<style scoped lang="scss">
.subscription__sub-range {
  @apply flex flex-col relative;
  max-width: 892px;
  &-input {
    @apply cursor-pointer justify-items-center;
    z-index: $z-index-2;
    width: 100%;
    height: 14px;
    border-radius: $space-x-big-plus;
    -webkit-appearance: none;
    appearance: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    background: transparent;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      @apply flex flex-col;
      border: 2px solid $white;
      background: $gradient-skyblue-blue;
      box-shadow: 0 0 28.239px 0 rgba(0, 0, 0, 0.4);
      width: 55px;
      height: 30px;
      border-radius: 25px;
      transform: v-bind(transform);
    }
  }
  &-block {
    @apply w-full relative flex flex-col;
  }
  &-nums {
    @apply flex justify-between;
    width: 100%;
    margin: 0 0 24px 0;
    &-item {
      line-height: 14px;
      font-family: $title-font;
      font-size: 22px;
      color: $gray;
      transition: transform 0.2s;
      &_selected {
        transform: translate(0, -10px);
        color: $white;
        font-weight: 600;
      }
    }
  }
}
progress {
  @apply w-full absolute;
  border-radius: $border-radius-rounded;
  &::-webkit-progress-bar {
    background-color: $gray-30;
    border-radius: $border-radius-m;
  }
  &::-webkit-progress-value {
    background-color: #3633d0;
    border-radius: $border-radius-m;
  }
}
</style>
