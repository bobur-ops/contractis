<template>
  <div class="profile-default-avatar">
    <svgo-profile-standart-avatar class="profile-default-avatar__icon" />
  </div>
</template>

<style scoped lang="scss">
.profile-default-avatar {
  @apply flex justify-center items-center;
  border-radius: $border-radius-rounded;
  background: $black;
  &__icon {
    height: 36%;
  }
}
</style>
