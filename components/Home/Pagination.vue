<template>
  <div class="pagination">
    <span class="pagination__page-number">{{
      convertToDouble(currentPage)
    }}</span>
    <div class="pagination__scroll-box">
      <div class="pagination__scrollbar"></div>
    </div>
    <span class="pagination__page-number">{{ convertToDouble(pages) }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  speedTime: { type: String, default: '1s' },
  currentPage: { type: Number, default: 1, required: true },
  pages: { type: Number, default: 2, required: true }
});
const scrollbarTop = computed(() => (props.currentPage - 1) * 40 + 'px');
const scrollHeight = props.pages * 40 + 'px';

const convertToDouble = (number) => {
  number = String(number);
  if (number.length === 1) number = '0' + number;
  return number;
};
</script>

<style scoped lang="scss">
.pagination {
  @apply hidden flex-col items-center absolute;
  @media screen and ($media-lg-query) {
    @apply flex;
  }
  width: 26px;
  bottom: 30px;
  right: 30px;
  z-index: $z-index-3;
  &__page-number {
    color: $gray;
    font-family: Play, sans-serif;
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 5px;
    margin-top: 4px;
  }
  &__scrollbar {
    @apply absolute top-0;
    height: 40px;
    width: 3px;
    background-color: $white;
    top: v-bind(scrollbarTop);
    transition: v-bind(speedTime);
  }
  &__scroll-box {
    @apply flex flex-col items-center relative;
    height: v-bind(scrollHeight);
    width: 1px;
    background-color: $white-transparent;
  }
}
</style>
