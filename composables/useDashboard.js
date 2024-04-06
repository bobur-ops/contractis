export const useDashboard = () => {
  // eslint-disable-next-line no-undef
  const currentSlide = useState('current-slide', () => 1);
  return { currentSlide };
};
