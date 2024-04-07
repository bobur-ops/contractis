<template>
  <article class="profile">
    <client-only>
      <teleport to="main">
        <transition name="slide-fade">
          <profile-ui-init
            v-if="!userData?.user?.firstName || !userData?.user?.type || true"
          />
        </transition>
      </teleport>
    </client-only>
    <!-- <client-only>
      <teleport to=".dashboard">
        <div class="container">
          <span class="profile__path">
            Главная / Биржа заказов /
            {{ userData?.user.firstName }}
            {{ userData?.user.lastName }}
          </span>
        </div>
      </teleport>
    </client-only>
    <profile-ui-view class="profile__view" />
    <profile-ui-aside class="profile__aside" @to-edit="showModal('info')" />
    <div
      v-if="userData.user.type === 'Team' && userData.role === 'performer'"
      class="profile__main"
    >
      <profile-ui-about
        user-type="Team"
        user-role="performer"
        @to-edit="showModal('about')"
      />
      <profile-ui-reputation user-role="performer" />
      <profile-ui-case @add-case="showModal('case')" />
      <profile-ui-team @add-employee="showModal('team')" />
      <profile-ui-technologies @add-technology="showModal('technologies')" />
      <profile-ui-gallery @add-media="showModal('media')" />
      <profile-ui-certificates @add-certificate="showModal('certificate')" />
    </div>
    <div
      v-else-if="userData.user.type === 'Solo' && userData.role === 'performer'"
      class="profile__main"
    >
      <profile-ui-about
        user-type="Solo"
        user-role="performer"
        @to-edit="showModal('about')"
      />
      <profile-ui-reputation user-role="performer" />
      <profile-ui-case @add-case="showModal('case')" />
      <profile-ui-technologies @add-technology="showModal('technologies')" />
      <profile-ui-gallery @add-media="showModal('media')" />
      <profile-ui-certificates @add-certificate="showModal('certificate')" />
    </div>
    <div
      v-else-if="userData.role === 'client' && userData.user.type"
      class="profile__main"
    >
      <profile-ui-about user-role="client" @to-edit="showModal('about')" />
      <profile-ui-reputation user-role="client" />
      <profile-ui-orders />
    </div> -->
  </article>
  <!-- <Teleport to="#root">
    <transition name="modal-transition">
      <modals-profile-edit-about
        v-if="openModal === 'about'"
        @modal-close="modalClose"
      />
      <modals-case-add
        v-else-if="openModal === 'case'"
        @modal-close="modalClose"
      />
      <modals-profile-edit-info
        v-else-if="openModal === 'info'"
        @modal-close="modalClose"
      />
      <modals-profile-invite
        v-else-if="openModal === 'team'"
        @modal-close="modalClose"
      />
      <modals-profile-technologies
        v-else-if="openModal === 'technologies'"
        @modal-close="modalClose"
      />
      <modals-profile-media
        v-else-if="openModal === 'media'"
        @modal-close="modalClose"
      />
      <modals-profile-certificates
        v-else-if="openModal === 'certificate'"
        @modal-close="modalClose"
      />
    </transition>
  </Teleport> -->
</template>

<script setup>
const userData = useUserData();

const openModal = ref('');
const showModal = (name) => (openModal.value = name);
const modalClose = () => (openModal.value = '');
</script>

<style scoped lang="scss">
.profile {
  @apply grid;
  grid-template-areas:
    'view view'
    'aside main';
  grid-template-columns: 370px 1fr;
  column-gap: 50px;
  row-gap: 40px;
  &__path {
    @apply inline-block self-start;
    color: $gray-70;
    line-height: 14px;
    font-size: 14px;
    margin-bottom: 35px;
  }
  &__aside {
    grid-area: aside;
  }
  &__view {
    grid-area: view;
  }
  &__main {
    @apply flex flex-col;
    gap: 50px;
    grid-area: main;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
  @apply fixed;
}

.slide-fade-enter-from {
  transform: translateX(-50px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translatex(50px);
  opacity: 0;
}
</style>
