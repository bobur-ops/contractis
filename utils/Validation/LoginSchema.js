import yup from '~/utils/Validation/customValidation.js';

export const LoginSchema = yup.object({
  email: yup.string().required('Требуется ввести почту').email('Введите почту'),
  password: yup.string().required('Требуется ввести пароль')
});
