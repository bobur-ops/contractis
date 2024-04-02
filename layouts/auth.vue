<template>
  <div class="auth-layout">
    <app-header />
    <main ref="main" class="main">
      <section class="auth">
        <div class="auth__wrapper container">
          <img
            class="planet"
            src="assets/images/auth/Planet.png"
            alt="planet"
          />
          <article class="auth-block">
            <slot />
            <img
              src="assets/images/auth/Astronaut.png"
              class="astronaut"
              alt="astronaut"
            />
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const main = ref();
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
}
.auth-layout {
  background: $black $bg-stars repeat fixed;
  font-family: $base-font;
}
.astronaut {
  @apply absolute;
  top: calcHeight(203px);
  right: -100%;
}
.planet {
  @apply absolute;
  top: calcHeight(105px);
  left: calcHeight(50px);
}
.auth {
  @apply w-full flex justify-center items-center;
  height: $full-height;
  &__wrapper {
    @apply w-full flex justify-center items-center relative;
  }
  &-block {
    @apply relative;
    border-radius: $border-radius-l;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(14.846222877502441px);
    border: 1.5px solid $white;
    font-family: $base-font;
  }
}
</style>
