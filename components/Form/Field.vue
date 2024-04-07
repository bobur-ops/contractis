<template>
  <div class="form-field">
    <label
      v-if="label"
      :id="id"
      class="form-field__label"
      :class="{
        'form-field__label_error': statusError || isValidateError,
        'form-field__label_big': size === 'big',
        'form-field__label_default': size === 'default'
      }"
    >
      {{ label }}
    </label>
    <form-input
      :id="id"
      :model-value="inputModel.text"
      :type="type"
      :class="{
        'form-input_error': statusError || isValidateError,
        'form-field__input_big': size === 'big'
      }"
      autocomplete-type="on"
      :placeholder="placeholder"
      :status-error="statusError || isValidateError"
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
  gap: calcWidth(12);
  @media screen and ($media-lg-query) {
    gap: calculateVw768(12);
  }
  @media screen and ($media-md-query) {
    gap: calculateVw425(12);
  }
  /* gap: v-bind(gap); */
}
.form-field {
  &__label {
    &_big {
      font-size: calcWidth(18);
      font-weight: 500;
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(18);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(14);
      }
    }
    &_default {
      font-size: calcWidth(16);
      font-weight: 400;
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(16);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(16);
      }
    }
  }
  &__input {
    &_big {
      font-size: calcWidth(18);
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(18);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(18);
      }
    }
    &_default {
      font-size: calcWidth(16);
      @media screen and ($media-lg-query) {
        font-size: calculateVw768(16);
      }
      @media screen and ($media-md-query) {
        font-size: calculateVw425(16);
      }
    }
  }
}
</style>
