<template>
  <div class="search-field">
    <svgo-search class="search-field__icon" />
    <input
      v-model="search"
      type="text"
      class="search-field__input"
      placeholder="Поиск по ключевым словам"
      @keyup.enter="sendSearch"
    />
    <shared-button-gradient-blue
      font-size="18px"
      button-height="43px"
      button-width="150px"
      border="0 10px 10px 0"
      @click.prevent="sendSearch"
    >
      Найти
    </shared-button-gradient-blue>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const search = ref(route.query.search);
const sendSearch = () => {
  const queryParams = Object.assign({}, route.query);
  delete queryParams.search;
  const query = Object.assign(
    {
      search: search.value ? search.value : undefined
    },
    queryParams
  );
  router.push({ query: query });
};
</script>

<style scoped lang="scss">
.search-field {
  width: 765px;
  height: 45px;
  max-width: 100%;
  border-radius: $border-radius-m;
  background: $bg-inputs-light;
  padding-right: 1px;
  @apply flex items-center relative overflow-hidden;
  &__input {
    width: 100%;
    height: 45px;
    padding-left: 55px;
    padding-right: 5px;
    background: $bg-inputs-light;
    border-radius: $border-radius-m 0 0 $border-radius-m;
  }
  &__icon {
    height: 21px;
    @apply absolute left-5;
  }
}
</style>
