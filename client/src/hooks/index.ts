import { useQuery } from '@tanstack/react-query';

import { getAllTodos, getTodoById } from '@/apis';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodos,
  });
};

export const useTodo = (todoId: string) => {
  return useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => getTodoById(todoId),
    enabled: !!todoId,
  });
};
