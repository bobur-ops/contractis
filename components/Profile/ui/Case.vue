<template>
  <div id="cases" class="profile-case">
    <div class="profile-case__top">
      <div class="profile-case__title-block">
        <h2 class="profile-case__title">Портфолио (кейсы)</h2>
        <order-card-ui-aside-color-block
          :value="userData.user.profile.cases?.length ?? 0"
          color="blue"
        />
      </div>
      <shared-button-ghost
        height="42px"
        padding="0 25px"
        font-size="18px"
        font-weight="500"
        @click.prevent="addCase"
      >
        Добавить кейс
      </shared-button-ghost>
    </div>
    <swiper
      v-if="userData.user.profile.cases?.length"
      slides-per-view="auto"
      space-between="15px"
      class="profile-case__swiper"
    >
      <swiper-slide
        v-for="category in getCategories"
        :key="category.id"
        class="profile-case__swiper-slide"
      >
        <label
          class="profile-case__category"
          :class="{
            'profile-case__category_active': selectedCategory === category.id
          }"
        >
          <input
            v-model="selectedCategory"
            type="radio"
            name="category"
            :value="category.id"
            class="hidden"
          />
          <svgo-circle-selected
            v-if="selectedCategory === category.id"
            class="profile-case__category-checked"
          />
          <svgo-circle-empty v-else class="profile-case__category-checked" />
          <span class="profile-case__category-name">{{ category.name }}</span>
        </label>
      </swiper-slide>
    </swiper>
    <div v-if="userData.user.profile.cases?.length" class="profile-case__list">
      <shared-examples-item
        v-for="(example, id) in getCases"
        :key="id"
        :example="example"
        example-type="edit"
      />
    </div>
    <div v-else class="profile-case__no-cases">
      <p class="profile-case__no-cases-text">У вас пока нет кейсов</p>
    </div>
  </div>
</template>

<script setup>
const userData = useUserData();
const getCategories = computed(() => {
  const categories = [];
  categories.push({ id: 0, name: 'Все кейсы ' });
  userData.value?.user.profile.cases.forEach((e) => {
    if (categories.every((n) => n.id !== e.category.id))
      categories.push(e.category);
  });
  return categories;
});
const selectedCategory = ref(0);
const getCases = computed(() => {
  const cases = [];
  if (selectedCategory.value) {
    userData.value?.user.profile.cases.forEach((e) => {
      if (e.category.id === selectedCategory.value) cases.push(e);
    });
    return cases;
  } else return cases.concat(userData.value?.user.profile.cases);
});

const emit = defineEmits(['addCase']);
const addCase = () => {
  emit('addCase');
};
</script>

<style scoped lang="scss">
.profile-case {
  background: $bg-black-block;
  padding: $space-large 0;
  border-radius: $border-radius-m;
  min-height: 325px;
  max-width: 1000px;
  &__top {
    @apply flex justify-between items-center;
    padding: 0 $space-large;
    margin-bottom: $space-medium-plus;
  }
  &__title {
    font-weight: 600;
    font-size: 24px;
  }
  &__title-block {
    @apply flex items-center;
    gap: 20px;
  }
  &__cases-count__cases-count {
    @apply flex items-center;
    padding: 0 10px;
  }
  &__no-cases {
    @apply flex justify-center items-center;
    height: 210px;
  }
  &__no-cases-text {
    font-size: 20px;
    font-weight: 400;
    color: $gray-60;
  }
  &__category-checked {
    height: 12px;
    width: 12px;
  }
  &__swiper {
    padding: 0 $space-large;
    margin-bottom: $space-large;
  }
  &__swiper-slide {
    width: min-content;
  }
  &__category {
    @apply flex w-max items-center;
    height: 46px;
    padding: 0 17px;
    border-radius: $border-radius-s;
    gap: 8px;
    transition: 0.1s;
    background:
      linear-gradient($bg-inputs, $bg-inputs) padding-box,
      $border-block border-box;
    border: 1px solid transparent;
    &_active {
      background:
        linear-gradient($bg-inputs, $bg-inputs) padding-box,
        $gradient-skyblue-blue border-box;
    }
  }
  &__category-name {
    font-size: 16px;
    font-weight: 500;
  }
  &__list {
    @apply grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: $space-large-plus;
    padding: 0 $space-large;
  }
}
</style>
