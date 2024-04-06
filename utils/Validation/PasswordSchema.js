import yup from '~/utils/Validation/customValidation.js';

export const PasswordSchema = yup.object({
  password: yup
    .string()
    .required('Требуется ввести пароль')
    .min(6, 'от 6 до 20 символов')
    .max(20, 'от 6 до 20 символов')
    .registerAndNumbers(),
  password_confirmation: yup
    .string()
    .required('Повротире пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
});
