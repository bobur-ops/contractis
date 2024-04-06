<template>
  <article class="profile-view">
    <div class="profile-view__title-block">
      <svgo-question-block class="profile-view__icon" />
      <h3 class="profile-view__title">
        Не подражайте другим. Найдите себя и будьте собой.
      </h3>
    </div>
    <div class="profile-view__buttons-block">
      <shared-button-ghost
        font-size="18px"
        font-weight="500"
        arrow-gap="15px"
        height="40px"
        padding="0 25px"
        @click.prevent="toSettings"
      >
        Настройки
      </shared-button-ghost>
      <shared-button-ghost
        font-size="18px"
        font-weight="500"
        arrow-gap="15px"
        height="40px"
        padding="0 25px"
        @click.prevent="toLookAside"
      >
        Как видят Ваш профиль другие пользователи
      </shared-button-ghost>
    </div>
  </article>
</template>

<script setup>
const emit = defineEmits(['toSettings', 'toLookAside']);
const toSettings = () => emit('toSettings');
const toLookAside = () => emit('toLookAside');
</script>

<style scoped lang="scss">
.profile-view {
  @apply flex justify-between items-center;
  background: $bg-black-block;
  border-radius: $border-radius-m;
  padding: $space-small $space-small-plus;
  &__title-block {
    @apply flex items-center;
    gap: 15px;
  }
  &__icon {
    height: 20px;
    width: 20px;
  }
  &__buttons-block {
    @apply flex items-center;
    gap: 25px;
  }
}
</style>
