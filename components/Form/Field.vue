<template>
  <div class="form-field">
    <span class="form-field__label" :class="{ 'form-field--error': error }">
      {{ error ? error : label }}
    </span>
    <div class="form-field__input">
      <form-input
        :id="id"
        v-model="inputModel.text"
        :type="passwordType"
        autocomplete-type="on"
        :placeholder="placeholder"
        :error="error"
      />
      <svgo-input-eye-close
        v-if="type === 'password' && passwordType === 'password'"
        class="form-field__input-switcher"
        @click.prevent="passwordShow"
      />
      <svgo-input-eye-open
        v-if="type === 'password' && passwordType === 'text'"
        class="form-field__input-switcher"
        @click.prevent="passwordShow"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
});

const inputModel = ref({
  text: ''
});

const passwordType = ref(props.type);
const passwordShow = () => {
  passwordType.value === 'password'
    ? (passwordType.value = 'text')
    : (passwordType.value = 'password');
};
</script>

<style scoped lang="scss">
@import 'style';
</style>
