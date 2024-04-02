<template>
  <input
    :id="id"
    :model-value="modelValue"
    class="form-input"
    :class="{ 'form-input--error': error }"
    :type="type"
    :autocomplete="autocompleteType"
  />
</template>

<script setup>
defineProps({
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
    type: [String, Number],
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
});
</script>

<style scoped lang="scss">
@import 'style';
</style>
