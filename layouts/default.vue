<template>
  <div class="default-layout">
    <app-header @open-sidebar="handleOpenSidebar" />
    <sidebar :open="isSidebar" @close-sidebar="isSidebar = false" />
    <main ref="main" class="main">
      <slot />
    </main>
  </div>
</template>

<script setup>
const main = ref();
const isSidebar = ref(false);

const handleOpenSidebar = () => {
  isSidebar.value = true;
};

const setStep = () => {
  main.value !== null && main.value.clientHeight < 860
    ? document.body.style.setProperty('--step', '1.8')
    : document.body.style.setProperty('--step', '1');
};
onMounted(() => {
  setStep();
  window.addEventListener('resize', setStep, true);
});
</script>

<style scoped lang="scss">
.main {
  min-height: $full-height;
  padding: 0 15px;
  @media screen and ($media-sm-query) {
    padding: 0 50px;
  }
}
.default-layout {
  background: $black $bg-stars repeat fixed;
  font-family: $base-font;
}
</style>
