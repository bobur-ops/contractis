import { authCurrentUserAdapter } from '~/utils/api';
// eslint-disable-next-line no-undef
const { getData, postData } = useApi();

export const AuthUser = {
  headers: () => {
    return {
      // eslint-disable-next-line no-undef
      Authorization: `Bearer ${useStore() ? useStore().token.value : null}`
    };
  },
  getUserData() {
    return getData('users/user', authCurrentUserAdapter, this.headers());
  },
  getToken(body) {
    return postData(
      'users/token',
      body,
      authCurrentUserAdapter,
      this.headers()
    );
  },
  registration(body) {
    return postData('users/registration', body, authCurrentUserAdapter);
  },
  companyInvite(inviteCode) {
    return getData('users/profile/invite', null, null, { invite: inviteCode });
  },
  setRole(role) {
    return postData(
      'users/role',
      {
        _method: 'Put',
        role: role
      },
      authCurrentUserAdapter,
      this.headers()
    );
  }
};
