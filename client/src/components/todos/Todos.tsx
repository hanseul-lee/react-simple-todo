import { useState } from 'react';

import TodoDetail from './TodoDetail';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import * as S from './Todos.style';

function Todos() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <S.Root>
      <S.Container>
        <AddTodo />
        <TodoList setIsEditing={setIsEditing} />
        <TodoDetail isEditing={isEditing} setIsEditing={setIsEditing} />
      </S.Container>
    </S.Root>
  );
}

export default Todos;
