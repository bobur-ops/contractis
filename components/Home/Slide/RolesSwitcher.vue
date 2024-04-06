<template>
  <article class="role-switcher">
    <div
      class="role-switcher__role-block role-switcher__executor"
      @click="role = 'executor'"
    >
      <div
        class="role-switcher__role-image"
        :class="{ 'role-switcher__role-image_active': role === 'executor' }"
      >
        <img src="assets/images/home/executor.png" alt="executor" />
      </div>
      <shared-arrow-text
        :font-weight="roleFont[0]"
        font-size="22px"
        font-family="base"
      >
        Исполнитель
      </shared-arrow-text>
    </div>
    <div
      class="role-switcher__role-block role-switcher__customer"
      @click="role = 'customer'"
    >
      <div
        class="role-switcher__role-image"
        :class="{ 'role-switcher__role-image_active': role === 'customer' }"
      >
        <img src="assets/images/home/customer.png" alt="customer" />
      </div>
      <shared-arrow-text
        :font-weight="roleFont[1]"
        font-size="22px"
        font-family="base"
      >
        Заказчик
      </shared-arrow-text>
    </div>
  </article>
</template>

<script setup>
const emit = defineEmits(['roleSwitch']);
const role = ref('executor');
const roleFont = ref(['700', '400']);
watch(role, () => {
  [roleFont.value[0], roleFont.value[1]] = [
    roleFont.value[1],
    roleFont.value[0]
  ];
  emit('roleSwitch', role.value);
});
</script>

<style scoped lang="scss">
.role-switcher {
  @apply absolute flex justify-between;
  bottom: calcHeight(40px);
  right: 0;
  color: rgba($color: #fff, $alpha: 0.9);
  z-index: $z-index-2;
  gap: calcWidth(55);
  @media screen and ($media-lg-query) {
    gap: calculateVw768(55);
    bottom: calculateVw768(40px);
    width: 100%;
  }
  &__role-block {
    @apply flex flex-col justify-end cursor-pointer;
    gap: calcWidth(12);
    @media screen and ($media-lg-query) {
      gap: calculateVw768(12);
    }
  }
  &__role-image {
    @apply flex justify-center items-end;
    width: calcWidth(180);
    background-color: $black-transparent;
    border-radius: calcWidth(20);
    backdrop-filter: blur(14.846222877502441px);
    border: 1.5px solid $white;
    height: calcWidth(130);
    transition: 0.6s;
    @media screen and ($media-lg-query) {
      width: calculateVw768(180);
      height: calculateVw768(130);
      border-radius: calculateVw768(20);
    }
    img {
      height: calcWidth(170);
      @media screen and ($media-lg-query) {
        height: calculateVw768(170);
      }
    }
    &_active {
      box-shadow: 0 0 35px 0 $white-transparent;
      height: calcWidth(190);
      @media screen and ($media-lg-query) {
        height: calculateVw768(190);
      }
    }
  }
}
</style>
