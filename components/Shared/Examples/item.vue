<template>
  <li class="examples-item">
    <div class="examples-item__image-block" @click="toCase">
      <img
        src="/assets/images/order/card/exampleImage.png"
        alt="example-image"
        class="examples-item__image"
      />
      <div class="examples-item__popup">
        <p class="examples-item__budget">
          <span class="examples-item__popup-title"> Бюджет:&nbsp; </span>
          {{ new Intl.NumberFormat('ru-RU').format(example.price) }}
          <span class="examples-item__budget-format"> ₽ </span>
        </p>
        <p class="examples-item__time">
          <span class="examples-item__popup-title"> Срок:&nbsp; </span>
          <shared-deadline
            :min-period="example.period"
            :format-period="example.formatPeriod"
          />
        </p>
      </div>
      <div v-if="exampleType === 'edit'" class="examples-item__edit">
        <div class="examples-item__button-block">
          <shared-arrow-text font-size="12px" font-weight="500">
            Редактировать
          </shared-arrow-text>
        </div>
        <div class="examples-item__button-block">
          <shared-arrow-text font-size="12px" font-weight="500" color="red">
            Удалить
          </shared-arrow-text>
        </div>
      </div>
    </div>
    <p class="examples-item__title" @click="toCase">
      {{ example.name }}
    </p>
  </li>
</template>

<script setup>
defineProps({
  example: { type: Object, required: true },
  exampleType: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'edit'].includes(value)
  }
});
const router = useRouter();
const toCase = () => {
  router.push('/cases/1');
};
</script>

<style scoped lang="scss">
.examples-item {
  @apply flex flex-col;
  width: 285px;
  gap: 17px;
  &__image {
    height: 159px;
  }
  &__image-block {
    @apply cursor-pointer h-fit w-fit relative;
    overflow: hidden;
    border-radius: 25px;
    width: 285px;
    &:hover .examples-item__popup {
      bottom: 0;
    }
    &:hover .examples-item__edit {
      right: 0;
    }
    &:hover:before {
      @apply absolute;
      content: '';
      width: 100%;
      height: 100%;
      background: radial-gradient(
          circle at center top,
          $radial-glow-start 0,
          $radial-glow-end 160px
        ),
        transparent;
    }
  }
  &__popup {
    @apply absolute justify-center items-start flex flex-col;
    padding-left: 12px;
    transition: 0.2s;
    bottom: -56px;
    width: 55%;
    height: 56px;
    border-radius: 0 $border-radius-m 0 0;
    background: $bg-black-block;
    font-weight: 600;
  }
  &__popup-title {
    @include gradient-text($base-font, 12px, 500);
  }
  &__budget {
    font-size: 12px;
    font-weight: 400;
  }
  &__time {
    font-size: 12px;
    font-weight: 400;
  }
  &__title {
    font-weight: 400;
    font-size: 14px;
  }
  &__edit {
    @apply flex flex-col absolute justify-between items-end;
    right: -150px;
    gap: $space-small;
    top: $space-small-plus;
    transition: 0.2s;
  }
  &__button-block {
    @apply flex items-center justify-center;
    background: $bg-black-block;
    height: 27px;
    padding: 0 $space-small;
    border-radius: $border-radius-m 0 0 $border-radius-m;
  }
}
</style>
