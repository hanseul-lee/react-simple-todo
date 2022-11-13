import { redirect } from 'react-router-dom';

import { login } from '@/apis';
import { AuthForm } from '@/components';
import { ROUTES } from '@/consts';
import { AUTH_TYPE } from '@/types';

export const loader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return redirect(ROUTES.main);
  }
};

const Login = () => {
  return <AuthForm type={AUTH_TYPE.login} onSubmitAPI={login} />;
};

export default Login;
