export const TechnologiesAdapter = (technologies) => {
  return {
    data: technologies.data?.map((technology) => TechnologyAdapter(technology))
  };
};
export const TechnologyAdapter = (technology) => {
  return {
    id: technology.id,
    name: technology.name,
    list: technology.sub_technologies?.map((subTechnology) =>
      SubTechnologyAdapter(subTechnology)
    )
  };
};
export const SubTechnologyAdapter = (subTech) => {
  return {
    id: subTech.id,
    name: subTech.name
  };
};
export const CategoriesAdapter = (categories) => {
  return {
    data: categories.data?.map((category) => CategoryAdapter(category))
  };
};
export const CategoryAdapter = (category) => {
  return {
    id: category.id,
    name: category.name,
    list: category.specializations?.map((specialization) =>
      SpecializationAdapter(specialization)
    )
  };
};
export const SpecializationAdapter = (specialization) => {
  return {
    id: specialization.id,
    name: specialization.name
  };
};
