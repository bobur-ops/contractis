export const useWordCase = (min = null, max = null) => {
  const lastNumber = (minNum = Math.abs(min), maxNum = Math.abs(max)) => {
    if (minNum && !maxNum) return minNum % 10;
    return maxNum % 10;
  };
  const multipleNumbers = (minNum = Math.abs(min), maxNum = Math.abs(max)) => {
    if (minNum && !maxNum) return minNum % 100 >= 11 && minNum % 100 <= 14;
    return maxNum % 100 >= 11 && maxNum % 100 <= 14;
  };
  const getDeclination = (nominativeCase, genitiveCase, multipleCase) => {
    if (lastNumber() === 0 || lastNumber() >= 5 || multipleNumbers())
      return multipleCase;
    if (lastNumber() === 1) return nominativeCase;
    if (lastNumber() < 5) return genitiveCase;
  };
  const getNoun = (number, one, two, five) => {
    if (
      lastNumber(Math.abs(number)) === 0 ||
      lastNumber(Math.abs(number)) >= 5 ||
      multipleNumbers(Math.abs(number))
    )
      return five;
    if (lastNumber(Math.abs(number)) === 1) return one;
    if (lastNumber(Math.abs(number)) < 5) return two;
  };
  return { getDeclination, getNoun };
};
