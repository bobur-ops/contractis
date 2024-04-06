<template>
  <div class="menu-layout">
    <app-header-ui />
    <app-menu-ui v-if="userToken" />
    <main ref="main" class="main">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { token: userToken } = useStore();
</script>

<style scoped lang="scss">
.main {
  min-height: calc($full-height - 120px);
}
.menu-layout {
  @include gb-blur();
  font-family: $base-font;
  min-height: 100vh;
}
</style>
