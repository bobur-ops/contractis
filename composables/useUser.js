import { AuthUser } from '~/utils/api/index.js';
export const useUser = () => {
  // eslint-disable-next-line no-undef
  const router = useRouter();
  // eslint-disable-next-line no-undef
  const { token: userToken, clearToken, statesRefresh } = useStore();

  // eslint-disable-next-line no-undef
  const getAuthUser = async () => {
    // eslint-disable-next-line no-undef
    const userData = useUserData();
    if (userData.value && userToken.value) return null;
    // eslint-disable-next-line no-undef
    const { data: user, error } = await AuthUser.getUserData();
    if (user.value) {
      userData.value = user.value;
      console.log(userData.value);
    } else if (error.value) {
      if (error.value.statusCode === 401) {
        userData.value = null;
        statesRefresh();
        clearToken();
        console.log('где мои данные любовски');
        await router.push('/auth/login');
      } else {
        console.log(error.value);
      }
    }
  };
  return { getAuthUser };
};
