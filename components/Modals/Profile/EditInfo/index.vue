<template>
  <modals size="big" custom-padding="60px 60px 35px" @modal-close="modalClose">
    <section class="edit-info">
      <h1 class="edit-info__title">Редактирование “Общая информация”</h1>
      <div class="edit-info__content">
        <form-base class="edit-info__form">
          <template #labels>
            <article class="edit-info__general">
              <div class="edit-info__form-title">
                <h2>Общая информация</h2>
                <div class="edit-info__form-title-underline" />
              </div>
              <modals-profile-edit-info-main-solo
                v-if="userData.user.type === 'Solo'"
                v-model="newValues.main"
              />
              <modals-profile-edit-info-main-team
                v-else-if="userData.user.type === 'Team'"
                v-model="newValues.main"
              />
            </article>
            <modals-profile-edit-info-contacts v-model="newValues.contacts" />
          </template>
          <template #buttons>
            <article class="edit-info__references">
              <shared-button-gradient-blue
                button-height="42px"
                font-size="18px"
                button-width="172px"
                class="edit-info__button"
                @click="saveData"
              >
                <shared-arrow-text font-size="18px" font-weight="500">
                  Сохранить
                </shared-arrow-text>
              </shared-button-gradient-blue>
              <p class="edit-info__description">
                В вашем профиле будут отображться только те Контакты, которые вы
                указали
              </p>
            </article>
          </template>
        </form-base>
      </div>
    </section>
  </modals>
</template>

<script setup>
import { countries } from '~/components/Profile/model/index.js';
import { numbersRegex, telephoneRegex } from '~/utils/masks/index.js';

const emits = defineEmits(['modal-close']);
useHead({
  bodyAttrs: {
    class: 'overflow-hidden'
  }
});
const userData = useUserData();
const modalClose = () => {
  emits('modal-close');
};
const newValues = ref({
  main: {
    firstName: userData.value.user.firstName,
    lastName: userData.value.user.lastName,
    country: countries.find(
      (e) => e.id === userData.value.user.profile?.country
    ),
    city: countries
      .find((e) => e.id === userData.value.user.profile?.country)
      ?.cities.find((e) => e.id === userData.value.user.profile?.city),
    site: userData.value.user.profile?.site ?? '',
    age: userData.value.user.profile?.age ?? '',
    foundingDate: userData.value.user.profile?.foundingDate ?? ''
  },
  contacts: {
    telegram: userData.value.user.contacts?.telegram ?? '',
    whatsapp: userData.value.user.contacts?.whatsapp ?? '',
    instagram: userData.value.user.contacts?.instagram ?? '',
    vk: userData.value.user.contacts?.vk ?? '',
    behance: userData.value.user.contacts?.behance ?? '',
    github: userData.value.user.contacts?.github ?? '',
    email: userData.value.user.contacts?.email ?? ''
  }
});
const saveData = () => {
  if (
    !isPossible(newValues.value.main?.age) &&
    !isTelephone(newValues.value.contacts.whatsapp)
  )
    return;
  const mainObject = {
    firstName:
      newValues.value.main?.firstName !== ''
        ? newValues.value.main?.firstName
        : null,
    lastName:
      newValues.value.main?.lastName !== ''
        ? newValues.value.main?.lastName
        : null
  };
  const profileObject = {
    sex: newValues.value.main?.sex?.code ?? null,
    country: newValues.value.main?.country?.id,
    city: newValues.value.main?.city?.id,
    site: newValues.value.main?.site !== '' ? newValues.value.main?.site : null,
    age: newValues.value.main?.age !== '' ? newValues.value.main?.age : null,
    foundingDate:
      newValues.value.main?.foundingDate !== ''
        ? newValues.value.main?.foundingDate
        : null
  };
  const contactsObject = {
    telegram:
      newValues.value.contacts?.telegram !== ''
        ? newValues.value.contacts?.telegram
        : null,
    whatsapp:
      newValues.value.contacts?.whatsapp !== ''
        ? newValues.value.contacts?.whatsapp
        : null,
    instagram:
      newValues.value.contacts?.instagram !== ''
        ? newValues.value.contacts?.instagram
        : null,
    vk:
      newValues.value.contacts?.vk !== '' ? newValues.value.contacts?.vk : null,
    behance:
      newValues.value.contacts?.behance !== ''
        ? newValues.value.contacts?.behance
        : null,
    github:
      newValues.value.contacts?.github !== ''
        ? newValues.value.contacts?.github
        : null,
    email:
      newValues.value.contacts?.email !== ''
        ? newValues.value.contacts?.email
        : null
  };
  userData.value.user = Object.assign(userData.value.user, mainObject);
  userData.value.user.profile = Object.assign(
    userData.value.user.profile,
    profileObject
  );
  userData.value.user.contacts = Object.assign(
    userData.value.user.contacts,
    contactsObject
  );
  modalClose();
};
const isTelephone = (val) => {
  console.log(telephoneRegex.test(val) || !val);
  return telephoneRegex.test(val) || !val;
};
const isPossible = (val) => numbersRegex.test(val) || !val;
</script>

<style scoped lang="scss">
.edit-info {
  @apply flex flex-col h-fit;
  width: 1296px;
  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 55px;
    line-height: 17px;
  }
  &__general {
    margin-bottom: 55px;
  }

  &__form-title {
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
  &__content {
    @apply flex;
    gap: 5%;
  }
  &__form {
    @apply w-full;
  }
  &__references {
    @apply grid w-full items-center;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: 'button ref ref';
    gap: $space-xx-large-plus;
  }
  &__button {
    grid-area: button;
  }
  &__description {
    @apply w-full;
    grid-area: ref;
    font-size: 18px;
    line-height: 144%;
    color: $gray;
  }
}
</style>
