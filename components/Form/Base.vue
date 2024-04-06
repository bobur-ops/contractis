<template>
  <form class="form" autocomplete="off" @submit.prevent="submitForm">
    <div class="form-labels">
      <slot name="labels" />
    </div>
    <div class="form-buttons">
      <slot name="buttons" />
    </div>
  </form>
</template>

<script setup>
defineProps({
  gapLabels: { type: String, default: '15px' }
});
const emits = defineEmits(['submit-form']);
const submitForm = () => {
  emits('submit-form');
};
</script>

<style scoped lang="scss">
@import 'style';
.form {
  &-labels {
    @apply flex flex-col;
    gap: v-bind(gapLabels);
  }
}
</style>
