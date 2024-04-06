export const useApi = () => {
  // eslint-disable-next-line no-undef
  const API = import.meta.env.VITE_API_URL;
  const getData = async (
    path,
    adapter = undefined,
    headers = {},
    query = {}
  ) => {
    // eslint-disable-next-line no-undef
    const { data, error, pending, refresh, status } = await useLazyFetch(
      () => `${API}` + `${path}`,
      {
        headers: Object.assign({ Accept: 'Application/json' }, headers),
        query: query,
        transform: adapter
          ? (beforeData) => adapter(beforeData)
          : (beforeData) => beforeData
      }
    );
    return { data, error, pending, refresh, status };
  };
  const getPaginationData = async (
    path,
    adapter = () => {},
    headers = {},
    query = {},
    storageData,
    pageInfo
  ) => {
    // eslint-disable-next-line no-undef
    const lastPage = ref(null);
    // eslint-disable-next-line no-undef
    const { data, error, pending, refresh, status } = await useFetch(
      () => `${API}` + `${path}`,
      {
        watch: false,
        headers: Object.assign({ Accept: 'Application/json' }, headers),
        query: query,
        transform: adapter
          ? (data) => {
              pageInfo.lastPage = adapter(data).lastPage;
              pageInfo.currentPage = adapter(data).currentPage;
              lastPage.value = adapter(data).lastPage;
              storageData.push(...adapter(data).data);
              return adapter(data);
            }
          : data
      }
    );
    return { data, error, pending, refresh, status, lastPage };
  };
  const postData = async (
    path,
    body = {},
    adapter = undefined,
    headers = {},
    query = {}
  ) => {
    const response = ref(null);
    // eslint-disable-next-line no-undef
    const { data, error, pending, refresh, status } = await useLazyFetch(
      () => `${API}` + `${path}`,
      {
        method: 'POST',
        headers: Object.assign({ Accept: 'Application/json' }, headers),
        query: query,
        body: body,
        transform: adapter
          ? (beforeData) => adapter(beforeData)
          : (beforeData) => beforeData,
        onResponse({ response: res }) {
          response.value = res;
        }
      }
    );
    return { data, error, pending, refresh, status, response };
  };
  const postFiles = async (
    path,
    body = {},
    adapter = undefined,
    headers = {},
    query = {}
  ) => {
    // eslint-disable-next-line no-undef
    const { data, error, pending, refresh, status } = await useLazyFetch(
      () => `${API}` + `${path}`,
      {
        method: 'POST',
        headers: Object.assign({ Accept: 'Application/json' }, headers),
        query: query,
        body: body,
        transform: adapter ? (data) => adapter(data) : data
      }
    );
    return { data, error, pending, refresh, status };
  };

  const patchData = async (
    path,
    body = {},
    adapter = undefined,
    headers = {},
    query = {}
  ) => {
    // eslint-disable-next-line no-undef
    const { data, error, pending, refresh, status } = await useLazyFetch(
      () => `${API}` + `${path}`,
      {
        method: 'PATCH',
        headers: Object.assign({ Accept: 'Application/json' }, headers),
        query: query,
        body: body,
        transform: adapter ? (data) => adapter(data) : data
      }
    );
    return { data, error, pending, refresh, status };
  };

  return { API, getData, getPaginationData, postData, postFiles, patchData };
};
