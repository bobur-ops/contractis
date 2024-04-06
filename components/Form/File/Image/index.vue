<template>
  <section class="form-file-image">
    <article class="form-file-image-select" @click="input.click()">
      <svgo-close v-if="!previewLink" class="form-file-image__svg" />
      <img
        v-else
        :src="previewLink"
        alt="previewLink"
        class="form-file-image-select__image"
      />
    </article>
    <p
      class="form-file-image-select__description"
      :class="{ 'form-file-image-select__description_error': isValidateError }"
    >
      Разрешен к загрузке файл в формате: {{ fileTypes.join(', ') }} до
      {{ fileSize }} мб
    </p>
    <input
      ref="input"
      type="file"
      accept="image/*"
      hidden
      @change="inputImage($event.target.files)"
    />
  </section>
</template>

<script setup>
import { imagesFiles } from '~/components/Form/model/index.js';

const props = defineProps({
  initFiles: { type: Array, default: () => [] },
  fileSize: { type: Number, default: 0 },
  fileTypes: { type: Array, default: imagesFiles },
  isValidateError: { type: Boolean, default: false },
  fileName: { type: String, default: 'file' }
});
const input = ref();
const previewLink = ref('');
const emits = defineEmits(['get-file']);
const inputImage = (files) => {
  if (!files.length) {
    emits('get-file', [], new FormData());
    previewLink.value = null;
    return;
  }
  const reader = new FileReader();
  const formData = new FormData();
  reader.readAsDataURL(files[0]);
  reader.onload = () => {
    if (
      props.fileTypes
        .map((type) => type.toLowerCase())
        .indexOf(files[0].name.split('.').pop()) >= 0
    )
      previewLink.value = reader.result;
    else previewLink.value = null;
    formData.append(props.fileName, files[0]);
  };
  emits('get-file', [files[0]], formData);
};
onMounted(() => {
  if (props.initFiles.length) {
    inputImage(props.initFiles);
  }
});
</script>

<style scoped lang="scss">
.form-file-image {
  @apply h-fit w-fit flex flex-col;
  width: 285px;
  gap: 12px;
  &-select {
    @apply flex justify-center items-center cursor-pointer;
    width: 285px;
    height: 160px;
    border-radius: 15px;
    border: 1px solid $border-block;
    &__image {
      max-height: 100%;
    }
    &__description {
      font-size: 12px;
      font-weight: 500;
      color: $gray-30;
      line-height: 142%;
      &_error {
        color: $light-red !important;
      }
    }
  }
  &__svg {
    transform: rotate(45deg);
    height: 30px;
  }
}
</style>
