<template>
  <section class="dashboard-casino-ref-link-block">
    <div class="dashboard-casino-ref-link-block__inner">
      <h2 class="dashboard-casino-ref-link-block__title">
        Ваша реферальная ссылка
      </h2>
      <div class="dashboard-casino-ref-link-block__link">
        <span>contractis.ru/reg?ref=12521512j412j412523352543534</span>
        <shared-button-gradient-blue
          font-size="18px"
          button-height="51px"
          button-width="217px"
          border="0 10px 10px 0"
        >
          <shared-arrow-text font-size="18px" font-weight="600">
            Скопировать
          </shared-arrow-text>
        </shared-button-gradient-blue>
      </div>
      <p class="dashboard-casino-ref-link-block__description">
        Приглашайте других пользователей и получайте скидку за каждого
        приглашенного Пользователя.
      </p>
      <p class="dashboard-casino-ref-link-block__loyalty">
        Читать условия программы лояльности
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dashboard-casino-ref-link-block {
  @apply w-full h-full flex;
  padding: 27px;
  background: $bg-black-block;
  border: 1px solid $border-block;
  border-radius: 12px;
  &__inner {
    @apply w-full h-full flex flex-col;
    gap: $space-medium;
  }
  &__title {
    line-height: 13px;
    font-size: 20px;
    font-weight: 600;
  }
  &__link {
    @apply flex items-center relative overflow-hidden w-full justify-between;
    height: 51px;
    background: $gray-05;
    border-radius: $border-radius-m;
    padding-right: 1px;
    padding-left: 15px;
  }
  &__description {
    @apply w-full;
    line-height: 13px;
    color: $gray;
    font-size: 13px;
    white-space: nowrap;
    font-weight: 400;
  }
  &__loyalty {
    @apply cursor-pointer;
    font-weight: 300;
    font-size: 12px;
    line-height: 13px;
    text-decoration: underline;
  }
}

//.search-field {
//  width: 765px;
//  height: 45px;
//  max-width: 100%;
//  border-radius: $border-radius-m;
//  background: $bg-inputs-light;
//  padding-right: 1px;
//  @apply flex items-center relative overflow-hidden;
//  &__input {
//    width: 100%;
//    height: 45px;
//    padding-left: 55px;
//    padding-right: 5px;
//    background: $bg-inputs-light;
//    border-radius: $border-radius-m 0 0 $border-radius-m;
//  }
</style>
