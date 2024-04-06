export const useStore = () => {
  // eslint-disable-next-line no-undef
  const { $locally } = useNuxtApp();
  // eslint-disable-next-line no-undef
  const token = ref($locally.getItem('user-token'));
  // eslint-disable-next-line no-undef
  const { logoutRefresh: ordersRefresh } = useOrdersList();
  // eslint-disable-next-line no-undef
  const { logoutRefresh: performersRefresh } = usePerformersList();

  const statesRefresh = () => {
    ordersRefresh();
    performersRefresh();
  };
  const clearToken = () => {
    statesRefresh();
    token.value = null;
    $locally.removeItem('user-token');
  };
  const setToken = (value) => {
    token.value = value;
    $locally.setItem('user-token', value);
  };
  return { token, clearToken, setToken, statesRefresh };
};
