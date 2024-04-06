export * from '../stores';
// eslint-disable-next-line no-undef
export const useFiltersData = () =>
  // eslint-disable-next-line no-undef
  useState('filters', () => {
    return { categories: [], technologies: [] };
  });
// eslint-disable-next-line no-undef
export const useRouletteTime = () => useState('roulette-time', () => 14020);
