<template>
  <section class="home">
    <Swiper
      :modules="[SwiperMousewheel, SwiperPagination, SwiperNavigation]"
      direction="vertical"
      :mousewheel="true"
      :speed="speedTime"
      :pagination="{
        type: 'custom',
        clickable: false,
        renderCustom: paginationRender
      }"
      :navigation="{
        nextEl: '.arrowDown'
      }"
    >
      <swiper-slide>
        <home-slide-start :advantages="advantages" />
        <IconArrowDown class="arrowDown" />
      </swiper-slide>
      <swiper-slide>
        <home-slide-roles />
      </swiper-slide>
      <swiper-slide>
        <h2>third page</h2>
      </swiper-slide>
      <swiper-slide>
        <h2>fourth page</h2>
      </swiper-slide>
    </Swiper>
    <!-- <home-pagination
      :speed-time="speedTime / 1000 + 's'"
      :current-page="currentPage"
      :pages="4"
    /> -->
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ['user']
});
import IconArrowDown from 'assets/icons/Vector.svg';
import { authCurrentUserAdapter, AuthUser } from '~/utils/api';
const router = useRouter();
const speedTime = 800;
const currentPage = ref(1);
const paginationRender = (swiper, current) => {
  currentPage.value = current;
};
const advantages = ref([
  {
    id: 1,
    count: 500,
    name: 'Заказчиков'
  },
  {
    id: 2,
    count: 2354,
    name: 'Заказов'
  },
  {
    id: 3,
    count: 1454,
    name: 'Исполнителей'
  }
]);
const { query } = useRoute();
const { clearToken, setToken } = useStore();

if (query.invite && process.client) {
  console.log(query.invite);
  const { data } = await AuthUser.companyInvite(query.invite);
  console.log(data);
}

const userData = useUserData();
onMounted(async () => {
  console.log(query);
  if (query.data) {
    clearToken();
    userData.value = authCurrentUserAdapter(JSON.parse(query.data));
    setToken(userData.value.userToken);
    router.push('/dashboard');
  }
});
</script>

<style scoped lang="scss">
.home {
  .swiper {
    height: $full-height;
  }
  h2 {
    color: $white;
  }
}
.arrowDown {
  @apply absolute left-1/2 -translate-x-1/2 transform;
  width: 42px;
  height: 21px;
  bottom: 30px;
  color: $gray;
  cursor: pointer;
}
</style>
<style lang="scss">
.home .swiper-pagination {
  @apply hidden;
}
</style>
