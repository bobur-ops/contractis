<template>
  <div id="technologies" class="profile-technologies">
    <div class="profile-technologies__top">
      <div class="profile-technologies__title-block">
        <h2 class="profile-technologies__title">Технологии</h2>
        <order-card-ui-aside-color-block
          :value="userData.user.profile.technologies?.length ?? 0"
          color="blue"
        />
      </div>
      <shared-button-ghost
        height="42px"
        padding="0 25px"
        font-size="18px"
        font-weight="500"
        @click.prevent="addTechnology"
      >
        Добавить технологию
      </shared-button-ghost>
    </div>
    <shared-technologies
      v-if="userData.user.profile.technologies?.length"
      :technologies="userData.user.profile.technologies"
      view="block"
      :delete-possible="true"
      :per-line="8"
      @delete-technology="deleteTechnology"
    />
    <div v-else class="profile-technologies__no-team">
      <p class="profile-technologies__no-team-text">
        У вас пока нет технологий
      </p>
    </div>
  </div>
</template>

<script setup>
const userData = useUserData();
const deleteTechnology = (id) => {
  console.log(id);
};
const emit = defineEmits(['addTechnology']);
const addTechnology = () => emit('addTechnology');
</script>

<style scoped lang="scss">
.profile-technologies {
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
  &__title-block {
    @apply flex items-center;
    gap: 20px;
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
    grid-template-columns: 75px 75px 75px 75px 75px 75px 75px 75px;
    row-gap: $space-xx-large;
    column-gap: $space-x-large;
  }
  &__technology {
    @apply flex flex-col items-center relative justify-between;
    gap: $space-smaller;
    height: 85px;
    &:hover .profile-technologies__delete {
      z-index: $z-index-1;
      opacity: 1;
    }
  }
  &__icon-block {
    @apply flex items-center;
    height: 48px;
  }
  &__icon {
    width: 48px;
  }
  &__technology-name {
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
