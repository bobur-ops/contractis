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
        font-family="title"
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
        font-family="title"
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
  bottom: calcHeight(60px);
  right: 0;
  color: rgba($color: #fff, $alpha: 0.9);
  z-index: $z-index-2;
  gap: calcHeight(45px);
  &__role-block {
    @apply flex flex-col justify-end cursor-pointer;
    gap: calcHeight(20px);
  }
  &__role-image {
    @apply flex justify-center items-end;
    width: pxToRem(170);
    background-color: $black-transparent;
    border-radius: $border-radius-l;
    backdrop-filter: blur(14.846222877502441px);
    border: 1.5px solid $white;
    height: pxToRem(120);
    transition: 0.6s;
    img {
      height: pxToRem(170);
    }
    &_active {
      box-shadow: 0 0 35px 0 $white-transparent;
      height: pxToRem(180);
    }
  }
}
</style>
