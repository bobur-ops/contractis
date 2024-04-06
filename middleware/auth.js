// eslint-disable-next-line no-undef
const { getAuthUser } = useUser();

// eslint-disable-next-line no-undef
export default defineNuxtRouteMiddleware(async () => {
  if (!process.client || process.server) return;
  // eslint-disable-next-line no-undef
  const { token } = useStore();
  if (typeof token.value === 'object') {
    // eslint-disable-next-line no-undef
    const router = useRouter();
    await router.push('/auth/login');
  }
  // eslint-disable-next-line no-undef
  await getAuthUser();
});

// Todo: Прописать пользователя в плагины (не вышло_)
