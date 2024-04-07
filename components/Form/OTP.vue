<template>
  <div ref="inputOTP" class="input-OTP">
    <input
      v-for="(el, ind) in digitCount"
      :key="el + ind"
      v-model="digits[ind]"
      type="number"
      class="input-OTP__digit-input"
      :class="{ 'input-OTP__digit-input_active': digits[ind] !== null }"
      maxlength="2"
      autocomplete="off"
      @keydown="handleInput($event, ind)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  digitCount: { type: Number, required: true }
});
const emit = defineEmits(['update:modelValue']);
const digits = reactive([]);
for (let i = 0; i < props.digitCount; i++) digits[i] = null;
const inputOTP = ref(null);
const handleInput = (event, index) => {
  if (
    event.key !== 'Tab' &&
    event.keyCode !== 116 &&
    event.key !== 'ArrowRight' &&
    event.key !== 'ArrowLeft'
  ) {
    event.preventDefault();
  }

  if (event.key === 'Backspace') {
    if (digits[index] == null) {
      digits[index - 1] = null;
      if (index !== 0 && index !== props.digitCount)
        inputOTP.value.children[index - 1].focus();
    } else digits[index] = null;
    emit('update:modelValue', digits.join(''));
    return;
  }

  if (new RegExp('^([0-9])$').test(event.key)) {
    digits.every((val, ind) => {
      if (val == null) {
        digits[ind] = event.key;
        if (ind !== props.digitCount - 1) {
          inputOTP.value.children[ind + 1].focus();
        }
        return false;
      } else return true;
    });
  }
  emit('update:modelValue', digits.join(''));
};
</script>

<style scoped lang="scss">
.input-OTP {
  @apply w-full flex justify-between;
  &__digit-input {
    @apply flex text-center relative;
    font-size: calcWidth(36);
    font-weight: 500;
    width: calcWidth(58);
    height: calcWidth(65);
    color: $white;
    transition: 0.1s;
    background:
      linear-gradient($bg-inputs, $bg-inputs) padding-box,
      $border-block border-box;
    border: 1px solid transparent;
    /* border: 1px solid $border-block; */
    border-radius: calcWidth(20);
    @media screen and ($media-lg-query) {
      font-size: calculateVw768(36);
      width: calculateVw768(58);
      height: calculateVw768(65);
      border-radius: calculateVw768(20);
    }
    @media screen and ($media-md-query) {
      font-size: calculateVw425(36);
      width: calculateVw425(58);
      height: calculateVw425(65);
      border-radius: calculateVw425(20);
    }
    &_active,
    &:focus {
      background:
        linear-gradient($bg-inputs, $bg-inputs) padding-box,
        $gradient-skyblue-blue border-box;
    }
  }
}
</style>
