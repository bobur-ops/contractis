<template>
  <div id="gallery" class="profile-gallery">
    <div class="profile-gallery__top">
      <h2 class="profile-gallery__title">Медиа-галерея</h2>
      <shared-button-ghost
        height="42px"
        padding="0 25px"
        font-size="18px"
        font-weight="500"
        @click.prevent="addMedia"
      >
        Добавить медиа
      </shared-button-ghost>
    </div>
    <div v-if="userData.user.profile.gallery?.length"></div>
    <div v-else class="profile-gallery__no-photos">
      <p class="profile-gallery__no-photos-text">У вас пока нет медиа</p>
    </div>
  </div>
</template>

<script setup>
const userData = useUserData();
const emit = defineEmits(['addMedia']);
const addMedia = () => emit('addMedia');
</script>

<style scoped lang="scss">
.profile-gallery {
  background: $bg-black-block;
  padding: $space-large;
  border-radius: $border-radius-m;
  min-height: 230px;
  max-width: 1000px;
  &__top {
    @apply flex justify-between items-center;
    margin-bottom: $space-medium-plus;
  }
  &__title {
    font-weight: 600;
    font-size: 24px;
  }
  &__no-photos {
    @apply flex justify-center items-center;
    height: 150px;
  }
  &__no-photos-text {
    font-size: 20px;
    font-weight: 400;
    color: $gray-60;
  }
}
</style>
