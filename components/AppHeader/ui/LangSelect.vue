<template>
  <u-select-menu
    v-slot="{ open }"
    v-model="selectLang"
    class="lang-select"
    :options="langList"
    selected-icon=""
    variant="none"
    :ui-menu="{
      base: 'lang-select__options',
      option: { base: 'lang-select__base', active: 'lang-select__active' }
    }"
    :value-attribute="langList.value"
    :option-attribute="langList.label"
  >
    <u-button class="lang-select__button">
      <img
        v-if="selectLang.value === 'ru'"
        class="lang-select__image"
        alt="rus"
        src="assets/images/header/rus.png"
      />
      <img
        v-if="selectLang.value === 'en'"
        class="lang-select__image"
        alt="eng"
        src="assets/images/header/eng.png"
      />
      <span class="lang-select__name"> {{ selectLang.label }} </span>
      <svgo-arrow
        class="lang-select__arrow"
        :class="[open && 'lang-select__arrow_active']"
      />
    </u-button>
  </u-select-menu>
</template>

<script setup>
const props = defineProps({
  langList: {
    type: Array,
    required: true
  }
});
const { locale } = useI18n();
const selectLang = ref(props.langList[0]);
const cookieLang = useCookie('lang');
watch(selectLang, () => {
  cookieLang.value = selectLang.value.value;
  locale.value = selectLang.value.value;
});
onMounted(() => {
  if (useCookie('lang'))
    selectLang.value = props.langList.find((e) => e.value === cookieLang.value);
  if (selectLang.value === undefined)
    selectLang.value = props.langList.find((e) => e.value === 'ru');
});
</script>

<style lang="scss">
.lang-select {
  margin-left: pxToRem(7);
  &:hover {
    color: $gray-70;
    transition: 0.1s;
  }
  &__button {
    @apply flex items-center h-full justify-center cursor-pointer;
    background-color: transparent !important;
  }
  &__arrow {
    @apply transition-transform;
    margin-left: pxToRem(10);
    width: pxToRem(4);
    height: pxToRem(8);
    transform: rotate(0);
    &_active {
      transform: rotate(90deg);
    }
  }
  &__name {
    line-height: pxToRem(10);
    margin-left: pxToRem(5);
    color: $white;
  }
  &__image {
    width: pxToRem(16);
  }
  &__options {
    border-radius: $border-radius-s;
    border: 1px solid $white;
    background: $bg-black-block !important;
  }
  &__base {
    height: pxToRem(32);
    font-size: pxToRem(14);
  }
  &__active {
    background: transparent !important;
    border-bottom: 1.5px solid $blue;
  }
}
</style>
