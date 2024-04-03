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
      <arrow-text :font-weight="roleFont[0]" font-size="16px" font-family="base"
        >Исполнитель</arrow-text
      >
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
      <arrow-text :font-weight="roleFont[1]" font-size="16px" font-family="base"
        >Заказчик</arrow-text
      >
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
  color: $white;
  z-index: $z-index-2;
  gap: calcHeight(55px);
  padding: 0;
  @media screen and ($media-lg-query) {
    width: 100%;
  }
  &__role-block {
    @apply flex flex-col justify-end cursor-pointer;
    gap: calcHeight(12px);
    @media screen and ($media-lg-query) {
      width: 100%;
    }
  }
  &__role-image {
    @apply flex justify-center items-end;
    height: calcWidth(200);
    width: calcWidth(230);
    @media screen and ($media-lg-query) {
      height: calculateVw768(140);
      width: 100%;
    }
    background-color: $black-transparent;
    border-radius: $border-radius-l;
    backdrop-filter: blur(14.846222877502441px);
    border: 1.5px solid $white;
    transition: 0.6s;
    img {
      height: 235px;
      @media screen and ($media-lg-query) {
        height: calculateVw768(235);
      }
    }
    &_active {
      box-shadow: 0 0 35px 0 $white-transparent;
      height: calcWidth(260);
      @media screen and ($media-lg-query) {
        height: calculateVw768(260);
        width: 100%;
      }
    }
  }
}
</style>
