import * as yup from 'yup';
import { telephoneRegex, urlRegex } from '~/utils/masks/index.js';
import { allFiles } from '~/components/Form/model/index.js';

yup.addMethod(yup.string, 'registerAndNumbers', function () {
  return this.test(
    'registerAndNumbers',
    'Пароль должен содержать заглавные и прописные букву и цифры.',
    function (value) {
      const lower = value.toUpperCase() !== value;
      const upper = value.toLowerCase() !== value;
      const numbers = /\d/.test(value);
      return lower && upper && numbers;
    }
  );
});
yup.addMethod(yup.string, 'fullName', function () {
  return this.test('fullName', 'Введите Ваше Имя и Фимилию', function (value) {
    if (value === undefined) return true;
    const RegEx = /[a-zA-Zа-яёА-ЯЁ]+\s[a-zA-Zа-яёА-ЯЁ]+$/g;
    const mask = RegEx.exec(value.replace(/\s+$/, ''));
    return mask && mask[0] === value.replace(/\s+$/, '');
  });
});
yup.addMethod(yup.string, 'onlyEng', function () {
  return this.test('onlyEng', 'Только латиница', function (value) {
    const RegEx = /^[A-Za-z0-9]+$/g;
    const mask = RegEx.exec(value);
    return !!(mask && mask[0] === value);
  });
});
yup.addMethod(yup.array, 'maxFileSize', function (size = 25, fileCount = 5) {
  return this.test(
    'maxFileSize',
    'Не более 5 файлов, общей суммой до 50мб',
    function (value) {
      if (value.length) {
        if (value.length > fileCount) return false;
        let sum = 0;
        Object.values(value).forEach((e) => (sum += e.size));
        return sum < size * 1024 * 1024;
      } else return true;
    }
  );
});
yup.addMethod(yup.string, 'splitLength', function (maxSize, split) {
  return this.test(
    'splitLength',
    'Слишком много ключевых слов',
    function (value) {
      return value.replace(/,\s*$/, '').split(split).length <= maxSize;
    }
  );
});
yup.addMethod(yup.array, 'filesExtensions', function (extensions = allFiles) {
  return this.test(
    'filesExtensions',
    'Разрешены к загрузке файлы в форматах: Pdf, Word, Xlsx, Jpg, Jpeg, Png, Mp3, Zip, Rar, Fig, Gif',
    function (value) {
      if (value.length) {
        return value.every(
          (e) =>
            extensions
              .map((e) => e.toLowerCase())
              .indexOf(e.name.split('.').pop()) >= 0
        );
      } else return true;
    }
  );
});
yup.addMethod(yup.string, 'telephoneMask', function () {
  return this.test('telephoneMask', 'Введите телефон', function (value) {
    return telephoneRegex.test(value);
  });
});
yup.addMethod(yup.string, 'urlMask', function () {
  return this.test('urlMask', 'Введите ссылку', function (value) {
    return value.match(urlRegex)?.[0] === value || !value;
  });
});
export default yup;
