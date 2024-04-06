<template>
  <article class="edit-info-contacts">
    <div class="edit-info-contacts__title">
      <h2>Контакты</h2>
      <div class="edit-info-contacts__title-underline" />
    </div>
    <div class="edit-info-contacts__inputs">
      <form-field
        id="vk"
        v-model="newContacts.vk"
        placeholder="Введите Вконтакте"
        label="Вконтакте"
        type="text"
      />
      <form-field
        id="behance"
        v-model="newContacts.behance"
        placeholder="Введите Behance"
        label="Behance"
        type="text"
      />
      <form-field
        id="Github"
        v-model="newContacts.github"
        placeholder="Введите Github"
        label="Github"
        type="text"
      />
      <form-field
        id="Telegram"
        v-model="newContacts.telegram"
        placeholder="Введите Telegram"
        label="Telegram"
        type="text"
      />
      <form-field
        id="Whatsapp"
        v-model="newContacts.whatsapp"
        placeholder="Введите Whatsapp"
        label="Whatsapp"
        type="text"
        :is-validate-error="!isTelephone(newContacts.whatsapp)"
        :mask="telephoneMask"
        input-mode="tel"
      />
      <form-field
        id="email"
        v-model="newContacts.email"
        placeholder="Введите e-mail"
        label="E-mail"
        type="email"
        input-mode="email"
      />
    </div>
  </article>
</template>

<script setup>
import { useUserData } from '~/stores/index.js';
import { telephoneMask, telephoneRegex } from '~/utils/masks';

defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});
const userData = useUserData();
const newContacts = ref({
  telegram: userData.value.user.contacts.telegram ?? '',
  whatsapp: userData.value.user.contacts.whatsapp ?? '',
  instagram: userData.value.user.contacts.instagram ?? '',
  vk: userData.value.user.contacts.vk ?? '',
  behance: userData.value.user.contacts.behance ?? '',
  github: userData.value.user.contacts.github ?? '',
  email: userData.value.user.contacts.email ?? ''
});
const emit = defineEmits(['update:modelValue']);
watchDeep(
  () => newContacts.value,
  () => emit('update:modelValue', newContacts.value)
);
const isTelephone = (val) => telephoneRegex.test(val) || !val;
</script>

<style scoped lang="scss">
.edit-info-contacts {
  @apply w-full;
  &__title {
    @apply flex flex-col w-fit;
    line-height: 1;
    letter-spacing: 0.04em;
    font-size: 20px;
    gap: 12px;
    font-weight: 600;
    color: $white;
    margin-bottom: 30px;
    &-underline {
      @apply inline-block w-full;
      border: 1px solid $gray-50;
    }
  }
  &__inputs {
    @apply grid w-full;
    grid-template-columns: repeat(3, 1fr);
    column-gap: $space-xx-large-plus;
    row-gap: $space-small-plus;
  }
}
</style>
