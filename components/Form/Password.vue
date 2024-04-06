<template>
  <div class="form-field">
    <label
      :for="id"
      :class="{
        'form-field__label_error': statusError || isValidateError
      }"
      class="form-field__label"
    >
      <span v-if="!statusError" style="color: inherit">
        {{ label }}
      </span>
      <span
        v-else-if="statusError === 401"
        style="color: inherit; font-weight: 500"
      >
        {{ messageError }}
      </span>
      <span v-else style="color: inherit"> Неверный логин или пароль </span>
    </label>
    <div class="form-field__input">
      <form-input
        :id="id"
        :model-value="passwordModel.text"
        :placeholder="placeholder"
        :type="passwordType"
        :status-error="statusError"
        class="form-field__password-input"
        @update:model-value="updateValue"
      />
      <svgo-input-eye-close
        v-if="passwordType === 'password'"
        class="form-field__input-switcher"
        @click.prevent="passwordShow"
      />
      <svgo-input-eye-open
        v-if="passwordType === 'text'"
        class="form-field__input-switcher"
        @click.prevent="passwordShow"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  isValidateError: {
    type: Boolean,
    default: false
  },
  messageError: {
    type: String,
    default: null
  },
  statusError: {
    type: Number,
    default: () => null
  }
});

const emits = defineEmits(['update:modelValue', 'clearError']);
const updateValue = (value) => {
  emits('update:modelValue', value);
};

const passwordModel = ref({
  text: ''
});
const passwordType = ref('password');
const passwordShow = () => {
  passwordType.value === 'password'
    ? (passwordType.value = 'text')
    : (passwordType.value = 'password');
};
</script>

<style scoped lang="scss">
@import './style';
</style>
