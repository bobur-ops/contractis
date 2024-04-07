<template>
  <div class="auth-layout">
    <app-header-ui />
    <main ref="main" class="main">
      <section class="auth">
        <div class="auth__inner container">
          <img
            class="planet"
            src="assets/images/auth/Planet.png"
            alt="planet"
          />
          <article class="auth-block">
            <slot />
            <img
              src="assets/images/astronauts/Astronaut-auth.png"
              class="astronaut"
              alt="astronaut"
            />
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.main {
  min-height: $full-height;
}
.auth-layout {
  /* background: $black $bg-stars repeat fixed center; */
  @include gb-blur();
  font-family: $base-font;
}
.astronaut {
  @apply absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -99%;
  @media screen and ($media-lg-query) {
    @apply hidden;
  }
}
.planet {
  @apply absolute;
  top: calcHeight(120px);
  left: 0;
  @media screen and ($media-lg-query) {
    @apply hidden;
  }
}
.auth {
  @apply w-full flex justify-center items-center;
  min-height: $full-height;
  padding: calcWidth(45) 0;
  &__inner {
    @apply w-full h-full flex justify-center items-center relative;
  }
  &-block {
    @apply relative;
    border-radius: $border-radius-l;
    /* background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(14.846222877502441px); */
    border: calcWidth(1) solid rgba($color: #fff, $alpha: 0.8);
    font-family: $base-font;
    @media screen and ($media-lg-query) {
      @apply w-full;
      border: none;
    }
  }
}
</style>
