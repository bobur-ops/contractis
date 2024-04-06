import yup from '~/utils/Validation/customValidation.js';

export const RegistrationSchema = yup.object({
  email: yup.string().required('Требуется ввести почту').email('Введите почту'),
  password: yup
    .string()
    .required('Требуется ввести пароль')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .max(20, 'Пароль должен быть не более 20 символов')
    .registerAndNumbers(),
  password_confirmation: yup
    .string()
    .required('Повторите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
});
