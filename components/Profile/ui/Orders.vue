<template>
  <div class="profile-orders">
    <div class="profile-orders__top">
      <h2 class="profile-orders__title">Заказы</h2>
      <shared-button-ghost
        height="42px"
        padding="0 25px"
        font-size="18px"
        font-weight="500"
      >
        Создать заказ
      </shared-button-ghost>
    </div>
    <shared-menu-dynamic
      :menu-list="ordersMenu"
      class="profile-orders__menu"
      @select-item="selectItem"
    />
    <order-ui-list
      v-if="selectedItem === 0"
      :key="1"
      path="orders/user"
      store-name="active"
      class="profile-orders__order-list"
    />
    <order-ui-list
      v-if="selectedItem === 1"
      :key="2"
      store-name="done"
      class="profile-orders__order-list"
    />
  </div>
</template>

<script setup>
import { ordersMenu } from '~/components/Profile/model/index.js';

const selectedItem = ref(0);
const selectItem = (index) => {
  selectedItem.value = index;
};
</script>

<style scoped lang="scss">
.profile-orders {
  background: $bg-black-block;
  border-radius: $border-radius-m;
  padding: 35px;
  min-height: 810px;
  &__title {
    font-size: 24px;
    font-weight: 600;
  }
  &__top {
    @apply flex justify-between items-center;
    margin-bottom: $space-medium-plus;
  }
  &__menu {
    margin-bottom: $space-medium-plus;
  }
  &__order-list {
    @apply overflow-y-auto;
    height: 565px;
    max-height: 565px;
    padding: 0 3px;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: $border-block;
    }
    &::-webkit-scrollbar-thumb {
      background: $white;
      border-radius: 3px;
    }
  }
}
</style>
