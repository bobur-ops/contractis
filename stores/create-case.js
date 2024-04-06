// eslint-disable-next-line no-undef
export const useCreateCaseModal = () =>
  // eslint-disable-next-line no-undef
  useState('create-case-modal', () => ({
    selectedSlide: 0,
    title: '',
    description: '',
    link: '',
    coverImage: null,
    titleImage: null,
    coverImageData: new FormData(),
    titleImageData: new FormData(),
    files: [],
    filesData: new FormData(),
    filtersData: {
      category: undefined,
      specialization: undefined,
      tech: []
    },
    budget: {
      lower: null,
      upper: null
    },
    time: {
      format: 'h',
      lower: null,
      upper: null
    }
  }));
