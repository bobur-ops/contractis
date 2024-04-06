import yup from '~/utils/Validation/customValidation.js';
import { imagesFiles } from '~/components/Form/model/index.js';

export const CaseSchemaDescription = yup.object({
  title: yup
    .string()
    .required('Требуется ввести заголовок')
    .max(100, 'Не более 100 символов'),
  description: yup.string().max(2500, 'Не более 2 500 символов'),
  link: yup.string().max(100, 'Не более 100 символов').urlMask()
});
export const CaseSchemaFiles = yup.object({
  files: yup.array().maxFileSize().filesExtensions(),
  coverImage: yup.array().maxFileSize(5, 1).filesExtensions(imagesFiles),
  titleImage: yup.array().maxFileSize(5, 1).filesExtensions(imagesFiles)
});
