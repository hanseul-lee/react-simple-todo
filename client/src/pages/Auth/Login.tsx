import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { login } from '@/apis';
import { AuthForm } from '@/components';
import { AUTH_TYPE } from '@/types';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  return <AuthForm type={AUTH_TYPE.login} onSubmitAPI={login} />;
};

export default Login;
