import { CategoriesAdapter, TechnologiesAdapter } from '~/utils/api/index.js';
// eslint-disable-next-line no-undef
const { getData } = useApi();
export const Filters = {
  getTechnologies() {
    return getData('orders/technologies', TechnologiesAdapter);
  },
  getCategories() {
    return getData('orders/categories', CategoriesAdapter);
  }
};
