export type User = {
  email: string;
  password: string;
};

export const AUTH_TYPE = {
  login: 'login',
  signUp: 'signUp',
} as const;

export const ALERT_TYPE = {
  error: 'error',
  success: 'success',
} as const;

export type AUTH_RESPONSE_TYPE = {
  message: string;
  token: string | null;
};

export type Todo = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type TodoListType = Todo[];
