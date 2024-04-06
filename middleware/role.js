// eslint-disable-next-line no-undef
export default defineNuxtRouteMiddleware(async (to) => {
  if (!process.client || process.server) return;
  // eslint-disable-next-line no-undef
  const userData = useUserData();
  const inaccessiblePerformer = ['/order/create'];
  const inaccessibleClient = [];
  // eslint-disable-next-line no-undef
  const isInaccessible = computed(() => {
    switch (userData.value.role) {
      case 'performer':
        return inaccessiblePerformer.find((route) => to.path.startsWith(route));
      case 'client':
        return inaccessibleClient.find((route) => to.path.startsWith(route));
    }
  });
  // eslint-disable-next-line no-undef
  if (isInaccessible.value) return navigateTo('/dashboard');
});
