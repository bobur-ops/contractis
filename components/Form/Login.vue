<template>
  <form-base class="login-form form" @submit="submit">
    <template #labels>
      <form-field
        id="email"
        v-model="email"
        :label="label.email"
        placeholder="мама"
        type="text"
        :status-error="errorStatus"
        :is-validate-error="!!errors.email"
      />
      <form-password
        id="password"
        v-model="password"
        :label="label.password"
        placeholder="папа"
        :status-error="errorStatus"
        :message-error="errorMessage"
        :is-validate-error="!!errors.password"
      />
      <div class="login-form-references">
        <form-checkbox id="remember" v-model="remember" gap="10px">
          Запомнить меня
        </form-checkbox>
        <nuxt-link
          to="/auth/recovery"
          class="login-form__redirect-link login-form__redirect-link_mod"
        >
          Забыл пароль?
        </nuxt-link>
      </div>
    </template>
    <template #buttons>
      <shared-button-gradient-blue
        button-height="50px"
        font-size="20px"
        :disabled="isDisabled"
      >
        Войти
      </shared-button-gradient-blue>
      <another-auth text="или" />
    </template>
  </form-base>
</template>

<script setup>
import { LoginSchema } from '~/utils/Validation';
import { AuthUser } from '~/utils/api';
const router = useRouter();
const isDisabled = ref(false);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: LoginSchema,
  initialValues: {
    email: '',
    password: '',
    remember: false
  }
});

const errorStatus = ref(null);
const errorMessage = ref(null);

const label = reactive({
  email: computed(() => (errors.value.email ? errors.value.email : 'E-mail')),
  password: computed(() =>
    errors.value.password ? errors.value.password : 'Пароль'
  )
});

const [email] = defineField('email');
const [password] = defineField('password');
const [remember] = defineField('remember');

const currentUserData = useUserData();
const { clearToken, setToken } = useStore();

const getToken = async (data) => {
  clearToken();
  const bodyRequest = reactive({
    email: data.email,
    password: data.password
  });
  const {
    data: userData,
    error,
    response
  } = await AuthUser.getToken(bodyRequest);
  if (userData.value) {
    setToken(userData.value.userToken);
    currentUserData.value = userData.value;
    console.log(currentUserData.value);
    await router.push('/dashboard');
  } else {
    isDisabled.value = false;
    errorStatus.value = error.value.statusCode;
    errorMessage.value = response.value._data.error.message;
  }
};
const submit = handleSubmit((values) => {
  isDisabled.value = true;
  errorStatus.value = null;
  getToken(values);
});

watch(password, () => (errorStatus.value = null));
watch(email, () => (errorStatus.value = null));
</script>

<style scoped lang="scss">
@import './style';
.login-form {
  &-references {
    margin: 15px 0 0 0;
    @apply flex justify-between w-full;
    color: $gray;
    font-weight: 500;
  }
  &__redirect {
    @apply flex;
    color: $white;
    gap: 30px;
    font-size: 16px;

    &-question {
      color: $gray;
      line-height: 15px;
      font-weight: 400;
    }

    &-link {
      line-height: 15px;
      text-decoration: underline;
      font-weight: 400;

      &_mod {
        font-weight: 500;
        line-height: 24px;
        font-size: 16px;
      }
    }
  }
}
</style>
