import { useState } from 'react';

import TodoDetail from './TodoDetail';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import * as S from './Todos.style';

import { useTodos } from '@/hooks';
import { TodoContext } from '@/store';

function Todos() {
  const todos = useTodos();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <TodoContext.Provider value={todos}>
      <S.Root>
        <S.Container>
          <AddTodo />
          <TodoList setIsEditing={setIsEditing} />
          <TodoDetail isEditing={isEditing} setIsEditing={setIsEditing} />
        </S.Container>
      </S.Root>
    </TodoContext.Provider>
  );
}

export default Todos;
