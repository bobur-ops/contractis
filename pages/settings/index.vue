<template>
  <section class="settings">
    <div class="settings__inner container">
      <div class="settings__title">
        <div class="settings__title-mark" />
        <h1 class="settings__title-text">Настройки</h1>
      </div>
      <article class="settings-content">
        <div class="settings-content__changes">
          <h2>Основные настройки</h2>
          <form-base gap-labels="25px" class="settings-content__changes-form">
            <template #labels>
              <form-field
                id="email"
                v-model="email"
                label="Email"
                placeholder="мама"
                type="text"
              />
              <form-field
                id="old_password"
                v-model="old_password"
                label="Старый пароль"
                placeholder="папа"
                type="text"
              />
              <form-field
                id="new_password"
                v-model="password"
                label="Новый пароль"
                placeholder="деда"
                type="text"
              />
              <form-field
                id="password_confirmation"
                v-model="password_confirmation"
                label="Повторите новый пароль"
                placeholder="баба"
                type="text"
              />
              <nuxt-link to="#" class="settings-content__changes-forgot">
                Забыл пароль?
              </nuxt-link>
            </template>
            <template #buttons>
              <shared-button-gradient-blue
                button-height="55px"
                font-size="20px"
                button-width="100%"
                border="12px"
              >
                <shared-arrow-text font-weight="500">
                  Сохранить
                </shared-arrow-text>
              </shared-button-gradient-blue>
            </template>
          </form-base>
        </div>
        <div class="settings-content__socials">
          <h2>Привязка аккаунтов</h2>
          <div class="settings-content__socials-list">
            <shared-social-link
              v-for="social in socials"
              :key="social"
              :social-name="social"
              class="settings-content__socials-item"
              @click="bindSocial(social)"
            />
          </div>
          <div class="settings-content__socials-verifications">
            <h3 class="settings-content__socials-verifications-title">
              Ваш аккаунт верифицирован
              <svgo-verified
                class="settings-content__socials-verifications-icon"
              />
            </h3>
            <shared-arrow-text-animate font-weight="400" font-size="16px">
              Пройти верификацию
            </shared-arrow-text-animate>
          </div>
          <shared-arrow-text-animate
            arrow-height="14px"
            font-size="20px"
            font-weight="500"
            arrow-gap="15px"
          >
            Светлая тема
          </shared-arrow-text-animate>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { SettingsSchema } from '~/utils/Validation';
const socials = ['VK', 'Google', 'Yandex', 'Telegram'];
definePageMeta({
  layout: 'menu',
  middleware: ['auth']
});

const { token: userToken } = useStore();
const bindSocial = (social) => {
  console.log(userToken.value, social);
  switch (social) {
    case 'Google':
      window.location.href = `${import.meta.env.VITE_API_URL}gmail/bind?token=${userToken.value}`;
      break;
    case 'VK':
      window.location.href = `${import.meta.env.VITE_API_URL}vk/bind?token=${userToken.value}`;
      break;
  }
};

const { defineField } = useForm({
  validationSchema: SettingsSchema,
  initialValues: {
    email: '',
    password: '',
    password_confirmation: ''
  }
});

const [email] = defineField('email');
const [old_password] = defineField('password');
const [password] = defineField('password');
const [password_confirmation] = defineField('password_confirmation');
</script>
<style scoped lang="scss">
.settings {
  @apply flex justify-center w-full;
  padding-top: 30px;
  padding-bottom: 60px;
  &__inner {
    @apply w-full h-fit;
  }
  &__title {
    @apply flex items-end;
    gap: $space-small;
    margin-bottom: $space-large-plus;
    &-text {
      font-size: 30px;
      line-height: 21px;
      font-weight: 600;
    }
    &-mark {
      @include h1-gradient-mark;
      margin-bottom: 2px;
    }
  }
  &-content {
    @apply grid w-full;
    grid-template-columns: 392px 1fr;
    gap: 13.5%;
    & > div > h2 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: $space-medium-plus;
    }
    &__changes {
      &-forgot {
        font-weight: 400;
        text-decoration-line: underline;
        margin-bottom: $space-small-plus;
      }
    }
    &__socials {
      &-list {
        @apply grid w-full h-fit;
        grid-template-columns: 1fr 1fr;
        gap: $space-medium-plus $space-big-plus;
        margin-bottom: $space-x-big-plus;
      }
      &-item {
        @apply cursor-pointer;
      }
      &-verifications {
        @apply flex flex-col;
        gap: $space-medium;
        margin-bottom: $space-x-big;
        &-title {
          @apply flex;
          gap: $space-small;
          font-size: 20px;
          font-weight: 500;
        }
        &-icon {
          width: 28px;
        }
      }
    }
  }
}
</style>
