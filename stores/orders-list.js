export const useOrdersList = () => {
  // eslint-disable-next-line no-undef
  const data = useState('orders-list', () => ({
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
    mini: {
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
    published: {
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
    active: {
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
    done: {
      data: [],
      total: 0,
      query: {
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
    refresh('published');
    refresh('active');
    refresh('done');
  };
  return { data, refresh, logoutRefresh };
};
