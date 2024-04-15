<template>
  <div class="profile-form-init">
    <transition-group name="fade-in">
      <div v-if="page === 1" class="profile-form-init__inner">
        <div class="profile-form-init__title-block">
          <h2 class="profile-form-init__title">
            Перед заполненением профиля выберите кем вы являтесь
          </h2>
          <p class="profile-form-init__page">
            1
            <span class="profile-form-init__page_opacity">/ 2</span>
          </p>
        </div>
        <div class="profile-form-init__buttons-block">
          <button
            class="profile-form-init__button"
            :class="{
              'profile-form-init__button_active': profileType === 'Team'
            }"
            @click.prevent="setTeam"
          >
            <svgo-profile-team-shadow class="profile-form-init__type-icon" />
            Мы — агентство, команда, компания
          </button>
          <button
            class="profile-form-init__button"
            :class="{
              'profile-form-init__button_active': profileType === 'Solo'
            }"
            @click.prevent="setSolo"
          >
            <svgo-profile-solo-shadow class="profile-form-init__type-icon" />
            Я — индивидуальный исполнитель
          </button>
        </div>
        <shared-button-gradient-blue
          font-weight="500"
          font-size="20px"
          button-width="300px"
          button-height="55px"
          class="profile-form-init__page-button"
          @click.prevent="setType"
        >
          <shared-arrow-text font-size="20px" font-weight="500">
            Продолжить
          </shared-arrow-text>
        </shared-button-gradient-blue>
      </div>
      <div v-else-if="page === 2" class="profile-form-init__inner">
        <shared-arrow-text-animate
          font-size="15px"
          font-weight="500"
          :revers="true"
          class="profile-form-init__undo-button"
          @click.prevent="lastPage"
        >
          Назад
        </shared-arrow-text-animate>
        <div class="profile-form-init__title-block">
          <h2
            v-if="profileType === 'Team'"
            class="profile-form-init__title"
            :class="{ 'profile-form-init__title_error': !!companyError }"
          >
            Введите название вашей компании
          </h2>
          <h2
            v-else-if="profileType === 'Solo'"
            class="profile-form-init__title"
            :class="{ 'profile-form-init__title_error': !!nameError }"
          >
            Введите Ваше имя и фамилию
          </h2>
          <p class="profile-form-init__page">
            2
            <span class="profile-form-init__page_opacity">/ 2</span>
          </p>
        </div>
        <form-field
          v-if="profileType === 'Solo'"
          id="user-name"
          v-model="name"
          type="text"
          placeholder="Апчихба"
          class="profile-form-init__name-input"
        />
        <form-field
          v-else-if="profileType === 'Team'"
          id="user-name"
          v-model="companyName"
          type="text"
          placeholder="Апчихба"
          class="profile-form-init__name-input"
        />
        <shared-button-gradient-blue
          font-weight="500"
          font-size="20px"
          button-width="300px"
          button-height="55px"
          class="profile-form-init__page-button"
          @click.prevent="setName"
        >
          <shared-arrow-text font-size="20px" font-weight="500">
            Продолжить
          </shared-arrow-text>
        </shared-button-gradient-blue>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import yup from '~/utils/Validation/customValidation.js';
const userData = useUserData();

useHead({
  bodyAttrs: {
    class: 'overflow-hidden'
  }
});
const page = ref(1);
const profileType = ref('');
const setTeam = () => (profileType.value = 'Team');
const setSolo = () => (profileType.value = 'Solo');
const setType = () => {
  if (profileType.value !== '') {
    page.value = 2;
  }
};
const setName = () => {
  if (profileType.value === 'Solo' && name && !nameError.value) {
    userData.value.user.type = profileType.value;
    userData.value.user.firstName = name.value
      .replace(/\s+$/, '')
      .split(' ')[0];
    userData.value.user.lastName = name.value.replace(/\s+$/, '').split(' ')[1];
  } else if (
    profileType.value === 'Team' &&
    companyName.value &&
    !companyError.value
  ) {
    userData.value.user.type = profileType.value;
    userData.value.user.firstName = companyName.value;
    userData.value.user.lastName = null;
    // TODO подключить api
  }
};
const lastPage = () => {
  page.value = 1;
};

const { value: name, errorMessage: nameError } = useField(
  'name',
  yup.string().required().fullName(),
  { initialValue: '' }
);
const { value: companyName, errorMessage: companyError } = useField(
  'companyName',
  yup.string().required(),
  { initialValue: '' }
);
</script>

<style scoped lang="scss">
.profile-form-init {
  @apply fixed top-0 flex justify-center items-center;
  height: 100vh;
  width: 100%;
  z-index: $z-index-2;
  @include gb-blur();
  &__inner {
    @apply max-w-full relative;
    width: 1010px;
    padding: 50px 40px;
    background: $bg-black-block;
    border-radius: $border-radius-m;
    border: 1px solid $border-block;
  }
  &__title-block {
    @apply flex justify-between items-center;
    margin-bottom: $space-x-large-plus;
  }
  &__title {
    font-size: 24px;
    font-weight: 500;
    transition: 0.2s ease-in-out;
    &_error {
      color: $light-red;
    }
  }
  &__page {
    font-size: 24px;
    font-weight: 400;
    &_opacity {
      color: $gray-30;
    }
  }
  &__buttons-block {
    @apply flex justify-between;
    gap: 30px;
    margin-bottom: $space-x-large-plus;
  }
  &__button {
    @apply w-full flex items-center justify-center;
    height: 55px;
    transition: 0.1s;
    gap: $space-medium-plus;
    background:
      linear-gradient($bg-inputs, $bg-inputs) padding-box,
      $border-block border-box;
    border: 1px solid transparent;
    border-radius: $border-radius-m;
    &_active {
      background:
        linear-gradient($bg-inputs, $bg-inputs) padding-box,
        $gradient-skyblue-blue border-box;
    }
  }
  &__page-button {
    margin: 0 auto;
  }
  &__type-icon {
    height: 20px;
  }
  &__name-input {
    margin-bottom: $space-x-large-plus;
  }
  &__undo-button {
    @apply absolute;
    top: -50px;
    left: 0;
  }
}
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.3s ease;
  @apply fixed;
}

.fade-in-enter-from {
  opacity: 0;
}
.fade-in-leave-to {
  opacity: 0;
}
</style>
