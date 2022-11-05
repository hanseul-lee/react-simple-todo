import { login } from '@/apis';
import { AuthForm } from '@/components';
import { AUTH_TYPE } from '@/types';

const Login = () => {
  return <AuthForm type={AUTH_TYPE.login} onSubmitAPI={login} />;
};

export default Login;
