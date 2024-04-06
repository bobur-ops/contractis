<template>
  <div class="default-layout">
    <app-header-ui @open-sidebar="handleOpenSidebar" />
    <sidebar :open="isSidebar" @close-sidebar="isSidebar = false" />
    <app-menu-ui v-if="typeof userToken !== 'object'" />
    <main ref="main" class="main">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { token: userToken } = useStore();

const isSidebar = ref(false);

const handleOpenSidebar = () => {
  isSidebar.value = true;
};
</script>

<style scoped lang="scss">
.main {
  min-height: $full-height;
}
.default-layout {
  background: $black $bg-stars repeat fixed center;
  font-family: $base-font;
}
</style>
