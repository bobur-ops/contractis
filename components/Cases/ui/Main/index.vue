<template>
  <section class="case-main">
    <h2 class="case-main__title">
      Разработка Корпоративного сайта с интеграцией Айфона 1-с
    </h2>
    <article class="case-main-description">
      <h3 class="case-main-description__title">Описание работ</h3>
      <p class="case-main-description__content">
        Команда HPACE.dev существует с 2019 года официально, но основана была в
        2018 году еще со времен старта разработки в нашей команды.
        <br /><br />За это время наша команда сплотилась, коллектив сложился из
        15 боевых единиц специалистов (FullStack, Backend, Frontend, Дизайн, QA,
        Devops, Teamlead) и др.
      </p>
    </article>
    <article class="case-main-files">
      <h3 class="case-main-files__title">Приложенные файлы</h3>
      <shared-files :files="files" />
    </article>
    <img
      src="assets/images/case/case.png"
      alt="case"
      class="case-main__image"
    />
    <article class="case-main-other">
      <h3 class="case-main-other__title">Другие работы исполнителя</h3>
      <shared-examples
        class="case-main-other__examples"
        :examples="examples"
        label=""
      />
    </article>
  </section>
</template>

<script setup>
import { examples } from '~/components/Order/Card/model/index.js';

const files = [
  {
    id: 1,
    name: 'Задание.docx',
    file: File
  },
  {
    id: 2,
    name: 'Задание.pdf',
    file: File
  }
];
</script>

<style scoped lang="scss">
.case-main {
  &__title {
    font-size: 24px;
    font-weight: 600;
    line-height: 100%;
    margin-bottom: 30px;
  }
  &-files {
    @apply flex flex-col;
    margin-bottom: 30px;
    gap: 30px;
    &__title {
      font-weight: 500;
      font-size: 18px;
    }
  }
  &-description {
    @apply flex flex-col;
    margin-bottom: 33px;
    &__title {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 23px;
    }
  }
  &__image {
    border-radius: 25px;
    margin-bottom: 60px;
  }
  &-other {
    @apply flex flex-col;
    gap: $space-medium;
    padding: 30px;
    border-radius: $border-radius-m;
    background: $bg-black-block;
    border: 1px solid $border-block;
    margin-bottom: 100px;
    &__title {
      font-weight: 500;
      font-size: 20px;
    }
  }
}
</style>
