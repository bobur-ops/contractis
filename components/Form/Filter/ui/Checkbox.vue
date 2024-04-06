<template>
  <div class="filter-checkbox">
    <h3 v-if="title" class="filter-checkbox__title">{{ title }}</h3>
    <div class="filter-checkbox__checkboxes-block">
      <form-checkbox
        v-for="(filter, ind) in filters"
        :id="filter.name"
        :key="filter.id"
        :model-value="values[ind]"
        gap="20px"
        :init-val="getInitVal(filter)"
        :checkbox-height="checkboxHeight"
        :truncate="truncate"
        @update:model-value="updateValues($event, ind)"
      >
        {{ filter.name }}
      </form-checkbox>
    </div>
  </div>
</template>

<script setup>
const { warning } = useNotifications();
const props = defineProps({
  title: { type: String, default: '' },
  filters: { type: Array, required: true },
  initVal: { type: [Array, Number], default: undefined },
  marginBottom: { type: String, default: '35px' },
  checkboxHeight: { type: String, default: 'auto' },
  rowGap: { type: String, default: '20px' },
  truncate: { type: Boolean, default: false },
  multiple: { type: Boolean, default: true },
  warningText: { type: String, default: '' }
});
const values = ref([]);
props.filters.forEach((el, id) => (values.value[id] = false));
const emit = defineEmits(['updateCheckbox']);
const updateValues = (value, ind) => {
  values.value[ind] = false;
  if (
    (!props.multiple && values.value.filter((x) => x === true).length === 0) ||
    props.multiple
  )
    values.value[ind] = value;
  else if (value) warning(props.warningText);
  emit('updateCheckbox', values.value, props.filters);
};
onMounted(() => setInitVal());
watchDeep(
  () => props.initVal,
  () => setInitVal()
);
const setInitVal = () => {
  if (props.initVal && props.multiple) {
    props.filters.forEach((filter, id) => {
      if (filter?.code) values.value[id] = props.initVal.includes(filter.code);
      else values.value[id] = props.initVal.includes(filter.id);
    });
  } else if (props.initVal) {
    props.filters.forEach((filter, id) => {
      if (filter?.code) values.value[id] = props.initVal === filter.code;
      else values.value[id] = props.initVal === filter.id;
    });
  } else {
    props.filters.forEach((filter, id) => {
      values.value[id] = false;
    });
  }
};
const getInitVal = (filter) => {
  if (props.multiple && props.initVal)
    return filter?.code
      ? props.initVal.indexOf(filter.code) >= 0
      : props.initVal.indexOf(filter.id) >= 0;
  else if (props.initVal)
    return filter?.code
      ? props.initVal === filter.code
      : props.initVal === filter.id;
};
</script>

<style scoped lang="scss">
.filter-checkbox {
  margin-bottom: v-bind(marginBottom);
  &__title {
    font-size: 18px;
    line-height: 18px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  &__checkboxes-block {
    @apply flex flex-col;
    gap: v-bind(rowGap);
  }
}
</style>
