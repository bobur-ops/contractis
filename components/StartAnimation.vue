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
  background: $bg-stars fixed center;
  z-index: $z-index-5;
}
.start {
  @apply flex items-center justify-between mx-auto;
  height: 100vh;
  max-width: calcWidth(1220);
  &__title {
    font-family:
      Meedori Sans,
      sans-serif;
    font-size: calcWidth(70);
    font-weight: 400;
    letter-spacing: -3.5px;
    color: $white;
    @media screen and ($media-lg-query) {
      @apply flex-1;
      text-align: center;
    }
  }
  &__planet-block {
    @include earth-block(300px);
    @media screen and ($media-lg-query) {
      @apply hidden;
    }
  }
  &__planet {
    @include earth-video(397px, 63px, 59px);
  }
}
</style>
