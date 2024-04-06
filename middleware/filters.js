// eslint-disable-next-line no-undef
export default defineNuxtRouteMiddleware(async () => {
  if (!process.client || process.server) return;
  // eslint-disable-next-line no-undef
  const { getFilters } = useFilters();
  await getFilters();
});
