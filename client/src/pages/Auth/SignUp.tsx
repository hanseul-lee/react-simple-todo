import { signUp } from '@/apis';
import { AuthForm } from '@/components';
import { AUTH_TYPE } from '@/types';

const SignUp = () => {
  return <AuthForm type={AUTH_TYPE.signUp} onSubmitAPI={signUp} />;
};

export default SignUp;
