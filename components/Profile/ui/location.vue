<template>
  <span class="profile-location">
    <component :is="flagIcon(country.flag)" class="profile-location__icon" />
    {{ country.name }}{{ city?.name ? ', г. ' + city.name : null }}
  </span>
</template>

<script setup>
import { executorsCountries } from '~/components/Executors/model/index.js';

const props = defineProps({
  countryId: { type: Number, required: true },
  cityId: { type: Number, default: 0 }
});
const country = computed(() =>
  executorsCountries.find((e) => e.id === props.countryId)
);
const city = computed(() => {
  if (props.cityId) {
    return executorsCountries
      .find((e) => e.id === country.value.id)
      ?.cities.find((e) => e.id === props.cityId);
  } else return null;
});
const flagIcon = (flag) => `svgo-flag-rounded-${flag}`;
</script>

<style scoped lang="scss">
.profile-location {
  &__icon {
    @apply inline;
    width: 16px;
    height: 16px;
    border-radius: $border-radius-rounded;
  }
}
</style>
