import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';
import { useMutation } from '@tanstack/react-query';

import * as S from './Todos.style';

import { deleteTodo } from '@/apis';
import { useTodos } from '@/hooks';
import type { Todo, TodoListType } from '@/types';
import { TODO_VALIDATION_ERRORS } from '@/consts';

function TodoList({ setSelectedTodoId, setIsEditing }: TodoListProps) {
  const { data, isSuccess } = useTodos();

  const [todoList, setTodoList] = useState<TodoListType>([]);

  const deleteTodoMutation = useMutation(deleteTodo, {
    mutationKey: ['deleteTodo'],
  });

  const handleClickTodo = (e: any, id?: string): void => {
    setIsEditing(false);
    setSelectedTodoId(id || e.currentTarget.id);
  };

  const handleClickEditIcon = (e: any) => {
    e.stopPropagation();

    const { id } = e.currentTarget.closest('li');
    handleClickTodo(null, id);
    setIsEditing(true);
  };

  const handleClickDeleteIcon = (e: any): void => {
    e.stopPropagation();

    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const { id } = e.currentTarget.closest('li');
    deleteTodoMutation.mutate(id, {
      onError: () => {
        alert(TODO_VALIDATION_ERRORS.ERROR_DURING_PROCESSING);
      },
      onSuccess: () => {
        setIsEditing(false);
        setSelectedTodoId('');
        alert('삭제 완료!');
      },
    });
  };

  useEffect(() => {
    if (!data) return;
    setTodoList(data.data);
  }, [data]);

  return (
    <S.TodoContainer>
      <S.TodoTitle>
        <S.Icon>😎</S.Icon>
        <S.Title className="todoList">Todo List</S.Title>
      </S.TodoTitle>
      <S.TodoList>
        {isSuccess &&
          todoList.map((todo: Todo) => (
            <S.TodoItem key={todo.id} id={todo.id} onClick={handleClickTodo}>
              <S.Name>{todo.title}</S.Name>
              <S.IconWrap>
                <IconButton
                  aria-label="editButton"
                  onClick={handleClickEditIcon}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="deleteButton"
                  onClick={handleClickDeleteIcon}
                >
                  <DeleteIcon />
                </IconButton>
              </S.IconWrap>
            </S.TodoItem>
          ))}
      </S.TodoList>
    </S.TodoContainer>
  );
}

interface TodoListProps {
  setSelectedTodoId: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export default TodoList;
