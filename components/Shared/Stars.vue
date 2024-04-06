<template>
  <div class="shared-stars"></div>
</template>

<script setup>
const props = defineProps({
  starSize: { type: String, default: '16px' },
  blockSize: { type: String, default: '100px' },
  count: { type: Number, required: true }
});
const percent = computed(() => props.count / 0.05 + '%');
</script>

<style scoped lang="scss">
.shared-stars {
  background: linear-gradient(
    to right,
    $white v-bind(percent),
    $star v-bind(percent)
  );
  width: v-bind(blockSize);
  height: v-bind(starSize);
  mask-image: url('/assets/icons/star.svg'), url('/assets/icons/star.svg'),
    url('/assets/icons/star.svg'), url('/assets/icons/star.svg'),
    url('/assets/icons/star.svg');
  mask-size: v-bind(starSize);
  mask-mode: alpha;
  mask-repeat: no-repeat;
  mask-position: 0, 25%, 50%, 75%, 100%;
}
</style>
