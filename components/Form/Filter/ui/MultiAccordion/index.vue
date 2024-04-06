<template>
  <u-accordion
    class="filter-radio-accordion"
    :items="[{ label: title, slot: 'radio' }]"
    :ui="{
      item: { base: 'filter-radio-accordion__input-container' }
    }"
    :default-open="defaultOpen"
  >
    <template #default="{ item, open }">
      <u-button
        class="filter-radio-accordion__button"
        :class="{ 'filter-radio-accordion__button_error': isValidateError }"
      >
        {{ item.label }}
        <svgo-vector
          class="filter-radio-accordion__arrow"
          :class="[!open && 'transform -rotate-90']"
        />
      </u-button>
    </template>
    <template #radio>
      <div class="filter-checkbox-accordion">
        <div
          v-for="item in filters"
          :key="item.id"
          class="filter-checkbox-accordion__list"
        >
          <div
            class="filter-checkbox-accordion__button"
            :class="{
              'filter-checkbox-accordion__button_active': isSelected(item.id)
            }"
          >
            <span
              class="filter-checkbox-accordion__label"
              :class="{
                'filter-checkbox-accordion__label_active': isSelected(item.id)
              }"
              @click.prevent="updateRadio(item.id)"
            >
              {{ item.name }}
            </span>
            <span
              v-if="isSelected(item.id) && !switchableRadio"
              class="filter-checkbox-accordion__close-button"
              @click="clearRadio(item.id)"
            >
              <svgo-button-close
                class="filter-checkbox-accordion__close-icon"
              />
            </span>
            <div
              v-if="item.count && counter"
              class="filter-checkbox-accordion__count-block"
            >
              <span
                class="filter-checkbox-accordion__count"
                :class="itemClass(item.id)"
              >
                {{ item.count }}
              </span>
            </div>
          </div>
          <transition
            v-if="item.list"
            name="clotting"
            @enter="onEnter"
            @leave="onLeave"
          >
            <div
              v-show="openRadio.includes(item.id)"
              class="filter-checkbox-accordion__input-container"
            >
              <form-filter-ui-checkbox
                :filters="item.list"
                margin-bottom="0"
                checkbox-height="43px"
                row-gap="20px"
                :init-val="values"
                :truncate="true"
                :multiple="multipleCheckbox"
                :warning-text="warningText"
                @update-checkbox="updateCheckbox"
              />
            </div>
          </transition>
        </div>
      </div>
    </template>
  </u-accordion>
</template>

<script setup>
import { useFilters } from '~/composables/useFilters.js';
const { deleteElement } = useFilters();
const { warning } = useNotifications();

const props = defineProps({
  title: { type: String, required: true },
  isValidateError: { type: Boolean, default: false },
  filters: { type: Array, required: true },
  initVal: { type: [Array, Number], default: undefined },
  initRadio: { type: [Array, String, Number], default: undefined },
  marginBottom: { type: String, default: '35px' },
  multipleRadio: { type: Boolean, default: true },
  multipleCheckbox: { type: Boolean, default: true },
  counter: { type: Boolean, default: true },
  switchableRadio: { type: Boolean, default: false },
  warningText: { type: String, default: '' },
  defaultOpen: { type: Boolean, default: true }
});
const emit = defineEmits(['updateCheckbox', 'updateRadio', 'clear']);

const radioValue = ref();
const openRadio = ref([]);
if (props.multipleRadio) radioValue.value = props.initRadio ?? [];
else radioValue.value = props.initRadio ?? null;
const updateRadio = (id) => {
  if (!props.multipleRadio) {
    if (radioValue.value === id && props.switchableRadio)
      radioValue.value = null;
    else if (radioValue.value === null || props.switchableRadio)
      radioValue.value = id;
    if (openRadio.value[0] === id) openRadio.value = [];
    else if (
      radioValue.value === null ||
      radioValue.value === id ||
      props.switchableRadio
    )
      openRadio.value[0] = id;
    else warning(props.warningText);
    emit('updateRadio', radioValue.value);
  } else {
    if (!radioValue.value.includes(id)) radioValue.value.push(id);
    radioValue.value.sort((a, b) => a - b);
    if (!openRadio.value.includes(id)) openRadio.value.push(id);
    else openRadio.value = deleteElement(id, openRadio.value);
    openRadio.value.sort((a, b) => a - b);
    emit('updateRadio', radioValue.value);
  }
};
const clearRadio = (id) => {
  if (!props.multipleRadio) {
    openRadio.value = [];
    radioValue.value = null;
    emit('clear');
  } else {
    openRadio.value = deleteElement(id, openRadio.value);
    radioValue.value = deleteElement(id, radioValue.value);
    emit('clear', id);
  }
};

const values = ref(props.initVal);
watch(
  () => props.initVal,
  () => (values.value = props.initVal)
);
const updateCheckbox = (val, list) => {
  if (props.multipleCheckbox) {
    if (!values.value) values.value = [].concat(props.initVal);
    val.forEach((el, id) => {
      if (
        typeof values.value === 'object' &&
        values.value.includes(list[id].id)
      )
        values.value = deleteElement(list[id].id, values.value);
      if (typeof values.value === 'object' && el)
        values.value.push(list[id].id);
    });
    values.value?.sort((a, b) => a - b);
    emit('updateCheckbox', values.value);
  } else {
    val.forEach((el, id) => {
      if (values.value === list[id].id) values.value = null;
      if (el === true) values.value = list[id].id;
    });
    emit('updateCheckbox', values.value);
  }
};
const onEnter = (target) => {
  target.style.height = '0px';
  target.style.height = target.scrollHeight + 'px';
};
const onLeave = (target) => {
  target.style.height = '0px';
};
const itemClass = (id) => {
  switch (id % 6) {
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
const isSelected = (id) => {
  return props.multipleRadio && typeof radioValue.value === 'object'
    ? radioValue.value.includes(id)
    : radioValue.value === id;
};
</script>

<style lang="scss">
@import 'style';
.filter-radio-accordion {
  &__input-container {
    margin-bottom: v-bind(marginBottom);
  }
}
</style>
