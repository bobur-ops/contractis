<template>
  <div class="main">
    <div class="start">
      <h2 class="start__title">CONTRACTIS</h2>
      <div class="start__planet-block">
        <video
          autoplay
          loop
          muted
          class="start__planet"
          src="assets/images/Earth.mp4"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  @apply relative overflow-hidden;
  min-height: 100vh;
  background: $bg-stars-2 fixed center;
  z-index: $z-index-5;
}
.start {
  @apply flex items-center justify-between mx-auto;
  height: 100vh;
  max-width: pxToRem(1220);
  @media screen and ($media-lg-query) {
  }
  &__title {
    font-family:
      Meedori Sans,
      sans-serif;
    font-size: pxToRem(70);
    font-weight: 400;
    letter-spacing: pxToRem(-3);
    color: $white;
    @media screen and ($media-lg-query) {
      @apply flex-1;
      text-align: center;
      /* font-size: calculateVw768(70);
      letter-spacing: calculateVw768(-3); */
    }
    @media screen and ($media-md-query) {
      @apply flex-1;
      text-align: center;
      font-size: pxToRem(36);
      /* font-size: calculateVw425(32);
      letter-spacing: calculateVw425(0); */
    }
  }
  &__planet-block {
    @include earth-block(pxToRem(300));
    @media screen and ($media-lg-query) {
      @apply hidden;
    }
  }
  &__planet {
    @include earth-video(pxToRem(397), pxToRem(63), pxToRem(59));
  }
}
</style>
