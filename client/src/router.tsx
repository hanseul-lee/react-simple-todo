import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage, Login, SignUp, TodoList } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoList />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'todo/:todoId',
        element: <TodoList />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
]);
