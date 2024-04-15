<template>
  <form-base class="registration-form" @submit-form="submit">
    <template #labels>
      <form-field
        id="email"
        v-model="email"
        placeholder="Введите e-mail"
        :label="label.email"
        type="email"
        :status-error="errorStatus"
        :is-validate-error="!!errors.email"
      />
      <form-password
        id="password"
        v-model="password"
        placeholder="Введите пароль"
        :label="label.password"
        :status-error="errorStatus"
        :is-validate-error="!!errors.password"
      />
      <form-password
        id="confirmPassword"
        v-model="password_confirmation"
        placeholder="Повторите пароль"
        :label="label.password_confirmation"
        :status-error="errorStatus"
        :is-validate-error="!!errors.password_confirmation"
      />
    </template>
    <template #buttons>
      <shared-button-gradient-blue
        button-height="50px"
        font-size="20px"
        type="submit"
        :disabled="isDisabled"
      >
        Зарегистрироваться
      </shared-button-gradient-blue>
      <another-auth text="или" />
    </template>
  </form-base>
</template>

<script setup>
import { RegistrationSchema } from '~/utils/Validation';
import { AuthUser } from '~/utils/api';
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: RegistrationSchema,
  initialValues: {
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    middle_name: ''
  }
});
const currentUserData = useUserData();
const isDisabled = ref(false);

const route = useRoute();
const router = useRouter();

const referralCode = computed(() => route.query.referral_code ?? null);
const inviteCode = computed(() => route.query.invite ?? null);

const errorStatus = ref(null);

const [email] = defineField('email');
const [password] = defineField('password');
const [password_confirmation] = defineField('password_confirmation');

const label = reactive({
  email: computed(() => errors.value.email ?? 'E-mail'),
  password: computed(() => errors.value.password ?? 'Пароль'),
  password_confirmation: computed(
    () => errors.value.password_confirmation ?? 'Повторите пароль'
  )
});
const { setToken } = useStore();

const createUser = async (data) => {
  const bodyRequest = reactive({
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
    referral_code: referralCode.value,
    invite: inviteCode.value
  });
  const { data: userData, error } = await AuthUser.registration(bodyRequest);
  if (userData.value) {
    setToken(userData.value.userToken);
    currentUserData.value = userData.value;
    console.log(currentUserData.value);
    await router.push(`/auth/verification/?userId=${userData.value.user.id}`);
    isDisabled.value = false;
  } else {
    userData.value = error.value.statusCode;
    isDisabled.value = false;
  }
};
const submit = handleSubmit((values) => {
  isDisabled.value = true;
  createUser(values);
});
</script>
