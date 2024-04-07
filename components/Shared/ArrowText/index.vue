<template>
  <div
    class="arrow-text"
    :class="{
      'arrow-text_base': fontFamily === 'base',
      'arrow-text_title': fontFamily === 'title',
      'arrow-text_logo': fontFamily === 'logo',
      'flex-row-reverse': revers,
      'arrow-text_red': color === 'red',
      'size-sm': size === 'sm',
      'size-md': size === 'md',
      'size-lg': size === 'lg'
    }"
  >
    <slot />
    <div class="arrow-block__icon" :class="{ 'rotate-180': revers }">
      <Transition v-if="color === 'white'" name="fade">
        <svgo-arrow v-if="!hover" class="arrow-icon" />
        <svgo-arrow-hover v-else class="arrow-icon-active" />
      </Transition>
      <Transition v-else-if="color === 'red'" name="fade">
        <svgo-red-arrow v-if="!hover" class="arrow-icon" />
        <svgo-red-arrow-hover v-else class="arrow-icon-active" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fontSize: { type: String, required: true },
  fontWeight: { type: String, required: true },
  fontFamily: { type: String, default: 'base' },
  arrowHeight: { type: String, default: '10px' },
  arrowGap: { type: String, default: '10px' },
  hover: { type: Boolean, default: false },
  revers: { type: Boolean, default: false },
  arrowColor: { type: String, default: '1' },
  color: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'red'].includes(value)
  },
  size: {
    type: String,
    default: 'md'
  }
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translate(calcWidth(-10));
  opacity: 0;
}
.arrow-icon {
  height: v-bind(arrowHeight);
  position: absolute;
  fill-opacity: v-bind(arrowColor);
}
.arrow-icon-active {
  height: v-bind(arrowHeight);
  position: absolute;
}
.arrow-block__icon {
  @apply relative items-center flex;
  height: calcWidth(8);
  width: calcWidth(4);
  @media screen and ($media-lg-query) {
    height: calculateVw768(8);
    width: calculateVw768(4);
  }
  @media screen and ($media-md-query) {
    height: calculateVw425(8);
    width: calculateVw425(4);
  }
}
.arrow-text {
  @apply flex items-center;
  gap: v-bind(arrowGap);
  /* font-size: v-bind(fontSize); */
  font-weight: 500;
  color: rgba($color: #fff, $alpha: 0.9);

  &.size-lg {
  }
  &.size-md {
    font-size: calcWidth(18);
    white-space: nowrap;
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(18);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(13);
    }
  }
  &.size-sm {
    font-size: calcWidth(14);
    white-space: nowrap;
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(14);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(10);
    }
  }
  &_base {
    font-family: $base-font;
  }
  &_title {
    font-family: $title-font;
  }
  &_logo {
    font-family: $logo-font;
  }
  &_red {
    color: $light-red;
  }
}
</style>
