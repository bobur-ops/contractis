<template>
  <div class="executors-list">
    <ul class="executors-list__inner">
      <executors-ui-list-mini-item
        v-for="(executor, ind) in executorList.slice(0, 3)"
        :key="ind"
        :executor="executor"
      />
    </ul>
  </div>
</template>

<script setup>
defineProps({
  executorList: { type: [Array, Object], default: () => {} }
});
</script>

<style scoped lang="scss">
.executors-list {
  @apply flex items-center flex-col w-full;
  &__inner {
    @apply flex flex-col w-full;
    row-gap: 25px;
  }
}
</style>
