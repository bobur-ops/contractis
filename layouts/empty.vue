<template>
  <main class="main">
    <slot />
  </main>
</template>

<script setup></script>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  /* background: $bg-stars repeat fixed center; */
  @include gb-blur();
}
</style>
