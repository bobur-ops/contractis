<template>
  <ul class="profile-contacts">
    <li
      v-for="(contact, ind) in deleteUndefined(contacts)"
      :key="ind"
      class="profile-contacts__item"
    >
      <svgo-socials-telegram
        v-if="ind === 'telegram' && contact"
        class="profile-contacts__icon"
      />
      <svgo-socials-email
        v-else-if="ind === 'email' && contact"
        class="profile-contacts__icon"
      />
      <svgo-socials-whatsapp
        v-else-if="ind === 'whatsapp' && contact"
        class="profile-contacts__icon"
      />
      <svgo-socials-vk
        v-else-if="ind === 'vk' && contact"
        class="profile-contacts__icon"
      />
      <svgo-socials-instagram
        v-else-if="ind === 'instagram' && contact"
        class="profile-contacts__icon"
      />
      <svgo-socials-behance
        v-else-if="ind === 'behance' && contact"
        class="profile-contacts__icon"
      />
      <svgo-socials-github
        v-else-if="ind === 'github' && contact"
        class="profile-contacts__icon"
      />
      <span v-if="contact" class="profile-contacts__text">
        {{ contact }}
      </span>
    </li>
  </ul>
</template>

<script setup>
import { useFilters } from '~/composables/useFilters';

const { deleteUndefined } = useFilters();
defineProps({
  contacts: {
    type: Object,
    required: true
  }
});
</script>

<style scoped lang="scss">
.profile-contacts {
  @apply flex flex-col w-full;
  gap: $space-small-plus;
  &__item {
    @apply flex items-center overflow-hidden w-full;
    gap: $space-small;
  }
  &__icon {
    width: 22px;
  }
  &__text {
    @apply overflow-hidden;
    max-width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
  }
}
</style>
