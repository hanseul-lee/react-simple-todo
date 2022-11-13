import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './consts';

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
    path: ROUTES.main,
    element: <TodoList />,
    errorElement: <ErrorPage />,
    loader: TodoListLoader,
    children: [
      {
        path: ROUTES.todo,
        element: <TodoList />,
      },
    ],
  },
  {
    path: ROUTES.login,
    element: <Login />,
    loader: LoginLoader,
  },
  {
    path: ROUTES.signUp,
    element: <SignUp />,
  },
]);
