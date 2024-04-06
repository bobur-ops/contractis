export const useNotifications = () => {
  // eslint-disable-next-line no-undef
  const toast = useToast();
  const warning = (title) => {
    toast.add({
      title: title,
      icon: 'i-ci-warning',
      timeout: 7000,
      closeButton: null,
      ui: {
        actions: 'hidden',
        padding: 'notification__inner',
        wrapper: 'notification notification_warning',
        inner: 'notification__text-block',
        title: 'notification__description',
        description: 'mt-0',
        icon: {
          base: 'notification__icon'
        },
        progress: {
          base: 'notification__progress'
        }
      }
    });
  };
  return { warning };
};
