<template>
  <span>
    <span v-if="maxPeriod && minPeriod">
      от {{ minPeriod }} до {{ maxPeriod }}
    </span>
    <span v-else-if="minPeriod">{{ minPeriod }}</span>
    <span v-else-if="maxPeriod">{{ maxPeriod }}</span>
    {{ getFormatPeriod(formatPeriod) }}
  </span>
</template>

<script setup>
const props = defineProps({
  minPeriod: { type: Number, required: true },
  maxPeriod: { type: Number, default: null },
  formatPeriod: { type: String, required: true }
});

const { getDeclination } = useWordCase(props.minPeriod, props.maxPeriod);
const getFormatPeriod = (code) => {
  if (!props.minPeriod && !props.maxPeriod) return 'Не указано';
  switch (code) {
    case 'h':
      return getDeclination('час', 'часа', 'часов');
    case 'd':
      return getDeclination('день', 'дня', 'дней');
    case 'm':
      return getDeclination('месяц', 'месяца', 'месяцев');
  }
};
</script>
