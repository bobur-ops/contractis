import yup from '~/utils/Validation/customValidation.js';

export const OrderSchemaDescription = yup.object({
  title: yup
    .string()
    .required('Требуется ввести заголовок')
    .max(100, 'Не более 100 символов'),
  description: yup
    .string()
    .required('Требуется ввести описание')
    .max(5000, 'Не более 5 000 символов'),
  preference: yup.object().required(),
  files: yup.array().maxFileSize().filesExtensions(),
  keywords: yup.string().splitLength(10, ', ')
});
