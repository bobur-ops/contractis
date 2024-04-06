<template>
  <div id="root">
    <start-animation v-if="loading" />
    <nuxt-layout :class="{ hidden: loading }">
      <nuxt-page />
    </nuxt-layout>
    <div id="scripts"></div>
    <u-notifications>
      <template #title="{ title }">
        <span v-html="title" />
      </template>
      <template #description="{ description }">
        <span v-html="description" />
      </template>
    </u-notifications>
  </div>
</template>

<script setup>
const loading = ref(true);
const { hook } = useNuxtApp();
hook('page:finish', () => (loading.value = false));
</script>
<style scoped lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
#scripts {
  position: fixed;
}
</style>
