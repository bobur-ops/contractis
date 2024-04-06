<template>
  <input
    :id="id"
    v-model="value"
    v-maska
    :data-maska="mask"
    :data-maska-tokens="JSON.stringify(maskTokens)"
    :model-value="modelValue"
    class="form-input"
    :class="{ 'form-input_error': statusError }"
    :type="type"
    :autocomplete="autocompleteType"
    :checked="modelValue"
    :input-mode="inputMode"
    @change="updateValue"
  />
</template>

<script setup>
import { maskTokens } from '~/utils/masks/index.js';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: ''
  },
  autocompleteType: {
    type: String,
    default: 'off'
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  statusError: {
    type: Number,
    default: () => null
  },
  inputMode: {
    type: String,
    default: 'text',
    validator: (value) =>
      ['text', 'tel', 'numeric', 'search', 'email'].includes(value)
  },
  mask: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  const inputElement = event.target;
  if (props.type === 'checkbox') {
    emit('update:modelValue', inputElement.checked);
    inputElement.checked = props.modelValue;
  } else emit('update:modelValue', inputElement.value);
};
const value = ref(props.modelValue);
</script>

<style scoped lang="scss">
@import 'style';
</style>
