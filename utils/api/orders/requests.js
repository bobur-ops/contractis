// eslint-disable-next-line no-undef
import {
  OrderAdapter,
  OrderAdapterProfile,
  OrderListPaginationAdapter
} from './adapters.js';

// eslint-disable-next-line no-undef
const { getData, postData, postFiles, getPaginationData } = useApi();
export const Orders = {
  headers: () => {
    return {
      // eslint-disable-next-line no-undef
      Authorization: `Bearer ${useStore() ? useStore().token.value : null}`
    };
  },
  getAllOrders() {
    return getData('orders', OrderListPaginationAdapter, this.headers());
  },
  async getPaginationData(path = 'orders', store, storeName) {
    const { pending, data } = await getPaginationData(
      path,
      OrderListPaginationAdapter,
      this.headers(),
      store.value[storeName].query,
      store.value[storeName].data,
      store.value[storeName].pageInfo
    );
    return { pending, data };
  },
  getOneOrder(id) {
    return getData(`orders/${id}`, OrderAdapter, this.headers());
  },
  async createOrder(body, formData = null) {
    const { data, error } = await postData(
      'orders',
      body,
      OrderAdapterProfile,
      this.headers()
    );

    if (data.value && formData) {
      const { data: orderWithFiles } = await postFiles(
        `orders/${data.value.id}/files`,
        formData,
        OrderAdapterProfile,
        this.headers()
      );
      return { data, orderWithFiles, error };
    }
    return { data, error };
  }
};
