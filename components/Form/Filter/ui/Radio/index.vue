<template>
  <u-accordion
    class="filter-radio"
    :items="[{ label: title, slot: 'radio' }]"
    :ui="{
      item: { base: 'filter-radio__input-container' }
    }"
    :default-open="true"
  >
    <template #default="{ item, open }">
      <u-button class="filter-radio__button">
        {{ item.label }}
        <svgo-vector
          class="filter-radio__arrow"
          :class="[!open && 'transform -rotate-90']"
        />
      </u-button>
    </template>
    <template #radio>
      <button
        v-for="filter in filters"
        :key="filter.id"
        class="filter-radio__input-block"
        @click.prevent="updateRadio(filter.id)"
      >
        <span
          class="filter-radio__label"
          :class="{
            'filter-radio__label_active':
              (!multiple && filter.id === radioValue) ||
              (multiple &&
                typeof radioValue === 'object' &&
                radioValue.includes(filter.id))
          }"
        >
          {{ filter.name }}
        </span>
        <span v-if="filter.count" class="filter-radio__count-block">
          <span class="filter-radio__count" :class="itemClass(filter)">
            {{ filter.count }}
          </span>
        </span>
        <span v-if="filter.flag" class="filter-radio__flag-block">
          <component :is="flagIcon(filter.flag)" />
        </span>
      </button>
    </template>
  </u-accordion>
</template>

<script setup>
import { useFilters } from '~/composables/useFilters.js';
const { deleteElement } = useFilters();

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  filters: {
    type: Array,
    required: true
  },
  initVal: {
    type: [Number, Array],
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  }
});
const radioValue = ref(props.initVal);

const emit = defineEmits(['updateRadio']);
watch(radioValue, () => {
  emit('updateRadio', radioValue.value);
});
const updateRadio = (id) => {
  if (!props.multiple) {
    if (radioValue.value !== id) radioValue.value = id;
    else radioValue.value = 0;
  } else if (typeof radioValue.value === 'object') {
    if (radioValue.value.includes(id))
      radioValue.value = deleteElement(id, radioValue.value);
    else {
      radioValue.value.push(id);
      radioValue.value.sort((a, b) => a - b);
    }
  }
};
const itemClass = (item) => {
  switch (item.id % 6) {
    case 1:
      return 'filter-radio__count_yellow';
    case 2:
      return 'filter-radio__count_red';
    case 3:
      return 'filter-radio__count_blue';
    case 4:
      return 'filter-radio__count_green';
    case 5:
      return 'filter-radio__count_sky';
    case 0:
      return 'filter-radio__count_pink';
  }
};
const flagIcon = (flag) => `svgo-flag-${flag}`;
</script>

<style lang="scss">
@import 'style';
</style>
