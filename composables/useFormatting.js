export const useFormatting = () => {
  // eslint-disable-next-line no-undef
  const isTrimmed = ref(false);
  const trimText = (text, maxLength = 0, end = '...') => {
    if (text.length === undefined || maxLength === 0) return text;
    if (text.length > maxLength) {
      isTrimmed.value = true;
      return text.slice(0, maxLength) + end;
    } else {
      isTrimmed.value = false;
      return text;
    }
  };
  const timeFormat = (seconds) => {
    const sec = seconds % 60;
    let min = Math.floor((seconds / 60) % 60);
    let hour = Math.floor((seconds / 60 / 60) % 24);
    let days = Math.floor(seconds / 60 / 60 / 24);
    return { sec, min, hour, days };
  };

  return { trimText, isTrimmed, timeFormat };
};
