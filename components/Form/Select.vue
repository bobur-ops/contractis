<template>
  <u-select-menu
    v-model="sortSelect"
    :options="sort"
    :ui-menu="{
      base: 'form-select__options',
      option: { base: 'form-select__base', active: 'form-select__active' },
      background: 'form-select__list'
    }"
    variant="none"
    selected-icon=""
    :value-attribute="sort?.code ?? sort?.id"
    :option-attribute="sort?.name"
    :disabled="!sort?.length"
  >
    <template #default="{ open }">
      <UButton
        class="form-select__button"
        :class="{
          'form-select__button_white': theme === 'white',
          'form-select__button_shadow': theme === 'shadow',
          'form-select__button_center': theme === 'center'
        }"
      >
        <p v-if="sortSelect" class="form-select__title">
          {{ sortSelect.name }}
        </p>
        <p v-else class="form-select__title">{{ placeholder }}</p>
        <u-icon
          v-if="sortSelect?.icon"
          :name="sortSelect.icon"
          class="form-select__option-icon"
        />
        <svgo-vector
          class="form-select__arrow"
          :class="{
            'transform -rotate-90': !open,
            'form-select__arrow_center': theme === 'center'
          }"
        />
      </UButton>
    </template>
    <template #option="{ option }">
      <span class="truncate form-select__option-label">
        {{ option.name }}
      </span>
      <u-icon
        v-if="option.icon"
        :name="option.icon"
        class="form-select__option-icon"
      />
    </template>
  </u-select-menu>
</template>

<script setup>
const props = defineProps({
  sort: { type: Array, required: true },
  placeholder: { type: String, required: true },
  width: { type: String, default: '100%' },
  height: { type: String, default: '55px' },
  initVal: { type: Object, default: undefined },
  theme: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'shadow', 'center'].includes(value)
  }
});
const sortSelect = ref(props.initVal);
watch(
  () => props.sort,
  () => (sortSelect.value = undefined)
);
</script>

<style scoped lang="scss">
.form-select {
  &__button,
  &__button:hover {
    @apply flex relative;
    width: v-bind(width);
    height: v-bind(height);
    font-size: 16px;
    font-weight: 500;
    border-radius: $border-radius-m;
    padding: 0 40px 0 25px;
  }
  &__button_white,
  &__button_white:hover {
    background: transparent;
    border: 1px solid $white;
  }
  &__button_shadow,
  &__button_shadow:hover {
    background: $bg-black-block;
    border: 1px solid $border-block;
  }
  &__button_center,
  &__button_center:hover {
    @apply justify-center;
    background: transparent;
    border: 1px solid $white;
    padding: 0 25px 0 25px;
  }
  &__title {
    color: $gray;
    @apply truncate;
  }
  &__arrow {
    @apply transition-transform absolute;
    height: 5px;
    right: 25px;
  }
  &__arrow_center {
    @apply static;
  }
  &__option-icon {
    min-width: 20px;
    min-height: 20px;
  }
}
</style>
<style lang="scss">
.form-select {
  &__options {
    border-radius: $border-radius-m;
    border: 1px solid $border-block;
    background: $bg-black-block !important;
  }
  &__base {
    background: $bg-black-block !important;
    height: 40px;
    font-size: 18px;
  }
  &__active {
    border: 1.5px solid $blue;
  }
  &__list {
    max-height: unset !important;
  }
}
</style>
