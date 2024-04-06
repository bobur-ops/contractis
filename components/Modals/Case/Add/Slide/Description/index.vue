<template>
  <section class="modal-case-add-description">
    <form-field
      id="title"
      v-model="title"
      type="text"
      placeholder="Заголовок"
      :label="label.title"
      size="big"
      :is-validate-error="!!errors.title"
      :limit="`${title.length} / 100`"
    />
    <form-textarea
      id="description"
      v-model="description"
      placeholder="Введите текст описания вашей задачи"
      maxlength="255"
      :label="label.description"
      theme="shadow"
      resize="none"
      :is-validate-error="!!errors.description"
      :limit="`${description.length} / 2500`"
    />
    <form-field
      id="title"
      v-model="link"
      type="text"
      placeholder="https://meowmeow.ru"
      :label="label.link"
      size="big"
      class="modal-case-add-form__input-link"
      :is-validate-error="!!errors.link"
      :limit="`${link.length} / 100`"
      :mask="urlMask"
    />
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
import { CaseSchemaDescription } from '~/utils/Validation/index.js';
import { urlMask } from '~/utils/masks/index.js';

const modalData = useCreateCaseModal();

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: CaseSchemaDescription,
  initialValues: {
    title: modalData.value.title,
    description: modalData.value.description,
    link: modalData.value.link
  }
});

const [title] = defineField('title');
const [description] = defineField('description');
const [link] = defineField('link');
const label = reactive({
  title: computed(() =>
    errors.value.title ? errors.value.title : 'Название работы'
  ),
  description: computed(() =>
    errors.value.description ? errors.value.description : 'Описание работы'
  ),
  link: computed(() => (errors.value.link ? errors.value.link : 'Ссылка'))
});

const submitForm = handleSubmit(() => modalData.value.selectedSlide++);

watch([title, description, link], () => {
  modalData.value.title = title;
  modalData.value.description = description;
  modalData.value.link = link;
});
</script>

<style scoped lang="scss">
.modal-case-add-description {
  @apply w-full flex flex-col;
  gap: 30px;
}
</style>
