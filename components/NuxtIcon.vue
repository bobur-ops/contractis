<template>
  <span
    class="nuxt-icon text-gray-main"
    :style="{
      width: `${size}px`,
      height: `${size}px`
    }"
    v-html="icon"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 24
  }
});

const icon = ref<any>('');

try {
  const iconsImport = import.meta.glob('assets/icons/**/**.svg', {
    as: 'raw',
    eager: false
  });
  const rawIcon = await iconsImport[`/assets/icons/${props.name}.svg`]();
  icon.value = rawIcon;
} catch {
  console.warn(
    `[nuxt-icons] Icon '${props.name}' doesn't exist in 'assets/icons'`
  );
}
</script>

<style>
.nuxt-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
