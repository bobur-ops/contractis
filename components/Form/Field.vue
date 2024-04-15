<template>
  <div class="form-field">
    <label
      v-if="label"
      :id="id"
      class="form-field__label"
      :class="{
        'form-field__label_error': statusError || isValidateError
      }"
      :style="styles.label"
    >
      {{ label }}
    </label>
    <form-input
      :id="id"
      :model-value="inputModel.text"
      :type="type"
      autocomplete-type="on"
      :placeholder="placeholder"
      :status-error="statusError"
      :style="styles.input"
      :input-mode="inputMode"
      :mask="mask"
      @update:model-value="updateValue"
    />
    <span v-if="limit" class="form-field__limit">{{ limit }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true },
  type: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  modelValue: { type: [String, Number], required: true },
  isValidateError: { type: Boolean, default: false },
  statusError: { type: Number, default: () => null },
  limit: { type: String, default: '' },
  gap: { type: String, default: '15px' },
  size: { type: String, default: 'default' },
  inputMode: {
    type: String,
    default: 'text',
    validator: (value) =>
      ['text', 'tel', 'numeric', 'search', 'email'].includes(value)
  },
  mask: { type: String, default: '' }
});

const styles = computed(() => {
  switch (props.size) {
    case 'default':
      return {
        label: {
          'font-size': '16px',
          'font-weight': '400'
        },
        input: {
          'font-size': '16px'
        }
      };
    case 'big':
      return {
        label: {
          'font-size': '18px',
          'font-weight': '500'
        },
        input: {
          'font-size': '18px'
        }
      };
  }
});

const emit = defineEmits(['update:modelValue']);

const inputModel = ref({
  text: props.modelValue
});
const updateValue = (value) => {
  emit('update:modelValue', value);
};
</script>

<style scoped lang="scss">
@import 'style';
.form-field {
  gap: v-bind(gap);
}
</style>
