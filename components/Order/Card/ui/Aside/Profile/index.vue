<template>
  <article class="order-card-aside-profile">
    <div class="order-card-aside-profile__inner">
      <header class="order-card-aside-profile__header">
        <img
          v-if="avatarPath"
          class="order-card-aside-profile__avatar"
          src="/assets/images/avatars/avatar.png"
          alt="avatar"
        />
        <profile-ui-default-avatar
          v-else
          class="order-card-aside-profile__avatar"
        />
        <span class="order-card-aside-profile__name">
          {{ lastName }} {{ firstName }}
        </span>
      </header>
      <div class="order-card-aside-profile__stat">
        <h3 class="order-card-aside-profile__stat-title">Статистика</h3>
        <ul class="order-card-aside-profile__stat-list">
          <li
            v-for="(stats, ind) in {
              completed: 54,
              search: 54,
              reviews: {
                positive: 54,
                negative: 92
              }
            }"
            :key="ind"
            class="order-card-aside-profile__stat-item"
          >
            <span v-if="ind === 'completed'">Завершенные заказы</span>
            <span v-else-if="ind === 'search'">В поиске исполнителя</span>
            <span v-else-if="ind === 'reviews'">Отзывы исполнителей</span>
            <order-card-ui-aside-color-block :value="stats" color="blue" />
          </li>
        </ul>
      </div>
      <div
        v-if="Object.keys(deleteUndefined(contacts)).length"
        class="order-card-aside-profile__contacts"
      >
        <h3 class="order-card-aside-profile__contacts-title">Контакты</h3>
        <ul class="order-card-aside-profile__contacts-list">
          <li
            v-for="(contact, ind) in deleteUndefined(contacts)"
            :key="ind"
            class="order-card-aside-profile__contacts-item"
          >
            <svgo-socials-telegram
              v-if="ind === 'telegram' && contact"
              class="order-card-aside-profile__contacts-item-icon"
            />
            <svgo-socials-email
              v-else-if="ind === 'email' && contact"
              class="order-card-aside-profile__contacts-item-icon"
            />
            <svgo-socials-whatsapp
              v-else-if="ind === 'whatsapp' && contact"
              class="order-card-aside-profile__contacts-item-icon"
            />
            <svgo-socials-vk
              v-else-if="ind === 'vk' && contact"
              class="order-card-aside-profile__contacts-item-icon"
            />
            <svgo-socials-instagram
              v-else-if="ind === 'instagram' && contact"
              class="order-card-aside-profile__contacts-item-icon"
            />
            <svgo-socials-behance
              v-else-if="ind === 'behance' && contact"
              class="order-card-aside-profile__contacts-item-icon"
            />
            <svgo-socials-github
              v-else-if="ind === 'github' && contact"
              class="order-card-aside-profile__contacts-item-icon"
            />
            <span
              v-if="contact"
              class="order-card-aside-profile__contacts-item-text"
            >
              {{ contact }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useFilters } from '~/composables/useFilters.js';

const { deleteUndefined } = useFilters();

defineProps({
  avatarPath: { type: String, default: '' },
  lastName: { type: String, default: '' },
  firstName: { type: String, default: '' },
  contacts: { type: Object, default: () => {} }
});
</script>

<style scoped lang="scss">
@import 'style';
</style>
