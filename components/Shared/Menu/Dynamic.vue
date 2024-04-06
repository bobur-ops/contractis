<template>
  <div class="menu-dynamic">
    <menu ref="menu" class="menu-dynamic__list">
      <li
        v-for="(item, ind) in menuList"
        :ref="setItemRef"
        :key="ind"
        class="menu-dynamic__item"
        :class="{
          'menu-dynamic__item_selected': selectedItemMenu === ind
        }"
        @click="selectItem(ind)"
      >
        {{ item }}
      </li>
    </menu>
    <div class="menu-dynamic__line">
      <div class="menu-dynamic__underline" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  menuList: { type: Array, required: true }
});

const emits = defineEmits(['selectItem']);

const listMenuRefs = ref([]);
const menu = ref();
const setItemRef = (el) => {
  if (el) {
    listMenuRefs.value.push(el);
  }
};

const selectedItemMenu = ref(0);

const currentWidthItem = ref(0);
const currentPositionItem = ref(0);
const currentParentPosition = ref(0);
const selectItem = (index) => {
  selectedItemMenu.value = index;
  emits('selectItem', index);
  calcOffset();
  currentPositionItem.value = listMenuRefs.value[index].offsetLeft;
  currentWidthItem.value = listMenuRefs.value[index].clientWidth;
};
const calcOffset = () => {
  listMenuRefs.value[selectedItemMenu.value].offsetLeft
    ? (currentPositionItem.value =
        listMenuRefs.value[selectedItemMenu.value].offsetLeft)
    : 0;
  menu.value.offsetLeft
    ? (currentParentPosition.value = menu.value.offsetLeft)
    : 0;
};
const setInit = () => {
  currentParentPosition.value = menu.value.offsetLeft;
  currentPositionItem.value = listMenuRefs.value[0].offsetLeft;
  currentWidthItem.value = listMenuRefs.value[0].clientWidth;
  selectItem(0);
};
onMounted(() => {
  setInit();
  const { hook } = useNuxtApp();
  hook('app:suspense:resolve', () => setInit());
  window.addEventListener('resize', calcOffset);
});

onUnmounted(() => {
  window.removeEventListener('resize', calcOffset);
});
const menuItemFullWidth = computed(() => {
  return currentWidthItem.value + 'px';
});
const menuItemFullPosition = computed(() => {
  if (currentParentPosition.value) {
    return currentPositionItem.value - currentParentPosition.value + 'px';
  }
  return 0;
});
</script>

<style scoped lang="scss">
.menu-dynamic {
  @apply flex flex-col;
  row-gap: 15px;
  &__list {
    @apply flex;
    gap: $space-medium-plus;
  }
  &__item {
    @apply w-fit cursor-pointer;
    font-weight: 400;
    font-size: 16px;
    color: $gray-70;
    line-height: 11px;
    transition: color 0.2s;
    &_selected {
      font-weight: 500;
      color: $white;
    }
  }
  &__line {
    @apply w-full inline-block relative;
    background: $border-block;
    height: 1px;
  }
  &__underline {
    @apply inline-block absolute;
    transition: all 0.3s;
    width: v-bind(menuItemFullWidth);
    left: v-bind(menuItemFullPosition);
    background: $gradient-skyblue-blue;
    height: 2px;
  }
}
</style>
