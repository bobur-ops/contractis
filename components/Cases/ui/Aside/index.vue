<template>
  <aside class="case-aside">
    <shared-arrow-text-animate
      font-size="18px"
      font-weight="500"
      arrow-gap="15px"
      :revers="true"
      class="case-aside__back"
      @click.prevent="router.back"
    >
      Вернуться назад
    </shared-arrow-text-animate>
    <cases-ui-aside-eval
      :price="evals.price"
      :period="evals.period"
      :format-period="evals.formatPeriod"
      :category="category"
      :specialization="specialization"
    />
    <article class="case-aside-technologies">
      <h3 class="case-aside-technologies__title">Технологии</h3>
      <shared-technologies
        :technologies="technologies"
        view="block"
        :per-line="3"
      />
    </article>
    <article class="case-aside-description">
      <p class="case-aside-description__title">
        Если вас заинтересовал этот исполнитель свяжитесь с ним и обсудите
        детали вашего будущего проекта
      </p>
      <shared-button-shadow
        width="210px"
        font-size="18px"
        height="42px"
        font-weight="500"
        arrow-gap="15px"
        border-radius="11px"
        @click="showModal"
      >
        <template #text>Перейти в чат</template>
      </shared-button-shadow>
    </article>
  </aside>
  <Teleport to="#root">
    <transition name="modal-transition">
      <modals-case-add v-if="isOpenModal" @modal-close="modalClose" />
    </transition>
  </Teleport>
</template>

<script setup>
const router = useRouter();
const isOpenModal = ref(false);
const showModal = () => {
  isOpenModal.value = true;
};
const modalClose = () => {
  isOpenModal.value = false;
};
const category = {
  id: 1,
  name: 'Разработка'
};
const specialization = {
  id: 1,
  name: 'Апчихба'
};
const evals = {
  price: 657000,
  period: 60,
  formatPeriod: 'd'
};
const technologies = [
  {
    id: 1,
    name: 'HTML'
  },
  {
    id: 2,
    name: 'JavaScript'
  },
  {
    id: 3,
    name: 'CSS'
  },
  {
    id: 4,
    name: 'HTML'
  },
  {
    id: 5,
    name: 'JavaScript'
  },
  {
    id: 6,
    name: 'CSS'
  }
];
</script>

<style scoped lang="scss">
.case-aside {
  @apply w-full h-fit flex flex-col;
  gap: 40px;
  & > article {
    border: 1px solid $border-block;
    border-radius: $border-radius-m;
    background: $bg-black-block;
  }
  &-technologies {
    @apply w-full flex flex-col;
    gap: 30px;
    padding: 30px 30px 45px;
    &__title {
      font-size: 18px;
      font-weight: 500;
      line-height: 13px;
    }
  }
  &-description {
    @apply w-full flex flex-col;
    gap: 32px;
    padding: 30px 40px 30px 30px;
    &__title {
      font-size: 18px;
      color: $gray;
    }
  }
}
</style>
