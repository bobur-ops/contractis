<template>
  <ul class="order-categories">
    <li
      v-if="
        category && typeof category === 'object' && !Array.isArray(category)
      "
      class="order-categories__block"
      :class="itemClass(category)"
    >
      {{ category?.name }}
    </li>
    <li
      v-for="item in category"
      v-else-if="
        category &&
        Array.isArray(category) &&
        category.length &&
        category.every((e) => typeof e === 'object')
      "
      :key="item.id"
      class="order-categories__block"
      :class="itemClass(item)"
    >
      {{ item?.name }}
    </li>
    <li
      v-for="item in category"
      v-else-if="
        category &&
        Array.isArray(category) &&
        category.length &&
        category.every((e) => typeof e === 'number')
      "
      :key="item"
      class="order-categories__block"
      :class="itemClass(getCategory(item))"
    >
      {{ getCategory(item)?.name }}
    </li>
    <li
      v-else-if="getCategory(category)"
      class="order-categories__block"
      :class="itemClass(getCategory(category))"
    >
      {{ getCategory(category)?.name }}
    </li>
    <li
      v-if="specialization && typeof specialization === 'object'"
      class="order-categories__block"
      :class="itemClass(specialization)"
    >
      {{ specialization?.name }}
    </li>
    <li
      v-else-if="getSpecialization"
      class="order-categories__block"
      :class="itemClass(getSpecialization)"
    >
      {{ getSpecialization?.name }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  category: { type: [Object, Array, Number], required: true },
  specialization: { type: [Object, Number], default: undefined },
  categories: { type: Array, default: () => [] }
});
const getCategory = (id) => props.categories.find((e) => e.id === id);

const getSpecialization = computed(() => {
  if (typeof props.specialization === 'object') return null;
  if (props.categories) {
    for (const category of props.categories) {
      for (const specialization of category.list) {
        if (specialization.id === props.specialization) {
          console.log(specialization);
          return specialization;
        }
      }
    }
  }
});
// console.log(getSpecialization.value);
// watch(
//   () => getSpecialization.value,
//   () => {
//     console.log(getSpecialization.value);
//   }
// );
const itemClass = (item) => {
  switch (item?.id % 6) {
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
</script>

<style scoped lang="scss">
.order-categories {
  @apply flex;
  gap: $space-small;
  &__block {
    font-family: Manrope, sans-serif;
    padding: 7px 15px;
    font-weight: 500;
    font-size: 12px;
    line-height: 9px;
    border-radius: 6px;
    &_yellow {
      @include color-block('yellow');
    }
    &_pink {
      @include color-block('pink');
    }
    &_blue {
      @include color-block('blue');
    }
    &_red {
      @include color-block('red');
    }
    &_sky {
      @include color-block('sky');
    }
    &_green {
      @include color-block('green');
    }
  }
}
</style>
