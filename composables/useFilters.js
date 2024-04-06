import { Filters } from '~/utils/api';
// eslint-disable-next-line no-undef
export const useFilters = () => {
  const deleteUndefined = (object) => {
    Object.keys(object).forEach((key) => {
      if (object[key] === undefined || object[key] === null) delete object[key];
    });
    return object;
  };
  const deleteElement = (element, array) => {
    if (array.indexOf(element) >= 0) array.splice(array.indexOf(element), 1);
    return array;
  };

  const getFilters = async () => {
    // eslint-disable-next-line no-undef
    const filters = useFiltersData();
    if (filters.value.categories.length && filters.value.technologies.length)
      return null;
    const { data: technologies } = await Filters.getTechnologies();
    if (technologies.value) {
      filters.value.technologies = [...technologies.value.data];
    }
    const { data: categories } = await Filters.getCategories();
    if (categories.value) {
      filters.value.categories = [...categories.value.data];
    }
  };
  const getCategories = async () => {
    // eslint-disable-next-line no-undef
    const filters = useFiltersData();
    const { data: categories } = await Filters.getCategories();
    if (categories.value) {
      filters.value.categories = [...categories.value.data];
    }
  };
  const getTechnologies = async () => {
    // eslint-disable-next-line no-undef
    const filters = useFiltersData();
    const { data: technologies } = await Filters.getTechnologies();
    if (technologies.value) {
      filters.value.technologies = [...technologies.value.data];
    }
  };

  return {
    deleteUndefined,
    deleteElement,
    getFilters,
    getCategories,
    getTechnologies
  };
};
