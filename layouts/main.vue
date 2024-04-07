<template>
  <div class="main-layout">
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
  min-height: 100vh;
  /* min-height: $main-height; */
}
.main-layout {
  @include gb-blur();
  font-family: $base-font;
  min-height: 100vh;
}
</style>
