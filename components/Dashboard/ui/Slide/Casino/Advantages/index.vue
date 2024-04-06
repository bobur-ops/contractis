<template>
  <section class="dashboard-casino-advantages">
    <div class="dashboard-casino-advantages__inner">
      <h2 class="dashboard-casino-advantages__title">
        Ваши реферальные достижения
      </h2>
      <article class="dashboard-casino-advantages-referrals">
        <div class="dashboard-casino-advantages-circle">
          <div class="dashboard-casino-advantages-circle__inside">
            <span class="dashboard-casino-advantages-referrals__count">12</span>
          </div>
        </div>
        <div class="dashboard-casino-advantages-referrals__info">
          <p class="dashboard-casino-advantages-referrals__info-title">
            У вас 12 рефералов
          </p>
          <p class="dashboard-casino-advantages-referrals__info-discount">
            Ваша скидка:
            <span
              class="dashboard-casino-advantages-referrals__info-discount_count"
            >
              5%
            </span>
          </p>
        </div>
      </article>
      <article class="dashboard-casino-advantages-referral-list">
        <h3 class="dashboard-casino-advantages-referral-list__title">
          Список рефералов
        </h3>
        <dashboard-ui-slide-casino-advantages-table
          class="dashboard-casino-advantages__table"
        />
      </article>
      <p class="dashboard-casino-advantages__loyalty">
        Читать условия программы лояльности
      </p>
    </div>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
.dashboard-casino-advantages {
  @apply w-full h-full;
  padding: 28px;
  background: $bg-black-block;
  border: 1px solid $border-block;
  border-radius: 12px;
  &__inner {
    @apply w-full h-full flex flex-col;
  }
  &__title {
    line-height: 13px;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: $space-large-plus;
  }
  &-circle {
    @apply flex items-center justify-center;
    width: 66px;
    height: 66px;
    border-radius: $border-radius-rounded;
    background: $gradient-skyblue-blue;
    &__inside {
      @apply flex items-center justify-center;
      width: 60px;
      height: 60px;
      border-radius: $border-radius-rounded;
      background: $white;
    }
  }
  &-referrals {
    @apply flex items-center;
    gap: 28px;
    margin-bottom: $space-xx-large-plus;
    &__count {
      @include gradient-text($title-font, 28px, 700, 89%);
    }
    &__info {
      @apply flex flex-col;
      gap: $space-small;
      &-title {
        font-weight: 600;
        font-size: 20px;
        line-height: 17px;
      }
      &-discount {
        font-weight: 400;
        color: $gray;
        font-size: 18px;
        line-height: 13px;
        &_count {
          @include gradient-text($base-font, 18px, 500, 13px);
        }
      }
    }
  }
  &-referral-list {
    @apply flex flex-col;
    gap: $space-medium;
    margin-bottom: 20px;
    &__title {
      font-weight: 600;
      font-size: 20px;
      line-height: 14px;
    }
  }
  &__loyalty {
    @apply cursor-pointer;
    font-weight: 300;
    font-size: 12px;
    line-height: 13px;
    text-decoration: underline;
  }
}
</style>
