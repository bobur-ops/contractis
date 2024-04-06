<template>
  <div class="checkbox">
    <label class="checkbox__inner">
      <form-input
        :id="id"
        :model-value="inputModel.checked"
        type="checkbox"
        class="checkbox"
        @update:model-value="updateValue"
      />
      <span class="checkbox__mark"></span>
      <span class="checkbox-text" :class="{ truncate: truncate }">
        <slot />
      </span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  gap: { type: String, default: '5px' },
  id: { type: String, required: true },
  modelValue: { type: Boolean, required: true },
  initVal: { type: Boolean, default: false },
  truncate: { type: Boolean, default: false }
});
const inputModel = computed(() => {
  return { checked: props.modelValue };
});
onMounted(() => {
  updateValue(props.initVal);
});
const emit = defineEmits(['update:modelValue']);
const updateValue = (value) => {
  inputModel.value.checked = value;
  emit('update:modelValue', value);
  inputModel.value.checked = props.modelValue;
};
watch(
  () => props.initVal,
  () => (inputModel.value.checked = props.initVal)
);
</script>
<style scoped lang="scss">
.checkbox__inner {
  @apply relative flex cursor-pointer items-start select-none;
  gap: v-bind(gap);
}
.checkbox {
  &-text {
    font-size: 16px;
    line-height: 24px;
    &:hover {
      transition: 0.2s;
      color: $gray;
    }
  }
  &__inner input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ .checkbox__mark {
      background:
        url('/assets/icons/check-on.svg') no-repeat center center,
        $gradient-skyblue-blue;
    }
  }
  &__mark {
    @apply flex justify-center items-center;
    top: 0;
    left: 0;
    height: 24px;
    min-width: 24px;
    border-radius: 4px;
    background: url('/assets/icons/check-off.svg') no-repeat center center;
    background-size: cover;
  }
}
</style>
