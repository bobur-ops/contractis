<template>
  <article
    ref="dashboardItem"
    class="dashboard-welcome"
    :class="{
      'dashboard-welcome_lightning': !isOutside
    }"
  >
    <h3 class="dashboard-welcome__title">
      Добро пожаловать,
      <span
        v-if="userData?.user.firstName"
        class="dashboard-welcome__title_bold"
      >
        {{ userData.user.firstName }}!
      </span>
      <span v-else class="dashboard-welcome__title_bold">
        user_{{ userData.user?.id }}
      </span>
    </h3>
    <ul class="dashboard-welcome__list">
      <li
        v-for="(item, ind) in welcomeList"
        :key="ind"
        class="dashboard-welcome__link"
        @click="showModal(ind)"
      >
        —
        <shared-arrow-text-animate font-size="16px" font-weight="400">
          {{ item }}
        </shared-arrow-text-animate>
      </li>
    </ul>
  </article>
  <Teleport to="#root">
    <transition name="modal-transition">
      <modals-profile-edit-about
        v-if="isOpenModal === 0"
        @modal-close="modalClose"
      />
      <modals-profile-invite
        v-else-if="isOpenModal === 1"
        @modal-close="modalClose"
      />
      <modals-profile-technologies
        v-else-if="isOpenModal === 2"
        @modal-close="modalClose"
      />
      <modals-profile-media
        v-else-if="isOpenModal === 3"
        @modal-close="modalClose"
      />
      <modals-profile-certificates
        v-else-if="isOpenModal === 4"
        @modal-close="modalClose"
      />
      <modals-profile-edit-info
        v-else-if="isOpenModal === 5"
        @modal-close="modalClose"
      />
    </transition>
  </Teleport>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';

const isOpenModal = ref(null);
const showModal = (index) => {
  isOpenModal.value = index;
};
const modalClose = () => {
  isOpenModal.value = null;
};
defineProps({
  welcomeList: { type: Array, required: true }
});

const userData = useUserData();

const dashboardItem = ref();
const gradientX = ref();
const gradientY = ref();

const { elementX, elementY, isOutside } = useMouseInElement(dashboardItem);
watch([elementX, elementY], () => {
  if (!isOutside.value) {
    gradientX.value = elementX.value + 'px';
    gradientY.value = elementY.value + 'px';
  }
});
</script>

<style scoped lang="scss">
.dashboard-welcome {
  grid-area: welcome;
  padding: 25px;
  background: $bg-black-block;
  border: 1px solid $border-block;
  border-radius: $border-radius-m;
  &__title {
    font-size: 18px;
    line-height: 18px;
    margin-bottom: $space-medium;
    &_bold {
      font-weight: 600;
    }
  }
  &__list {
    @apply flex flex-col;
    gap: $space-x-small;
  }
  &__link {
    @apply flex;
    opacity: 0.5;
    gap: 4px;
    transition: all 0.2s;
    &:hover {
      opacity: 1;
    }
  }
  &_lightning {
    background: radial-gradient(
        circle at v-bind(gradientX) v-bind(gradientY),
        $radial-glow-start 0,
        $radial-glow-end 420px
      ),
      $bg-black-block;
  }
}
</style>
