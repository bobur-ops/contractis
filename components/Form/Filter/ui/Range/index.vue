<template>
  <div
    class="filter-range"
    :class="{ 'flex-col': description, 'items-center': !description }"
    :style="{ rowGap: description ? '25px' : null }"
  >
    <h4
      class="filter-range__title"
      :class="{ 'filter-range__title_error': isValidateError }"
    >
      {{ title }}
    </h4>
    <p v-if="description" class="filter-range__description">
      {{ description }}
    </p>
    <div class="filter-range__input-container">
      <div class="filter-range__input-block">
        <span class="filter-range__input-sign">От</span>
        <input
          v-model="lowerValue"
          type="number"
          min="1"
          max="9999999"
          class="filter-range__input"
          @input="updateLength"
          @blur="updateLowerVal"
        />
        <span
          v-if="typeof units === 'string'"
          class="filter-range__input-unit"
          >{{ units }}</span
        >
        <u-select-menu
          v-else
          v-slot="{ open }"
          v-model="selectUnit"
          :options="units"
          :ui-menu="{
            base: 'filter-range__options',
            option: {
              base: 'filter-range__base',
              active: 'filter-range__active',
              create: 'filter-range__no-truncate'
            }
          }"
          variant="none"
          selected-icon=""
          :value-attribute="units.code"
          :option-attribute="units.label"
        >
          <UButton class="filter-range__button">
            <p>{{ selectUnit.label }}</p>
            <svgo-vector
              class="filter-range__arrow"
              :class="[!open && 'transform -rotate-90']"
            />
          </UButton>
        </u-select-menu>
      </div>
      <span v-if="separator" class="filter-range__separator" />
      <div class="filter-range__input-block">
        <span class="filter-range__input-sign">До</span>
        <input
          v-model="upperValue"
          type="number"
          min="1"
          max="9999999"
          class="filter-range__input"
          @input="updateLength"
          @blur="updateUpperVal"
        />
        <span
          v-if="typeof units === 'string'"
          class="filter-range__input-unit"
          >{{ units }}</span
        >
        <u-select-menu
          v-else
          v-slot="{ open }"
          v-model="selectUnit"
          :options="units"
          :ui-menu="{
            base: 'filter-range__options',
            option: {
              base: 'filter-range__base',
              active: 'filter-range__active'
            }
          }"
          variant="none"
          selected-icon=""
          :value-attribute="units.code"
          :option-attribute="units.label"
        >
          <UButton class="filter-range__button">
            <p>{{ selectUnit.label }}</p>
            <svgo-vector
              class="filter-range__arrow"
              :class="[!open && 'transform -rotate-90']"
            />
          </UButton>
        </u-select-menu>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  units: { type: [String, Array], required: true },
  inputWidth: { type: String, default: '140px' },
  borders: { type: String, default: '15px' },
  selectWidth: { type: String, default: '45px' },
  separator: { type: Boolean, default: true },
  marginBottom: { type: String, required: true },
  description: { type: String, default: '' },
  initVal: { type: Object, default: () => {} },
  isValidateError: { type: Boolean, default: false }
});
const selectUnit = ref(
  props.initVal?.format
    ? props.units.find((e) => e.code === props.initVal.format)
    : props.units[0]
);
const emit = defineEmits(['updateLower', 'updateUpper', 'updateUnits']);
let gap;
if (props.separator) gap = '10px';
else gap = '25px';
const lowerValue = ref(props.initVal?.lower ?? null);
const upperValue = ref(props.initVal?.upper ?? null);
const updateLowerVal = (e) => {
  e.target.value = e.target.value.replace(/^0+/, '');
  if (lowerValue.value !== '' && upperValue.value <= lowerValue.value) {
    upperValue.value = undefined;
    emit('updateUpper', upperValue.value);
  }
  emit('updateLower', lowerValue.value);
};
const updateUpperVal = (e) => {
  e.target.value = e.target.value.replace(/^0+/, '');
  e.target.value = e.target.value.slice(0, 7);
  if (upperValue.value !== '' && upperValue.value <= lowerValue.value) {
    lowerValue.value = undefined;
    emit('updateLower', lowerValue.value);
  }
  emit('updateUpper', upperValue.value);
};
watch(selectUnit, () => {
  emit('updateUnits', selectUnit.value.code);
});
const updateLength = (e) => {
  e.target.value = e.target.value.slice(0, 7);
};
</script>

<style lang="scss">
@import 'style';
.filter-range {
  margin-bottom: v-bind(marginBottom);
  &__input-container {
    gap: v-bind(gap);
  }
  &__input {
    width: v-bind(inputWidth);
    border-radius: v-bind(borders);
  }
  &__button {
    width: v-bind(selectWidth);
  }
}
</style>
