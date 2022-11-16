import { redirect } from 'react-router-dom';

import { Header, Todos } from '@/components';

export const loader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/login');
  }
};

const Todo = () => {
  return (
    <>
      <Header />
      <Todos />
    </>
  );
};

export default Todo;
