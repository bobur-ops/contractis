<template>
  <shared-button-edit @to-edit="toEdit">
    <aside
      v-if="userData.user.firstName && userData.user.type"
      class="profile-aside"
    >
      <header class="profile-aside__header">
        <img
          v-if="userData.user.avatarPath"
          class="profile-aside__avatar"
          src="/assets/images/avatars/avatar.png"
          alt="avatar"
        />
        <profile-ui-default-avatar v-else class="profile-aside__avatar" />
        <span class="profile-aside__name">
          {{ userData?.user.lastName }} {{ userData?.user.firstName }}
        </span>
        <nuxt-link
          v-if="userData?.user.profile.site"
          to="#"
          class="profile-aside__site"
        >
          <svgo-ethernet class="profile-aside__site-icon" />
          {{ trimText(userData?.user.profile.site, 11) }}
        </nuxt-link>
        <svgo-verified
          v-if="userData?.user.profile.confirmed"
          class="profile-aside__confirmed-icon"
        />
      </header>
      <span
        v-if="
          userData.user?.profile.country ||
          userData.user.profile.age ||
          userData.user?.profile.foundingDate
        "
        class="profile-aside__aside-border"
      />
      <ul
        v-if="
          userData.user.type === 'Solo' &&
          (userData.user.profile.age || userData.user?.profile.country)
        "
        class="profile-aside__personal-data"
      >
        <li
          v-if="userData.user.profile.age"
          class="profile-aside__personal-point"
        >
          Возраст: {{ userData.user.profile.age }}
        </li>
        <li
          v-if="userData.user?.profile.country"
          class="profile-aside__personal-point"
        >
          Локация:
          <profile-ui-location
            :country-id="userData.user?.profile.country"
            :city-id="userData.user?.profile.city"
          />
        </li>
      </ul>
      <ul
        v-if="
          userData.user.type === 'Team' &&
          (userData.user?.profile.country ||
            userData.user?.profile.foundingDate)
        "
        class="profile-aside__personal-data"
      >
        <li
          v-if="userData.user?.profile.country"
          class="profile-aside__personal-point"
        >
          Локация:
          <profile-ui-location
            :country-id="userData.user?.profile.country"
            :city-id="userData.user?.profile.city"
          />
        </li>
        <li
          v-if="userData.user?.profile.foundingDate"
          class="profile-aside__personal-point"
        >
          Дата основания: {{ userData.user?.profile.foundingDate }}
        </li>
      </ul>
      <span
        v-if="Object.keys(deleteUndefined(userData?.user.contacts)).length"
        class="profile-aside__aside-border"
      />
      <profile-ui-contacts
        v-if="Object.keys(deleteUndefined(userData?.user.contacts)).length"
        :contacts="userData?.user.contacts"
      />
      <span class="profile-aside__aside-border" />
      <div v-if="userData.role === 'performer'" class="profile-aside__anchors">
        <nuxt-link to="#reputation">
          <shared-arrow-text-animate
            font-size="16px"
            font-weight="500"
            arrow-gap="12px"
          >
            Репутация и достижения
          </shared-arrow-text-animate>
        </nuxt-link>
        <nuxt-link to="#cases">
          <shared-arrow-text-animate
            font-size="16px"
            font-weight="500"
            arrow-gap="12px"
          >
            Портфолио (кейсы)
          </shared-arrow-text-animate>
        </nuxt-link>
        <nuxt-link v-if="userData.user.type === 'Team'" to="#team">
          <shared-arrow-text-animate
            font-size="16px"
            font-weight="500"
            arrow-gap="12px"
          >
            Сотрудники
          </shared-arrow-text-animate>
        </nuxt-link>
        <nuxt-link to="#technologies">
          <shared-arrow-text-animate
            font-size="16px"
            font-weight="500"
            arrow-gap="12px"
          >
            Стек технологий
          </shared-arrow-text-animate>
        </nuxt-link>
        <nuxt-link to="#gallery">
          <shared-arrow-text-animate
            font-size="16px"
            font-weight="500"
            arrow-gap="12px"
          >
            Медиа-галерея
          </shared-arrow-text-animate>
        </nuxt-link>
        <nuxt-link to="#certificates">
          <shared-arrow-text-animate
            font-size="16px"
            font-weight="500"
            arrow-gap="12px"
          >
            Сертификаты
          </shared-arrow-text-animate>
        </nuxt-link>
      </div>
      <div
        v-else-if="userData.role === 'client'"
        class="profile-aside__anchors"
      >
        <nuxt-link to="#reputation">
          <shared-arrow-text-animate
            font-size="16px"
            font-weight="500"
            arrow-gap="12px"
          >
            Репутация и достижения
          </shared-arrow-text-animate>
        </nuxt-link>
        <nuxt-link to="#orders">
          <shared-arrow-text-animate
            font-size="16px"
            font-weight="500"
            arrow-gap="12px"
          >
            Сертификаты
          </shared-arrow-text-animate>
        </nuxt-link>
      </div>
    </aside>
  </shared-button-edit>
</template>

<script setup>
import { useFilters } from '~/composables/useFilters.js';
const { deleteUndefined } = useFilters();
const { trimText } = useFormatting();
const userData = useUserData();

const emit = defineEmits(['toEdit']);
const toEdit = () => emit('toEdit');
</script>

<style scoped lang="scss">
.profile-aside {
  @apply flex flex-col;
  gap: $space-medium;
  background: $bg-black-block;
  border-radius: $border-radius-m;
  box-shadow: 0 0 10px 0 #ffffff0d;
  padding: 25px 20px 30px;
  &__header {
    @apply flex flex-col items-center w-full relative;
    gap: $space-small-plus;
  }
  &__avatar {
    width: 125px;
    height: 125px;
    border-radius: $border-radius-rounded;
  }
  &__name {
    @apply truncate w-full;
    line-height: 24px;
    font-size: 20px;
    font-weight: 600;
  }
  &__contacts-block {
    @apply flex flex-col w-full;
  }
  &__contacts-title {
    line-height: 11px;
  }
  &__site {
    @apply flex items-center;
    gap: 10px;
    font-size: 16px;
    font-weight: 400;
    &-icon {
      height: 20px;
      width: 20px;
    }
  }
  &__aside-border {
    @apply w-full block;
    height: 1px;
    background: $gray-50;
  }
  &__personal-point {
    @apply truncate;
  }
  &__anchors {
    @apply flex flex-col;
    gap: 8px;
  }
  &__confirmed-icon {
    @apply absolute;
    top: 10px;
    left: 10px;
    width: 28px;
  }
}
</style>
