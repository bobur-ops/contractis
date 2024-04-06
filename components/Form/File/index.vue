<template>
  <div class="form-shadow-file">
    <h3
      :id="id"
      class="form-shadow-file__label"
      :class="{
        'form-shadow-file__label_error': isValidateError
      }"
    >
      {{ label }}
    </h3>
    <div
      class="form-shadow-file__inner"
      :class="{ 'form-shadow-file__inner_drop': dropHover }"
      @dragover.prevent="onDropHover"
      @dragleave.prevent="onDropBlur"
      @drop.prevent="onDrop"
    >
      <div class="form-shadow-file__description">
        <div class="form-shadow-file__title-block">
          <h4 class="form-shadow-file__title">
            Загрузите или ператащите файлы
          </h4>
          <p
            class="form-shadow-file__subtitle"
            :class="{
              'form-shadow-file__subtitle_error': isValidateError
            }"
          >
            Не более {{ countFiles }} файлов, общей суммой до {{ size }}мб
          </p>
        </div>
        <p
          class="form-shadow-file__formats"
          :class="{
            'form-shadow-file__formats_error': isValidateError
          }"
        >
          Разрешены к загрузке файлы в форматах: {{ fileTypes.join(', ') }}
        </p>
      </div>
      <div class="form-shadow-file__files">
        <input ref="inputFile" type="file" hidden multiple @change="addFile" />
        <shared-button-shadow
          width="230px"
          height="40px"
          font-size="16px"
          font-weight="500"
          :disabled="files.length >= 5"
          @click.prevent="clickInput"
        >
          <template #text>Добавить файл</template>
        </shared-button-shadow>
        <ul class="form-shadow-file__file-list">
          <li
            v-for="(file, index) in files"
            :key="index"
            class="form-shadow-file__file-block"
            @mouseover="onHover(index)"
            @mouseleave="onBlur(index)"
            @click="deleteFile(index)"
          >
            <div
              class="form-shadow-file__file"
              :class="{
                'form-shadow-file__file_hover': hoverItems[index]
              }"
            >
              <component
                :is="fileExtensions[index]"
                class="form-shadow-file__file-icon"
              />
              <p class="form-shadow-file__file-name">
                {{ file.name }}
              </p>
            </div>
            <span
              v-if="hoverItems[index]"
              class="form-shadow-file__delete-button"
            >
              Удалить
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { allFiles } from '~/components/Form/model/index.js';

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, default: '' },
  isValidateError: { type: Boolean, default: false },
  initFiles: { type: Array, default: () => {} },
  initFilesData: { type: FormData, default: new FormData() },
  size: { type: Number, default: 50 },
  countFiles: { type: Number, default: 5 },
  fileTypes: { type: Array, default: allFiles },
  fileName: { type: String, default: 'files' }
});
const inputFile = ref();
const files = ref(props.initFiles);
const formData = ref(props.initFilesData);
const emit = defineEmits(['updateFiles']);
const clickInput = () => {
  if (files.value.length < 5) inputFile.value.click();
};
const addFile = (event) => {
  if (!event.target.files.length) return;
  Object.values(event.target.files).forEach((file) => {
    if (
      files.value.every((e) => e.name !== file.name) &&
      files.value.length < 5
    ) {
      formData.value.append(`${props.fileName}[${files.value.length}]`, file);
      files.value.push(file);
    }
  });
  emit('updateFiles', files.value, formData.value);
  event.target.value = null;
};
const deleteFile = (id) => {
  files.value.splice(id, 1);
  formData.value.delete(`${props.fileName}[${id}]`);
  onBlur(id);
  emit('updateFiles', files.value, formData.value);
};

const hoverItems = ref([]);
const onHover = (id) => (hoverItems.value[id] = true);
const onBlur = (id) => (hoverItems.value[id] = false);

const dropHover = ref(false);
const onDropHover = (e) => {
  if (files.value.length >= 5) e.dataTransfer.dropEffect = 'none';
  dropHover.value = true;
};
const onDropBlur = () => (dropHover.value = false);
const onDrop = (e) => {
  Object.values(e.dataTransfer.files).forEach((el) => {
    if (files.value.every((f) => f.name !== el.name) && files.value.length < 5)
      files.value.push(el);
  });
  emit('updateFiles', files.value);
  onDropBlur();
};

const fileExtensions = computed(() => {
  const extensions = [];
  for (const file of files.value) {
    extensions.push(
      `SvgoFiles${file.name.split('.').pop().charAt(0).toUpperCase() + file.name.split('.').pop().slice(1)}`
    );
  }
  return extensions;
});
</script>

<style scoped lang="scss">
@import 'style';
</style>
