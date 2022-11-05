import { useState } from 'react';

import * as S from './Todos.style';
import TodoDetail from './TodoDetail';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

function Todos() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedTodoId, setSelectedTodoId] = useState<string>('');

  return (
    <S.Root>
      <S.Container>
        <AddTodo />
        <TodoList
          setSelectedTodoId={setSelectedTodoId}
          setIsEditing={setIsEditing}
        />
        <TodoDetail
          selectedTodoId={selectedTodoId}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </S.Container>
    </S.Root>
  );
}

export default Todos;
