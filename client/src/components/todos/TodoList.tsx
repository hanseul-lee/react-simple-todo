import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import * as S from './Todos.style';

import type { Todo } from '@/types';
import { TodoContext } from '@/store';

function TodoList({ setIsEditing }: TodoListProps) {
  const { data, isSuccess } = useContext(TodoContext);

  const handleClickTodo = () => {
    setIsEditing(false);
  };

  return (
    <S.TodoContainer>
      <S.TodoTitle>
        <S.Icon>😎</S.Icon>
        <S.Title className="todo-list">Todo List</S.Title>
      </S.TodoTitle>
      <S.TodoList>
        {isSuccess
          ? data.map((todo: Todo) => (
              <NavLink
                to={`todos/${todo.id}`}
                key={todo.id}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <S.TodoItem onClick={handleClickTodo}>
                  <S.Name>{todo.title}</S.Name>
                </S.TodoItem>
              </NavLink>
            ))
          : null}
      </S.TodoList>
    </S.TodoContainer>
  );
}

interface TodoListProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export default TodoList;
