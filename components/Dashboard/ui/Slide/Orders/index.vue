<template>
  <article class="dashboard-orders">
    <ul class="dashboard-orders__aside">
      <li
        v-for="state in states"
        :key="state.id"
        class="dashboard-orders__aside-item"
        :class="{
          'dashboard-orders__aside-item_selected': selectedState === state.id
        }"
        @click="switchState(state.id)"
      >
        <div class="dashboard-orders__aside-item-title">
          <Transition name="arrow-left">
            <svgo-arrow
              v-if="selectedState === state.id"
              class="dashboard-orders__aside-item-arrow"
            />
          </Transition>
          <div>
            <span class="dashboard-orders__aside-item-text">
              {{ state.name }}
            </span>
            <span class="dashboard-orders__aside-item-text-top">
              {{ state.count }}
            </span>
          </div>
        </div>
        <Transition name="arrow-right">
          <svgo-arrow
            v-if="selectedState !== state.id"
            class="dashboard-orders__aside-item-arrow"
          />
        </Transition>
      </li>
    </ul>
    <Transition name="arrow-right">
      <order-ui-list
        v-show="selectedState === 1"
        :refresh-on-mount="true"
        path="orders/user"
        store-name="published"
        class="dashboard-orders__main"
      />
    </Transition>
  </article>
</template>

<script setup>
const states = [
  {
    id: 1,
    name: 'Опубликованные',
    count: 22
  },
  {
    id: 2,
    name: 'На модерации',
    count: 22
  },
  {
    id: 3,
    name: 'Неопубликованные',
    count: 22
  },
  {
    id: 4,
    name: 'Корзина (архив)',
    count: 22
  }
];
const selectedState = ref(1);
const switchState = (state) => {
  selectedState.value = state;
};
</script>

<style scoped lang="scss">
.arrow-left-enter-active {
  transition: all 0.3s ease;
}

.arrow-left-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}
.arrow-left-leave-to {
  position: fixed;
  transform: translateX(20px);
  opacity: 0;
}

.arrow-right-enter-active {
  transition: all 0.3s ease;
}
.arrow-right-leave-active {
  transition: all 0.3s ease;
}

.arrow-right-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}
.arrow-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.dashboard-orders {
  background: transparent;
  @apply grid;
  gap: 4%;
  grid-template-columns: 356px 71%;
  padding-bottom: 60px;
  &__aside {
    @apply flex flex-col;
    gap: $space-medium;
    &-item {
      @apply w-full justify-between items-center flex cursor-pointer;
      border: 1px solid $border-block;
      height: 55px;
      padding: 0 20px;
      background: $bg-black-block;
      border-radius: 8px;
      transition: border 0.3s;
      &-title {
        @apply flex items-center;
        gap: $space-smaller;
      }
      &_selected {
        border: 1px solid #3633d0;
        background: transparent;
      }
      &-arrow {
        height: 12px;
      }
      &-text {
        font-size: 20px;
        font-weight: 500;
        &-top {
          vertical-align: top;
          margin-left: 8px;
          font-size: 15px;
          font-weight: 400;
          color: $gray-50;
        }
      }
    }
  }
}
</style>
