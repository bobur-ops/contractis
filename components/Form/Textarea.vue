<template>
  <div class="form-custom-textarea">
    <label
      :for="id"
      class="form-custom-textarea__label"
      :class="{
        'form-custom-textarea__label_error': isValidateError
      }"
    >
      {{ label }}
    </label>
    <textarea
      :id="id"
      v-model="text"
      :placeholder="placeholder"
      class="form-custom-textarea__input"
      :class="{ 'form-custom-textarea__input_shadow': theme === 'shadow' }"
      @update:model-value="updateValue"
    />
    <span v-if="limit" class="form-custom-textarea__limit">{{ limit }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true },
  placeholder: { type: String, default: '' },
  label: { type: String, required: true },
  modelValue: { type: String, required: true },
  limit: { type: String, default: '' },
  isValidateError: { type: Boolean, default: false },
  marginBottom: { type: String, default: '0' },
  theme: { type: String, default: 'white' },
  resize: { type: String, default: 'vertical' }
});

const emits = defineEmits(['update:modelValue']);
const text = ref(props.modelValue);

const updateValue = (value) => {
  emits('update:modelValue', value);
};
</script>

<style scoped lang="scss">
.form-custom-textarea {
  @apply flex flex-col relative;
  gap: $space-small-plus;
  margin-bottom: v-bind(marginBottom);
  &__label {
    line-height: 15px;
    font-size: 18px;
    font-weight: 600;
    &_error {
      color: $light-red !important;
    }
  }
  &__input {
    @apply w-full relative;
    min-height: 238px;
    padding: 60px 25px 60px 25px;
    line-height: 15px;
    font-size: 18px;
    background:
      url('assets/images/order/card/text-area-panel.svg') top -1px left -1px
        no-repeat,
      $bg-black-block;
    border: 1px solid $white;
    border-radius: $border-radius-s;
    resize: v-bind(resize);
    &::-webkit-resizer {
      @apply absolute;
      background: url('/assets/icons/Input/resizer.svg') no-repeat;
      width: 8px;
      height: 8px;
      bottom: 8px;
      right: 8px;
    }
    &_shadow {
      border: 1px solid $border-block;
    }
  }
  &__limit {
    @apply absolute;
    bottom: 13px;
    right: 25px;
    font-size: 18px;
    color: $border-block;
  }
}
</style>
