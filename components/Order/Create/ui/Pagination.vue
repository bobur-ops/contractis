<template>
  <div class="order-create-pagination">
    <div class="order-create-pagination__planet-block">
      <img
        src="/assets/images/order/create/planet-dark.png"
        alt="planet"
        class="order-create-pagination__planet"
      />
      <transition name="fade">
        <div
          v-if="page === 1"
          class="order-create-pagination__label-block order-create-pagination__label-block_describe"
        >
          <img
            src="/assets/images/astronauts/astronaut-create-1.png"
            alt="astronaut"
            class="order-create-pagination__label-img"
          />
          <h2 class="order-create-pagination__label">1. Описание задачи</h2>
        </div>
      </transition>
    </div>
    <div class="order-create-pagination__line" />
    <div class="order-create-pagination__planet-block">
      <img
        src="/assets/images/order/create/planet-medium.png"
        alt="planet"
        class="order-create-pagination__planet"
      />
      <transition name="fade">
        <div
          v-if="page === 2"
          class="order-create-pagination__label-block order-create-pagination__label-block_price"
        >
          <img
            src="/assets/images/astronauts/astronaut-create-2.png"
            alt="astronaut"
            class="order-create-pagination__label-img"
          />
          <h2 class="order-create-pagination__label">2. Цена и сроки</h2>
        </div>
      </transition>
    </div>
    <div class="order-create-pagination__line" />
    <div class="order-create-pagination__planet-block">
      <img
        src="/assets/images/order/create/planet-light.png"
        alt="planet"
        class="order-create-pagination__planet"
      />
      <transition name="fade">
        <div
          v-if="page === 3"
          class="order-create-pagination__label-block order-create-pagination__label-block_publish"
        >
          <img
            src="/assets/images/astronauts/astronaut-create-3.png"
            alt="astronaut"
            class="order-create-pagination__label-img"
          />
          <h2 class="order-create-pagination__label">3. Публикация</h2>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
defineProps({
  page: {
    type: Number,
    required: true
  }
});
</script>

<style scoped lang="scss">
.order-create-pagination {
  @apply flex items-center;
  column-gap: 15px;
  margin-bottom: $space-large-plus;
  &__line {
    width: 100%;
    border-bottom: 2px dashed $blue;
  }
  &__planet {
    height: 84px;
  }
  &__planet-block {
    @apply relative;
    min-width: 84px;
  }
  &__label-block {
    @apply absolute flex w-max items-center;
    &_describe {
      top: 0;
      transform: translateY(-50%);
      left: 100%;
    }
    &_price {
      top: 0;
      transform: translateY(-100%);
      left: 21%;
    }
    &_publish {
      @apply flex-row-reverse;
      top: 0;
      transform: translateY(-50%);
      right: 100%;
    }
  }
  &__label-img {
    width: 49px;
    height: 49px;
  }
  &__label {
    font-size: 16px;
    font-weight: 500;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
