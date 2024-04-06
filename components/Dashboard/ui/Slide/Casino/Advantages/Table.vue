<template>
  <section class="dashboard-casino-advantages-table">
    <header class="dashboard-casino-advantages-table-header">
      <ul class="dashboard-casino-advantages-table-header__list">
        <li class="dashboard-casino-advantages-table-header__item">№</li>
        <li class="dashboard-casino-advantages-table-header__item">
          Пользователь ID
        </li>
        <li class="dashboard-casino-advantages-table-header__item">Дата</li>
        <li class="dashboard-casino-advantages-table-header__item">Награда</li>
      </ul>
    </header>
    <article class="dashboard-casino-advantages-table-main">
      <ul
        v-for="(item, index) in data"
        :key="index"
        class="dashboard-casino-advantages-table-main__list"
      >
        <li class="dashboard-casino-advantages-table-main__item">
          {{ index + 1 }}
        </li>
        <li class="dashboard-casino-advantages-table-main__item">
          {{ item.email }}
        </li>
        <li class="dashboard-casino-advantages-table-main__item">
          {{ item.date }}
        </li>
        <li class="dashboard-casino-advantages-table-main__item">
          {{ item.promo }}
          <svgo-arrow-diag
            class="dashboard-casino-advantages-table-main__arrow"
          />
        </li>
      </ul>
    </article>
  </section>
</template>

<script setup>
const data = ref([
  {
    id: 1,
    email: 'daisy@gmail.com',
    date: '22-08-2024',
    promo: 'Промокод использован'
  },
  {
    id: 2,
    email: 'daisy@gmail.com',
    date: '22-08-2024',
    promo: 'Промокод использован'
  },
  {
    id: 3,
    email: 'daisy@gmail.com',
    date: '22-08-2024',
    promo: 'Промокод использован'
  }
]);
</script>

<style scoped lang="scss">
.dashboard-casino-advantages-table {
  @apply w-full;
  border: 1px solid $white;
  border-radius: 5px;
  &-header {
    @apply w-full h-fit;
    border: 1px solid $white;
    border-radius: 5px;
    padding: 13px;
    &__list {
      @apply grid;
      grid-template-columns: 13px 31.2% 13.12% 1fr;
      gap: 30px;
    }
    &__item {
      line-height: 8px;
      color: $gray;
      font-size: 12px;
    }
  }
  &-main {
    padding: 18px 13px;
    @apply w-full flex flex-col;
    gap: $space-small-plus;
    height: 400px;
    &__list {
      @apply grid;
      grid-template-columns: 13px 31.2% 13.12% 1fr;
      gap: 30px;
    }
    &__arrow {
      height: 9px;
    }
    &__item {
      &:first-child {
        @apply flex justify-end;
      }
      &:nth-child(2) {
        text-decoration-line: underline;
      }
      &:last-child {
        color: $light-red;
      }
      @apply flex;
      gap: 7px;
      line-height: 8px;
      color: $white;
      font-size: 12px;
    }
  }
}
</style>
