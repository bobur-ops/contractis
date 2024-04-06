<template>
  <div id="certificates" class="profile-certificates">
    <div class="profile-certificates__top">
      <h2 class="profile-certificates__title">Сертификаты</h2>
      <shared-button-ghost
        height="42px"
        padding="0 25px"
        font-size="18px"
        font-weight="500"
        @click.prevent="addCertificate"
      >
        Добавить сертификат
      </shared-button-ghost>
    </div>
    <ul
      v-if="userData.user.profile.certificates?.length"
      class="profile-certificates__list"
    >
      <li
        v-for="(certificate, id) in userData.user.profile.certificates.slice(
          0,
          10
        )"
        :key="id"
        class="profile-certificates__certificate"
      >
        <div
          class="profile-certificates__image-block"
          :class="{ 'profile-certificates__image-block_last': id === 9 }"
          @click="openGallery(id)"
        >
          <img
            v-if="certificate"
            src="assets/images/profile/certificate.png"
            alt="certificate"
            class="profile-certificates__image"
            :class="{ 'profile-certificates__image_last': id === 9 }"
          />
        </div>
        <shared-arrow-text
          v-if="id !== 9"
          font-size="12px"
          font-weight="500"
          color="red"
          class="profile-certificates__delete"
        >
          Удалить
        </shared-arrow-text>
        <div v-else class="profile-certificates__more" @click="openGallery(id)">
          <p class="profile-certificates__more-text">Показать еще</p>
        </div>
      </li>
    </ul>
    <div v-else class="profile-certificates__no-certificates">
      <p class="profile-certificates__no-certificates-text">
        У вас пока нет сертификатов
      </p>
    </div>
  </div>
</template>

<script setup>
import { Fancybox } from '@fancyapps/ui';

const userData = useUserData();

const myImages = [
  'https://preview.redd.it/streetwear-lamy-v0-fxx0bon7zroc1.jpeg?width=1080&crop=smart&auto=webp&s=81ae2e93ccb1eee98fec5afb14dd8c2b66c85a55',
  'https://preview.redd.it/kiryuu-kikyou-blue-archive-v0-a0c3x9t598oc1.jpeg?auto=webp&s=3c5c49d3d9a3d96f160c9e2deed871dd2ad37054',
  'https://preview.redd.it/mi8vf88jbcpc1.png?width=1080&crop=smart&auto=webp&s=a580ef507dd3fd4db609b9e64a62d09191997cd3'
];
const galleryOptions = (id) => {
  return {
    Thumbs: {
      type: 'modern'
    },
    startIndex: id
  };
};
const galleryImages = [];
if (userData.value.user.profile.certificates?.length)
  userData.value.user.profile.certificates.forEach(() => {
    const random = Math.floor(Math.random() * 3);
    galleryImages.push({
      src:
        '<img class="fancybox__image" src="' +
        myImages[random] +
        '" alt="AAAAAnime"/>',
      type: 'html',
      thumb: myImages[random]
    });
  });

const openGallery = (id = 0) => {
  new Fancybox(galleryImages, galleryOptions(id));
};

const emit = defineEmits(['addCertificate']);
const addCertificate = () => emit('addCertificate');
</script>

<style scoped lang="scss">
.profile-certificates {
  background: $bg-black-block;
  padding: $space-large;
  border-radius: $border-radius-m;
  min-height: 325px;
  max-width: 1000px;
  &__top {
    @apply flex justify-between items-center;
    margin-bottom: $space-medium-plus;
  }
  &__title {
    font-weight: 600;
    font-size: 24px;
  }
  &__no-certificates {
    @apply flex justify-center items-center;
    height: 210px;
  }
  &__no-certificates-text {
    font-size: 20px;
    font-weight: 400;
    color: $gray-60;
  }
  &__list {
    @apply grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: $space-xx-large-plus;
  }
  &__certificate {
    @apply relative overflow-hidden;
    border-radius: $border-radius-s;
    &:hover {
      .profile-certificates__delete {
        @apply right-0;
        z-index: $z-index-2;
      }
      .profile-certificates__image-block:before {
        background: radial-gradient(
            circle at center top,
            $radial-glow-start 0,
            $radial-glow-end 140px
          ),
          transparent;
        z-index: $z-index-1;
      }
      .profile-certificates__image {
        opacity: 0.5;
      }
    }
  }
  &__image {
    transition: 0.1s;
    &_last {
      opacity: 1 !important;
    }
  }
  &__image-block {
    @apply cursor-pointer;
    &:before {
      @apply absolute top-0 left-1/2 block;
      transform: translateX(-50%);
      content: '';
      width: 140px;
      height: 140px;
      max-width: 100%;
      z-index: $z-index-0;
    }
    &_last {
      filter: blur(10px);
      &:before {
        content: none !important;
      }
    }
  }
  &__delete {
    @apply absolute cursor-pointer;
    transition: 0.1s;
    right: -100px;
    top: 24px;
    height: 27px;
    border-radius: $border-radius-s 0 0 $border-radius-s;
    background: $bg-black-block;
    padding: 0 12px;
  }
  &__more {
    @apply w-full h-full absolute top-0 flex justify-center items-center cursor-pointer;
    background: $bg-black-block-75;
  }
  &__more-text {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
