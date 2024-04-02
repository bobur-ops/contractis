<template>
  <main class="main">
    <slot />
  </main>
</template>

<script setup></script>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  background: $bg-stars fixed center;
}
</style>
