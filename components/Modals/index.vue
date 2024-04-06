<template>
  <div class="modal-overlay" @click="clickOutside">
    <section ref="modal" class="modal" :style="parameters.modal">
      <button class="modal-close" :style="parameters.btn" @click="closeModal">
        <svgo-close class="modal-close__svg" />
      </button>
      <slot />
    </section>
  </div>
</template>

<script setup>
const modal = ref();
const emits = defineEmits(['modal-open', 'modal-close']);
const props = defineProps({
  size: { type: String, default: 'big' },
  customPadding: { type: String, default: null }
});

const parameters = computed(() => {
  switch (props.size) {
    case 'big':
      return {
        modal: {
          padding: props.customPadding ?? '60px',
          'min-height': '60vh'
        },
        btn: {
          top: '40px',
          right: '60px'
        }
      };
    case 'small':
      return {
        modal: {
          padding: '30px 35px 30px 35px',
          'min-height': 'fit-content'
        },
        btn: {
          top: '22px',
          right: '35px'
        }
      };
  }
});

const { isOutside } = useMouseInElement(modal);

const closeModal = () => {
  emits('modal-close');
};

const clickOutside = () => {
  if (isOutside.value) {
    emits('modal-close');
  }
};

useHead({
  bodyAttrs: {
    class: 'overflow-hidden'
  }
});
</script>

<style scoped lang="scss">
@import 'style';
.modal {
  @apply flex relative justify-center w-fit h-fit overflow-auto;
  max-height: 95vh;
  border-radius: 30px;
  border: 1px solid $border-block;
  background: $bg-black-block;
  font-family: $base-font;
  transition: height 0.3s;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: $border-block;
    border-radius: 3px;
    margin: 20px 0;
  }
  &::-webkit-scrollbar-thumb {
    background: $white;
    border-radius: 3px;
  }
  &-close {
    @apply flex justify-center items-center absolute;
    border: 1px solid $white;
    border-radius: $border-radius-s;
    width: 40px;
    height: 40px;
    &__svg {
      height: 14px;
    }
  }
}
.modal-transition-enter-active,
.modal-transition-leave-active {
  transition: all 0.3s ease;
}

.modal-transition-enter-from,
.modal-transition-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
