<template>
  <div id="team" class="profile-team">
    <div class="profile-team__top">
      <h2 class="profile-team__title">Сотрудники в лицах</h2>
      <shared-button-ghost
        height="42px"
        padding="0 25px"
        font-size="18px"
        font-weight="500"
        @click.prevent="addEmployee"
      >
        Добавить сотрудника
      </shared-button-ghost>
    </div>
    <ul v-if="userData.user.profile.team?.length" class="profile-team__list">
      <li
        v-for="human in userData.user.profile.team"
        :key="human.id"
        class="profile-team__human"
      >
        <img
          v-if="human.avatarPath"
          class="profile-team__avatar"
          src="/assets/images/avatars/avatar.png"
          alt="avatar"
        />
        <profile-ui-default-avatar v-else class="profile-team__avatar" />
        <p class="profile-team__name">
          {{ human.firstName }} {{ human.lastName }}
        </p>
        <p class="profile-team__role">
          {{ human.role }}
        </p>
        <shared-arrow-text
          font-size="12px"
          font-weight="500"
          color="red"
          class="profile-team__delete"
        >
          Удалить
        </shared-arrow-text>
      </li>
    </ul>
    <div v-else class="profile-team__no-team">
      <p class="profile-team__no-team-text">У вас пока нет сотрудников</p>
    </div>
  </div>
</template>

<script setup>
const userData = useUserData();
const emit = defineEmits(['addEmployee']);
const addEmployee = () => emit('addEmployee');
</script>

<style scoped lang="scss">
.profile-team {
  background: $bg-black-block;
  padding: $space-large;
  border-radius: $border-radius-m;
  min-height: 295px;
  max-width: 1000px;
  &__top {
    @apply flex justify-between items-center;
    margin-bottom: $space-medium-plus;
  }
  &__title {
    font-weight: 600;
    font-size: 24px;
  }
  &__no-team {
    @apply flex justify-center items-center;
    height: 150px;
  }
  &__no-team-text {
    font-size: 20px;
    font-weight: 400;
    color: $gray-60;
  }
  &__list {
    @apply grid w-full;
    grid-template-columns: 155px 155px 155px 155px 155px;
    row-gap: 60px;
    column-gap: 40px;
  }
  &__human {
    @apply flex flex-col items-center relative;
    &:hover .profile-team__delete {
      z-index: $z-index-1;
      opacity: 1;
    }
  }
  &__avatar {
    height: 100px;
    width: 100px;
    border-radius: $border-radius-rounded;
    margin-bottom: $space-smaller;
  }
  &__name {
    font-size: 16px;
    font-weight: 500;
  }
  &__role {
    font-size: 12px;
    font-weight: 400;
    color: $gray-50;
  }
  &__delete {
    @apply absolute cursor-pointer;
    bottom: -25px;
    height: 25px;
    padding-top: 10px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    z-index: $z-index-0;
    transition: 0.2s;
  }
}
</style>
