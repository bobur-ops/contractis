<template>
  <ul class="stats">
    <li
      v-for="(value, key) in statsData"
      v-show="value.description"
      :key="key"
      class="stats__item"
    >
      <div v-if="value.description" class="stats__item-icon">
        <component :is="value.icon" class="stats__item-icon-svg" />
      </div>
      <p
        v-if="key === 'reviews'"
        :class="{ hidden: !value.description }"
        class="stats__item-text"
      >
        <span class="stats__item-title"> Отзывы </span>
        <span class="stats__item-description">
          <span class="stats__item-description_positive">
            {{ value.positive }} +
          </span>
          /
          <span class="stats__item-description_negative">
            {{ value.negative }} -
          </span>
        </span>
      </p>
      <p
        v-else
        class="stats__item-text"
        :class="{ hidden: !value.description }"
      >
        <span class="stats__item-title"> {{ value.title }} </span>
        <span class="stats__item-description">{{ value.description }}</span>
      </p>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  experience: { type: String, default: null },
  portfolioCount: { type: String, default: null },
  positiveReviews: { type: Number, default: 0 },
  negativeReviews: { type: Number, default: 0 },
  teamCount: { type: String, default: null }
});

const icons = reactive({
  badge: 'svgo-stats-badge',
  photoLibrary: 'svgo-stats-photo-library',
  reviews: 'svgo-stats-reviews',
  team: 'svgo-profile-team'
});

const statsData = reactive({
  experience: {
    icon: icons.badge,
    title: 'На площадке',
    description: props.experience
  },
  portfolio: {
    icon: icons.photoLibrary,
    title: 'Портфолио',
    description: props.portfolioCount
  },
  reviews: {
    icon: icons.reviews,
    title: 'Отзывы',
    positive: props.positiveReviews,
    negative: props.negativeReviews,
    description: true
  },
  team: {
    icon: icons.team,
    title: 'В команде',
    description: props.teamCount
  }
});
</script>

<style scoped lang="scss">
.stats {
  @apply flex;
  gap: $space-large;
  &__item {
    @apply flex w-fit h-fit items-center;
    gap: $space-small;
    &-text {
      @apply flex flex-col;
      gap: $space-smaller;
    }
    &-title {
      line-height: 10px;
      font-weight: 700;
      font-size: v-bind(titleSize);
    }
    &-description {
      line-height: 8px;
      font-weight: 500;
      font-size: 12px;
      letter-spacing: 0.25px;
      &_positive {
        color: #468744;
      }
      &_negative {
        color: #b74040;
      }
    }
    &-icon {
      @apply flex justify-center items-center;
      width: 38px;
      height: 38px;
      border-radius: $border-radius-rounded;
      background: $gray-05;
      &-svg {
        max-width: 26px;
        height: 21px;
      }
    }
  }
}
</style>
