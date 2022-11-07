import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, Todos } from '@/components';

const Todo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Todos />
    </>
  );
};

export default Todo;
