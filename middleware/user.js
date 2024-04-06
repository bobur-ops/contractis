// eslint-disable-next-line no-undef
export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server || !process.client) return;
  // eslint-disable-next-line no-undef
  const { token } = useStore();
  if (typeof token.value === 'object') return;
  const inaccessiblePages = ['/auth'];
  // eslint-disable-next-line no-undef
  const isInaccessible = computed(() =>
    inaccessiblePages.find((route) => to.path.startsWith(route))
  );
  // eslint-disable-next-line no-undef
  if (isInaccessible.value) return navigateTo('/dashboard');
  // eslint-disable-next-line no-undef
  const { getAuthUser } = useUser();
  await getAuthUser();
});
