<template>
  <div class="dashboard-home">
    <dashboard-ui-welcome :welcome-list="WelcomeList" />
    <dashboard-ui-customer-role-card v-if="userData.role === 'client'" />
    <dashboard-ui-executor-role-card v-else />
    <dashboard-ui-feedback />
    <article v-if="userData.role === 'client'" class="dashboard-home__items">
      <h3 class="dashboard-home__items-title">ТОП - 3 исполнителей</h3>
      <executors-ui-list-mini
        class="dashboard-home__items-list"
        :executor-list="executorsData"
      />
    </article>
    <article
      v-else-if="userData.role === 'performer'"
      class="dashboard-home__items"
    >
      <h3 class="dashboard-home__items-title">+132 новых заказа за сутки</h3>
      <order-ui-list-mini class="dashboard-home__items-list" />
    </article>
    <dashboard-ui-executor-loyalty v-if="userData.role === 'performer'" />
    <dashboard-ui-customer-create-order v-else />
  </div>
</template>

<script setup>
import {
  CustomerWelcomeList,
  ExecutorWelcomeList
} from '~/components/Dashboard/model';
import { executorsData } from '~/components/Executors/model';

const userData = useUserData();
const WelcomeList = computed(() => {
  if (userData.value) {
    if (userData.value.role === 'client') return CustomerWelcomeList;
    if (userData.value.role === 'performer') return ExecutorWelcomeList;
  }
});
</script>

<style scoped lang="scss">
.dashboard-home {
  @apply grid;
  max-width: 1420px;
  grid-template-areas:
    'welcome role role'
    'welcome feedback order-list'
    'loyalty loyalty order-list';
  row-gap: 65px;
  column-gap: 70px;
  grid-template-columns: 40fr 34fr 54fr;
  grid-template-rows: 143px 180px 288px;
  &__loyalty {
    background: $bg-black-block;
    border: 1px solid $border-block;
    border-radius: $border-radius-m;
  }
  &__items {
    @apply relative;
    grid-area: order-list;
  }
  &__items-title {
    @apply absolute right-0;
    top: -30px;
    color: $gray-50;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
