import { createBrowserRouter } from 'react-router-dom';

import {
  ErrorPage,
  Login,
  LoginLoader,
  SignUp,
  TodoList,
  TodoListLoader,
} from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoList />,
    errorElement: <ErrorPage />,
    loader: TodoListLoader,
    children: [
      {
        path: 'todos/:todoId',
        element: <TodoList />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    loader: LoginLoader,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
]);
