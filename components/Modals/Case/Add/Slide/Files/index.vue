<template>
  <section class="modal-case-add-files">
    <article class="modal-case-add-files__insert">
      <h2
        class="modal-case-add-files__title"
        :class="{ 'modal-case-add-files__title_error': !!errors.coverImage }"
      >
        {{ label.coverImage }}
      </h2>
      <form-file-image
        :preview="modalData.coverImage"
        :file-size="5"
        file-name="coverImage"
        :is-validate-error="!!errors.coverImage"
        @get-file="setCoverImage"
      />
    </article>
    <article class="modal-case-add-files__insert">
      <h2
        class="modal-case-add-files__title"
        :class="{ 'modal-case-add-files__title_error': !!errors.titleImage }"
      >
        {{ label.titleImage }}
      </h2>
      <form-file-image
        :preview="modalData.titleImage"
        :file-size="5"
        file-name="titleImage"
        :is-validate-error="!!errors.titleImage"
        @get-file="setTitleImage"
      />
    </article>
    <article class="modal-case-add-files__more">
      <h2
        class="modal-case-add-files__title"
        :class="{ 'modal-case-add-files__title_error': !!errors.files }"
      >
        {{ label.files }}
      </h2>
      <form-file
        id="file"
        :init-files="modalData.files"
        :init-files-data="modalData.filesData"
        :is-validate-error="!!errors.files"
        class="modal-case-add-files__form"
        @update-files="setFiles"
      />
    </article>
    <shared-button-gradient-blue
      button-height="55px"
      font-size="20px"
      button-width="320px"
      @click="submitForm"
    >
      <shared-arrow-text-animate font-size="20px" font-weight="500">
        Продолжить
      </shared-arrow-text-animate>
    </shared-button-gradient-blue>
  </section>
</template>

<script setup>
import { useCreateCaseModal } from '~/stores';
import { CaseSchemaFiles } from '~/utils/Validation';

const modalData = useCreateCaseModal();
const { handleSubmit, errors, setFieldValue, setFieldError } = useForm({
  validationSchema: CaseSchemaFiles,
  initialValues: {
    files: modalData.value.files ?? [],
    titleImage: modalData.value.titleImage ?? [],
    coverImage: modalData.value.coverImage ?? []
  }
});
const label = reactive({
  files: computed(() =>
    errors.value.files ? errors.value.files : 'Дополнительные материалы'
  ),
  titleImage: computed(() =>
    errors.value.titleImage ? errors.value.titleImage : 'Заглавная картинка'
  ),
  coverImage: computed(() =>
    errors.value.coverImage ? errors.value.coverImage : 'Обложка проекта'
  )
});

const setTitleImage = (file, fileData) => {
  setFieldValue('titleImage', file);
  modalData.value.titleImage = file;
  modalData.value.titleImageData = fileData;
};
const setCoverImage = (file, fileData) => {
  setFieldValue('coverImage', file);
  modalData.value.coverImage = file;
  modalData.value.coverImageData = fileData;
};
const setFiles = (files, fileData) => {
  setFieldValue('files', files);
  modalData.value.files = files;
  modalData.value.filesData = fileData;
};
const submitForm = handleSubmit(() => {
  if (!modalData.value.coverImage?.length) {
    setFieldError('coverImage', 'Обложка проекта обязательна');
    return;
  }
  modalData.value.selectedSlide++;
});
</script>

<style scoped lang="scss">
.modal-case-add-files {
  @apply w-full flex flex-wrap;
  column-gap: 60px;
  row-gap: 25px;
  &__title {
    @apply truncate;
    width: 285px;
    line-height: 100%;
    font-size: 18px;
    font-weight: 500;
    &_error {
      color: $light-red;
    }
  }
  &__insert {
    @apply flex flex-col;
    gap: 20px;
  }
  &__more {
    @apply w-full flex flex-col;
    gap: 5px;
    margin-bottom: 40px;
  }
  &__form {
    height: 224px;
  }
}
</style>
