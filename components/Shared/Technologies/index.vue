<template>
  <ul v-if="view === 'string'" class="technologies">
    <li
      v-for="(technology, id) in technologies"
      :key="id"
      class="technologies__item"
    >
      <shared-get-icon :name="technology.name" class="technologies__item-img" />
      {{ technology.name }}
      <span v-if="++id !== technologies.length">,</span>
    </li>
  </ul>
  <ul v-else-if="view === 'block'" class="technologies-block">
    <li
      v-for="(technology, index) in technologies"
      :key="index"
      class="technologies-block__item"
      @click="deleteTechnology(index)"
    >
      <div class="technologies-block__icon-block">
        <shared-get-icon
          :name="technology.name"
          class="technologies-block__icon"
        />
      </div>
      <span class="technologies-block__title">
        {{ technology.name }}
      </span>
      <span
        v-if="deletePossible"
        class="technologies-block__delete"
        @click="deleteTechnology(index)"
      >
        Удалить
      </span>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  technologies: { type: Array, required: true },
  fontSize: { type: String, default: '14px' },
  view: { type: String, default: 'string' },
  deletePossible: { type: Boolean, default: false },
  perLine: { type: Number, default: 0 }
});

const emits = defineEmits(['delete-technology']);
const deleteTechnology = (id) => {
  if (props.deletePossible) {
    emits('delete-technology', id);
  }
};
</script>

<style scoped lang="scss">
.technologies {
  @apply flex;
  gap: $space-smaller;
  &__item {
    @apply flex items-center;
    gap: 3px;
    font-weight: 500;
    font-size: v-bind(fontSize);
    &-img {
      width: 14px;
    }
  }
  &-block {
    @apply grid w-full h-fit;
    column-gap: $space-x-large-plus;
    row-gap: $space-large-plus;
    grid-template-columns: repeat(v-bind(perLine), 1fr);
    &__icon-block {
      @apply flex items-center;
      transition: 0.1s;
      height: 48px;
    }
    &__icon {
      width: 48px;
    }
    &__item {
      @apply flex flex-col items-center relative cursor-pointer;
      width: 72px;
      gap: $space-small;
      padding-bottom: $space-smaller;
      &:hover {
        .technologies-block__icon-block,
        .technologies-block__title {
          opacity: 0.5;
        }
        .technologies-block__delete {
          z-index: $z-index-1;
          opacity: 1;
        }
      }
    }
    &__title {
      font-weight: 500;
      line-height: 10px;
      font-size: v-bind(fontSize);
      transition: 0.1s;
    }
    &__delete {
      @apply absolute cursor-pointer;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      z-index: $z-index-0;
      transition: 0.2s;
      color: $light-red;
      font-size: 12px;
    }
  }
}
</style>
