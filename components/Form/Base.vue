<template>
  <form class="form">
    <div class="form-labels">
      <slot name="labels" />
    </div>
    <div class="form-buttons">
      <slot name="buttons" />
    </div>
  </form>
</template>

<script setup></script>

<style scoped lang="scss">
@import 'style';
</style>
