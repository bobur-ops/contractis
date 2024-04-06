<template>
  <div class="edit-info-main">
    <form-field
      id="companyName"
      v-model="newMainValues.firstName"
      placeholder="Введите название компании"
      label="Название компании"
      type="text"
    />
    <div class="edit-info-main__select-block">
      <label class="edit-info-main__label">Страна</label>
      <form-select
        id="country"
        v-model="newMainValues.country"
        :init-val="
          countries.find((e) => e.id === userData.user.profile?.country)
        "
        :sort="countries"
        placeholder="Выберите страну"
        theme="shadow"
      />
    </div>
    <div
      class="edit-info-main__select-block"
      :class="{
        'edit-info-main__select-block_disabled': !newMainValues.country.id
      }"
    >
      <label class="edit-info-main__label">Город</label>
      <form-select
        id="city"
        v-model="newMainValues.city"
        :init-val="
          countries
            .find((e) => e.id === userData.user.profile?.country)
            .cities.find((e) => e.id === (userData.user.profile?.city ?? null))
        "
        :sort="countries.find((e) => e.id === newMainValues.country.id)?.cities"
        placeholder="Выберите ваш город"
        theme="shadow"
      />
    </div>
    <form-field
      id="site"
      v-model="newMainValues.site"
      placeholder="Введите сайт"
      label="Сайт"
      type="text"
    />
    <form-field
      id="foundingDate"
      v-model="newMainValues.foundingDate"
      placeholder="Введите дату основания"
      label="Дата основания компании"
      type="date"
      input-mode="numeric"
    />
  </div>
</template>

<script setup>
import { countries } from '~/components/Profile/model/index.js';
import { useUserData } from '~/stores/index.js';

defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});
const userData = useUserData();
const newMainValues = ref({
  firstName: userData.value.user.firstName,
  country: countries.find((e) => e.id === userData.value.user.profile?.country),
  city: countries
    .find((e) => e.id === userData.value.user.profile?.country)
    .cities.find((e) => e.id === userData.value.user.profile?.city),
  site: userData.value.user.profile.site ?? '',
  foundingDate: userData.value.user.profile.foundingDate ?? ''
});
const emit = defineEmits(['update:modelValue']);
watchDeep(
  () => newMainValues.value,
  () => emit('update:modelValue', newMainValues.value)
);
</script>

<style scoped lang="scss">
.edit-info-main {
  @apply grid w-full;
  grid-template-columns: repeat(3, 1fr);
  column-gap: $space-xx-large-plus;
  row-gap: $space-small-plus;
  &__select-block {
    @apply flex flex-col;
    gap: 15px;
    &_disabled {
      opacity: 0.4;
    }
  }
  &__label {
    font-size: 16px;
    font-weight: 400;
    line-height: 100%;
  }
}
</style>
