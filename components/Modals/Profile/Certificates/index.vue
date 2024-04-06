<template>
  <modals size="small" @modal-close="modalClose">
    <section class="media">
      <h1 class="media__title">Редактирование “Сертификаты”</h1>
      <form-file
        id="file"
        :file-types="['Jpg', 'Jpeg', 'Png', 'Mp4', 'Pdf']"
        :count-files="20"
        :size="100"
        label="Медиа"
        :init-files="[]"
        class="modal-case-add-files__form"
      />
    </section>
  </modals>
</template>

<script setup>
const emits = defineEmits(['modal-close']);
const modalClose = () => {
  emits('modal-close');
};
</script>

<style scoped lang="scss">
.media {
  @apply flex flex-col h-fit;
  width: 936px;
  &__top {
    @apply flex;
  }
  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 25px;
  }
  &__content {
    @apply flex;
    gap: 5%;
  }
}
</style>
