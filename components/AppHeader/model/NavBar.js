import { ref } from 'vue';
const NavItems = ref([
  {
    id: 1,
    name: 'Биржа заказов',
    link: '/order'
  },
  {
    id: 2,
    name: 'О сервисе',
    link: '#'
  },
  {
    id: 3,
    name: 'Исполнители',
    link: '/executors'
  },
  {
    id: 4,
    name: 'Новости',
    link: '#'
  },
  {
    id: 5,
    name: 'Подписка',
    link: '/subscription'
  }
]);

export { NavItems };
