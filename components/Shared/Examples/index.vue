<template>
  <article class="examples">
    <h2
      v-if="label"
      class="examples__title"
      :class="{
        examples__title_small: type === 'extended'
      }"
    >
      {{ label }}
    </h2>
    <ul class="examples__list">
      <shared-examples-item
        v-for="(example, id) in examples"
        :key="id"
        :example="example"
      />
    </ul>
  </article>
</template>

<script setup>
defineProps({
  examples: { type: Array, required: true },
  type: { type: String, default: 'default' },
  label: { type: String, default: 'Примеры работ' }
});
</script>

<style scoped lang="scss">
.examples {
  &__title {
    font-weight: 600;
    font-size: 18px;
    line-height: 15px;
    margin-bottom: $space-small-plus;
    &_small {
      font-size: 14px;
    }
  }
  &__list {
    @apply flex flex-wrap justify-between;
  }
}
</style>
