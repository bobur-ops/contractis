<template>
  <article class="header-actions-user-card">
    <img
      v-if="userData.user.avatarPath"
      src="/assets/images/avatars/avatar.png"
      alt="avatar"
      class="header-actions-user-card__avatar"
    />
    <profile-ui-default-avatar
      v-else
      class="header-actions-user-card__avatar"
    />
    <div class="header-actions-user-card__data" @click="logOut">
      <span
        v-if="userData.user?.firstName"
        class="header-actions-user-card__data-name"
      >
        {{ trimText(userData.user?.firstName, 5, '.') }}
        {{
          userData.user?.lastName
            ? trimText(userData.user?.lastName, 1, '.')
            : null
        }}
      </span>
      <span v-else class="header-actions-user-card__data-name">
        user_{{ userData.user?.id }}
      </span>
      <div class="header-actions-user-card__data-subscription">Подписка</div>
    </div>
    <svgo-arrow class="header-actions-user-card__arrow" />
  </article>
</template>

<script setup>
defineProps({
  userData: { type: Object, required: true }
});
const { trimText } = useFormatting();
const router = useRouter();

const { token: userToken, clearToken } = useStore();

const user = useUserData();

const logOut = () => {
  if (userToken.value) {
    user.value = null;
    clearToken();
    router.push('/auth/login');
  }
};
</script>

<style scoped lang="scss">
.header-actions-user-card {
  @apply flex h-fit items-center;
  cursor: pointer;
  max-width: 150px;
  &__avatar {
    @apply flex;
    outline: 3px solid white;
    outline-offset: 2px;
    box-sizing: content-box;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: $border-radius-rounded;
    margin-right: $space-small-plus;
  }
  &__data {
    @apply flex flex-col;
    gap: 4px;
    margin-right: $space-smaller;
    &-name {
      font-weight: 600;
      font-size: 15px;
      line-height: 16px;
      white-space: nowrap;
    }
    &-subscription {
      @apply flex justify-center items-center w-fit;
      background: $gradient-skyblue-blue-20;
      border: 1px solid #211cf2;
      border-radius: 6px;
      font-size: 9px;
      font-weight: 400;
      line-height: 6px;
      padding: 4px 7px;
    }
  }
  &__arrow {
    @apply flex;
    flex-shrink: 0;
    height: 8px;
  }
}
</style>
