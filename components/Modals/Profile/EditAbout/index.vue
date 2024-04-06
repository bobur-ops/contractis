<template>
  <modals size="small" @modal-close="modalClose">
    <section class="edit-about">
      <h1 class="edit-about__title">Редактирование “{{ content.title }}”</h1>
      <div class="edit-about__top">
        <modals-profile-edit-about-filters
          v-if="userData?.role === 'performer'"
          @update-categories="updateCategories"
        />
      </div>
      <form-textarea
        id="description"
        v-model="newValues.description"
        :placeholder="content.placeholder"
        class="edit-about__textarea"
        maxlength="255"
        :label="content.label"
        theme="shadow"
      />
      <shared-button-gradient-blue
        button-height="42px"
        font-size="18px"
        button-width="172px"
        @click.prevent="saveData"
      >
        <shared-arrow-text font-size="18px" font-weight="500">
          Сохранить
        </shared-arrow-text>
      </shared-button-gradient-blue>
    </section>
  </modals>
</template>

<script setup>
const emits = defineEmits(['modal-close']);

const userData = useUserData();
const content = computed(() => {
  switch (userData.value?.role) {
    case 'performer': {
      return {
        title: 'О исполнителе',
        label: 'Описание работы',
        placeholder: 'Введите текст описания вашей работы'
      };
    }
    case 'client': {
      return {
        title: 'О заказчике',
        label: 'Описание заказа',
        placeholder: 'Введите текст описания вашей задачи'
      };
    }
  }
});
const newValues = ref({
  mainCategory: userData.value.user.profile.mainCategory,
  additionalCategories: userData.value.user.profile.additionalCategories,
  description: userData.value.user.profile.description ?? ''
});
const updateCategories = (categories) => {
  newValues.value.mainCategory = categories.main;
  newValues.value.additionalCategories = categories.more;
};
const saveData = () => {
  userData.value.user.profile = Object.assign(userData.value.user.profile, {
    description: newValues.value.description,
    mainCategory: newValues.value.mainCategory,
    additionalCategories: newValues.value.additionalCategories
  });
  modalClose();
};
const modalClose = () => {
  emits('modal-close');
};
</script>

<style scoped lang="scss">
.edit-about {
  @apply flex flex-col h-fit;
  width: 936px;
  &__top {
    @apply flex;
  }
  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 45px;
  }
  &__textarea {
    margin-bottom: 35px;
  }
}
</style>
