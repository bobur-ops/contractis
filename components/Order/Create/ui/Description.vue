<template>
  <form class="order-create-description" @submit="nextPage">
    <form-field
      id="title"
      v-model="title"
      type="text"
      placeholder="Заголовок"
      :label="label.title"
      :is-validate-error="!!errors.title"
      class="order-create-description__title"
      :limit="`${title.length}/100`"
      size="big"
    />
    <form-textarea
      id="response-text"
      v-model="description"
      placeholder="Введите текст описания вашей задачи"
      maxlength="255"
      :label="label.description"
      class="order-create-description__description"
      :limit="`${description.length}/5000`"
      :is-validate-error="!!errors.description"
      theme="shadow"
    />
    <div class="order-create-description__input-wrapper">
      <div class="order-create-description__preference-block">
        <h3 class="order-create-description__preference-label">
          {{ label.preference }}
        </h3>
        <form-select
          v-model="preference"
          :sort="newOrderExecutor"
          placeholder="Не важно"
          :init-val="initSelect"
          theme="shadow"
        />
      </div>
      <form-field
        id="key-words"
        v-model="keywords"
        type="text"
        placeholder="Филе, курица, петух"
        :label="label.keywords"
        class="order-create-description__key-words"
        :limit="`${keywordsArray(keywords).length}/10`"
        :is-validate-error="!!errors.keywords"
        gap="20px"
        size="big"
      />
    </div>
    <form-file
      id="file"
      :label="label.files"
      :init-files="
        props.initData.initFiles ? Object.values(props.initData.initFiles) : []
      "
      :is-validate-error="!!errors.files"
      :file-types="allFiles"
      @update-files="updateFiles"
    />
    <shared-button-gradient-blue
      button-height="55px"
      font-size="20px"
      button-width="320px"
    >
      <shared-arrow-text-animate font-size="20px" font-weight="500">
        Продолжить
      </shared-arrow-text-animate>
    </shared-button-gradient-blue>
  </form>
</template>

<script setup>
import { OrderSchemaDescription } from '~/utils/Validation/index.js';
import { newOrderExecutor } from '~/components/Order/model';
import { allFiles } from '~/components/Form/model';

const props = defineProps({
  initData: { type: Object, required: true }
});
const initSelect = computed(() => {
  return props.initData.preference
    ? newOrderExecutor.find((e) => e.code === props.initData.preference)
    : newOrderExecutor[0];
});
const keywordsArray = (data) => {
  if (data === '') return [];
  return data.replace(/,\s*$/, '').split(', ');
};

const emit = defineEmits(['nextPage']);
const { handleSubmit, errors, defineField, setFieldValue } = useForm({
  validationSchema: OrderSchemaDescription,
  initialValues: {
    title: props.initData.title ? props.initData.title : '',
    description: props.initData.description ? props.initData.description : '',
    preference: initSelect.value,
    files: props.initData.files ? props.initData.initFiles : new FormData(),
    keywords: props.initData.keywords ? props.initData.keywords.join(', ') : ''
  }
});
const [title] = defineField('title');
const [description] = defineField('description');
const [preference] = defineField('preference');
const [keywords] = defineField('keywords');

const nextPage = handleSubmit((values) => {
  emit('nextPage', {
    title: values.title,
    description: values.description,
    preference: values.preference.code,
    files: filesData.value,
    initFiles: values.files,
    keywords: keywordsArray(values.keywords)
  });
});
const label = reactive({
  title: computed(() =>
    errors.value.title ? errors.value.title : 'Заголовок заказа'
  ),
  description: computed(() =>
    errors.value.description ? errors.value.description : 'Ваш отклик:'
  ),
  preference: computed(() =>
    errors.value.preference ? errors.value.preference : 'Предпочтения'
  ),
  files: 'Файлы',
  keywords: computed(() =>
    errors.value.keywords ? errors.value.keywords : 'Ключевые слова'
  )
});
const filesData = ref(new FormData());
const updateFiles = (val, data) => {
  setFieldValue('files', val);
  filesData.value = data;
};
</script>

<style scoped lang="scss">
.order-create-description {
  @apply flex flex-col;
  gap: 30px;
  &__input-wrapper {
    @apply grid;
    grid-template-columns: 1fr 2fr;
    gap: 35px;
  }
  &__preference-block {
    @apply flex flex-col;
    gap: 20px;
  }
  &__preference-label {
    line-height: 100%;
    font-size: 18px;
  }
}
</style>
