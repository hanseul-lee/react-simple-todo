import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import * as S from './Todos.style';

import { useTodos } from '@/hooks';
import type { Todo, TodoListType } from '@/types';

function TodoList({ setIsEditing }: TodoListProps) {
  const { data, isSuccess } = useTodos();

  const [todoList, setTodoList] = useState<TodoListType>([]);

  useEffect(() => {
    if (!data) return;
    setTodoList(data.data);
  }, [data]);

  return (
    <S.TodoContainer>
      <S.TodoTitle>
        <S.Icon>😎</S.Icon>
        <S.Title className="todo-list">Todo List</S.Title>
      </S.TodoTitle>
      <S.TodoList>
        {isSuccess &&
          todoList.map((todo: Todo) => (
            <NavLink
              to={`todo/${todo.id}`}
              key={todo.id}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <S.TodoItem onClick={() => setIsEditing(false)}>
                <S.Name>{todo.title}</S.Name>
              </S.TodoItem>
            </NavLink>
          ))}
      </S.TodoList>
    </S.TodoContainer>
  );
}

interface TodoListProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export default TodoList;
