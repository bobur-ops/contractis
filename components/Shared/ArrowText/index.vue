<template>
  <div
    class="arrow-text"
    :class="{
      'arrow-text_base': fontFamily === 'base',
      'arrow-text_title': fontFamily === 'title',
      'arrow-text_logo': fontFamily === 'logo',
      'flex-row-reverse': revers,
      'arrow-text_red': color === 'red',
      'size-medium': size === 'medium'
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
  fontSize: { type: String, required: false },
  fontWeight: { type: String, required: false },
  fontFamily: { type: String, default: 'base' },
  arrowHeight: { type: String, default: '10px' },
  arrowGap: { type: String, default: '10px' },
  hover: { type: Boolean, default: false },
  revers: { type: Boolean, default: false },
  arrowColor: { type: String, default: '1' },
  size: { type: String, default: 'medium' },
  color: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'red'].includes(value)
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
  transform: translate(-10px);
  opacity: 0;
}
.arrow-icon {
  height: 10px;
  width: 100%;
  /* height: v-bind(arrowHeight); */
  position: absolute;
  fill-opacity: v-bind(arrowColor);
}
.arrow-icon-active {
  height: v-bind(arrowHeight);
  position: absolute;
}
.arrow-block__icon {
  @apply relative items-center flex;
  height: pxToRem(10);
  width: pxToRem(12);
}
.arrow-text {
  @apply flex items-center;
  /* gap: v-bind(arrowGap);
  font-size: v-bind(fontSize);
  font-weight: v-bind(fontWeight); */
  font-size: inherit;
  font-weight: inherit;
  gap: pxToRem(10);
  color: rgba($color: #fff, $alpha: 0.9);
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
