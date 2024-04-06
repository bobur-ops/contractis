<template>
  <ul v-if="files.length" class="order-card-files">
    <li
      v-for="(file, index) in files"
      :key="index"
      class="order-card-files__item"
    >
      <component :is="fileExtensions[index]" class="order-card-files__icon" />
      <p class="order-card-files__name">
        {{ file.name }}
      </p>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  files: { type: Object, default: () => {} },
  marginBottom: { type: String, default: '20px' },
  label: { type: String, default: 'Приложенные файлы:' }
});
const fileExtensions = computed(() => {
  const extensions = [];
  for (const file of props.files) {
    extensions.push(
      `SvgoFiles${
        file.name.split('.').pop().charAt(0).toUpperCase() +
        file.name.split('.').pop().slice(1)
      }`
    );
  }
  return extensions;
});
</script>

<style scoped lang="scss">
.order-card-files {
  @apply flex;
  gap: $space-small-plus;
  margin-bottom: v-bind(marginBottom);
  &__item {
    @apply flex flex-col justify-center;
    width: 95px;
    padding: 8px 8px 5px 8px;
    gap: 8px;
    line-height: 12px;
    font-weight: 500;
    font-size: 12px;
    background: $white;
    color: $black;
    border-radius: $border-radius-s;
  }
  &__icon {
    width: 56px;
    align-self: center;
  }
  &__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $black-text;
    font-size: 12px;
    line-height: 18px;
  }
}
</style>
