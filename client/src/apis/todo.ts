import axios from 'axios';

import { BASE_URL } from '@/consts';
import type { Todo } from '@/types';

const todoAPI = axios.create({
  baseURL: `${BASE_URL}/todos`,
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});

export const getAllTodos = async () => {
  try {
    const { data } = await todoAPI.get('');
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTodoById = async (id: string) => {
  try {
    const { data } = await todoAPI.get(id);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const createTodo = async (
  todoContent: Pick<Todo, 'title' | 'content'>,
) => {
  try {
    const { data } = await todoAPI.post('', todoContent);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateTodo = async ({
  id,
  title,
  content,
}: Pick<Todo, 'id' | 'title' | 'content'>) => {
  try {
    const { data } = await todoAPI.put(id, { title, content });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const { data } = await todoAPI.delete(id);
    return data;
  } catch (err) {
    console.error(err);
  }
};
