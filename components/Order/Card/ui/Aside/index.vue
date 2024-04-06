<template>
  <aside class="order-card-aside">
    <order-card-ui-aside-profile
      :avatar-path="data?.avatarPath"
      :contacts="data.contacts"
      :first-name="data.firstName"
      :last-name="data.lastName"
    />
    <order-card-ui-aside-price />
  </aside>
</template>

<script setup>
defineProps({
  data: { type: Object, required: true }
});
</script>

<style scoped lang="scss">
.order-card-aside {
  @apply h-fit flex flex-col;
  gap: $space-medium;
  width: 23%;
}
</style>
