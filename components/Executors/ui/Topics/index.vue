<template>
  <ul class="executors-topics">
    <li v-for="topic in topics" :key="topic.id" class="executors-topics__item">
      <div class="executors-topics__logo">{{ topic.name.split('')[0] }}</div>
      {{ topic.name }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  topics: { type: Array, default: () => [] }
});
</script>

<style scoped lang="scss">
.executors-topics {
  @apply w-full h-fit flex flex-wrap flex-row;
  row-gap: 20px;
  column-gap: 2%;
  &__item {
    @apply w-fit h-fit flex items-center;
    padding: 9px 1%;
    white-space: nowrap;
    line-height: 11px;
    border: 1px solid $border-block;
    gap: 18px;
    color: $white;
    border-radius: 12px;
    background: $bg-black-block;
    font-size: 1rem;
    font-weight: 600;
  }
  &__logo {
    @apply flex justify-center items-center;
    border: 2.5px solid $white;
    border-radius: $border-radius-rounded;
    width: 35px;
    height: 35px;
    line-height: 11px;
    background: $light-red;
  }
}
</style>
