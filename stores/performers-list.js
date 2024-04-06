export const usePerformersList = () => {
  const data = useState('performers-list', () => ({
    main: {
      data: [],
      total: 0,
      query: {
        page: 0
      },
      pageInfo: {
        lastPage: null,
        currentPage: null
      }
    },
    responses: {
      data: [],
      total: 0,
      query: {
        order_id: null,
        page: 0
      },
      pageInfo: {
        lastPage: null,
        currentPage: null
      }
    }
  }));
  const refresh = (storeName) => {
    data.value[storeName].data = [];
    data.value[storeName].total = 0;
    data.value[storeName].query.page = 0;
    data.value[storeName].pageInfo = {
      lastPage: null,
      currentPage: null
    };
  };
  const logoutRefresh = () => {
    refresh('responses');
  };
  return { data, refresh, logoutRefresh };
};
