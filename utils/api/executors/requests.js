import { performersPaginationAdapter } from '~/utils/api';

const { getData, getPaginationData } = useApi();

export const Executors = {
  headers: () => {
    return {
      Authorization: `Bearer ${useStore() ? useStore().token.value : null}`
    };
  },
  getAll() {
    return getData('performers', performersPaginationAdapter);
  },
  async getPaginationData(path = 'performers', store, storeName) {
    const { pending, data } = await getPaginationData(
      path,
      performersPaginationAdapter,
      this.headers(),
      store.value[storeName].query,
      store.value[storeName].data,
      store.value[storeName].pageInfo
    );
    return { pending, data };
  }
};
