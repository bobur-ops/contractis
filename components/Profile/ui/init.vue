<template>
  <div class="profile-form-init flex">
    <div
      class="flex justify-center items-center container relative w-full h-fit mx-auto profile-form__inner"
    >
      <img class="planet" src="assets/images/auth/Planet.png" alt="planet" />
      <transition-group name="fade-in">
        <div v-if="page === 1" class="profile-form-init__inner">
          <div class="profile-form-init__title-block">
            <h2 class="profile-form-init__title">Выберите кем вы являетесь</h2>
          </div>
          <div class="profile-form-init__buttons-block">
            <div class="profile-form-init__button-wrapper">
              <button
                class="profile-form-init__button"
                :class="{
                  'profile-form-init__button_active': profileType === 'Team'
                }"
                @click.prevent="setTeam"
              >
                <svgo-profile-team-shadow
                  filled
                  class="profile-form-init__type-icon"
                />
                <span class="hidden md:block">
                  Мы — агентство, команда, компания
                </span>
              </button>
              <span class="md:hidden text-center">
                Мы — агентство, команда, компания
              </span>
            </div>
            <div class="profile-form-init__button-wrapper">
              <button
                class="profile-form-init__button"
                :class="{
                  'profile-form-init__button_active': profileType === 'Solo'
                }"
                @click.prevent="setSolo"
              >
                <svgo-profile-solo-shadow
                  class="profile-form-init__type-icon"
                />
                <span class="hidden md:block">
                  Я — индивидуальный исполнитель
                </span>
              </button>
              <span class="md:hidden text-center">
                Я — индивидуальный исполнитель
              </span>
            </div>
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
          <img
            src="assets/images/astronauts/Astronaut-auth.png"
            class="astronaut"
            alt="astronaut"
          />
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
          <img
            src="assets/images/astronauts/Astronaut-auth.png"
            class="astronaut"
            alt="astronaut"
          />
        </div>
      </transition-group>
    </div>
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
/*  flex justify-center items-center */
.profile-form__inner {
  padding-top: pxToRem(35);
}
.profile-form-init {
  @apply fixed top-0 left-0;
  height: 100vh;
  width: 100%;
  z-index: $z-index-2;
  @include gb-blur();
  &__inner {
    @apply max-w-full relative;
    width: pxToRem(462);
    padding: pxToRem(35);
    background: transparent;
    border-radius: pxToRem(20);
    border: 1px solid rgba($color: #fff, $alpha: 0.85);
  }
  &__title-block {
    @apply flex justify-between items-center;
    margin-bottom: pxToRem(35);
    /* margin-bottom: $space-x-large-plus; */
  }
  &__title {
    font-size: pxToRem(30);
    font-weight: 500;
    transition: 0.2s ease-in-out;
    color: rgba($color: #fff, $alpha: 0.85);
    &_error {
      color: $light-red;
    }
  }
  &__page {
    font-size: pxToRem(24);
    font-weight: 400;
    &_opacity {
      color: $gray-30;
    }
  }
  &__buttons-block {
    @apply flex justify-between;
    gap: pxToRem(30);
    margin-bottom: pxToRem(35);
    /* margin-bottom: $space-x-large-plus; */
  }
  &__button {
    @apply w-full flex flex-col items-center justify-center;
    height: pxToRem(131);
    width: pxToRem(181);
    transition: 0.1s;
    gap: pxToRem(20);
    background:
      linear-gradient($bg-inputs, $bg-inputs) padding-box,
      $border-block border-box;
    border: 1px solid transparent;
    border-radius: pxToRem(15);
    font-size: pxToRem(14);
    line-height: 110%;
    &_active {
      /* background:
        linear-gradient($bg-inputs, $bg-inputs) padding-box,
        $gradient-skyblue-blue border-box; */
      background: $gradient-skyblue-blue;
      border: 1px solid rgba($color: #fff, $alpha: 0.9);
      .profile-form-init__type-icon {
        color: rgba($color: #fff, $alpha: 1);
      }
    }
  }
  &__page-button {
    margin: 0 auto;
  }
  &__type-icon {
    height: pxToRem(35);
    width: fit-content;
    color: $border-block;
  }
  &__name-input {
    margin-bottom: pxToRem(22);
  }
  &__undo-button {
    @apply absolute;
    top: pxToRem(-50);
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

.astronaut {
  @apply absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -99%;
}
.planet {
  @apply absolute;
  top: calcHeight(120px);
  left: 0;
}

.profile-form-init__button-wrapper {
  @apply flex flex-col;
  gap: calculateVw425(15);
  font-size: calculateVw425(13);
}
</style>
