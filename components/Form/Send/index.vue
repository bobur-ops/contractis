<template>
  <form class="form-send" @submit.prevent="sendContent">
    <input
      type="text"
      class="form-send__input"
      :placeholder="placeholder"
      @keyup.enter="sendContent"
    />
    <shared-button-arrow class="form-send__button" @keyup.enter="sendContent" />
  </form>
</template>

<script setup>
defineProps({
  placeholder: { type: String, default: 'Введите промокод' },
  width: { type: String, default: '360px' },
  height: { type: String, default: '45px' }
});
const emits = defineEmits(['send-content']);
const sendContent = (data) => {
  emits('send-content', data);
};
</script>

<style scoped lang="scss">
.form-send {
  @apply relative overflow-hidden;
  width: v-bind(width);
  height: v-bind(height);
  background: inherit;
  border-radius: 11px;
  &__input {
    @apply w-full;
    height: v-bind(height);
    padding: 15px 58px 15px 18px;
    border: 1px solid $border-block;
    border-radius: 11px;
    font-weight: 400;
    background: inherit;
    transition: 0.2s;
    &:focus {
      border: 1px solid #211cf2;
    }
  }
  &__button {
    @apply absolute;
    right: 5px;
    top: 6px;
  }
}
</style>
