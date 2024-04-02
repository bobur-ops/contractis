<template>
  <label
    :class="['checkbox', className]"
    :for="id"
    class="wrapper flex items-center"
  >
    <input
      :id="id"
      type="checkbox"
      tabindex="0"
      role="checkbox"
      class="checkbox"
    />
    <span class="checkmark"></span>
    <span class="checkbox-text">
      <slot />
    </span>
  </label>
</template>

<script setup>
defineProps({
  gap: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: '1'
  },
  className: {
    type: String,
    default: ''
  }
});
</script>
<style scoped lang="scss">
.wrapper {
  @apply relative flex cursor-pointer;
  gap: v-bind(gap);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkbox-text {
  font-size: calcHeight(16px);
  font-weight: 300;
  font-family: $base-font;
}
/* Hide the browser's default checkbox */
.wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
/* Create a custom checkbox */
.checkmark {
  @apply flex justify-center items-center;
  top: 0;
  left: 0;
  flex-shrink: 0;
  height: calcHeight(24px);
  width: calcHeight(24px);
  border-radius: 4px;
  background: url('/assets/icons/check-off.svg') no-repeat center center;
  background-size: cover;
}
/* When the checkbox is checked, add a blue background */
.wrapper input:checked ~ .checkmark {
  background: url('/assets/icons/check-on.svg') no-repeat center center
    $checkbox-color;
}
</style>
