import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import * as S from './Todos.style';

import { updateTodo } from '@/apis';
import { TODO_VALIDATION_ERRORS } from '@/consts';
import { useTodo } from '@/hooks';

function TodoDetail({
  selectedTodoId,
  isEditing,
  setIsEditing,
}: TodoDetailProps) {
  const { data } = useTodo(selectedTodoId);
  const [selectedTodo, setSelectedTodo] = useState({
    id: '',
    title: '',
    content: '',
  });

  const updateTodoMutation = useMutation(updateTodo, {
    mutationKey: ['updateTodo'],
  });

  const handleEditTodo = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!selectedTodo.title.trim() || !selectedTodo.content.trim()) {
      return alert(TODO_VALIDATION_ERRORS.INVALID_INPUT);
    }
    updateTodoMutation.mutate(selectedTodo, {
      onError: () => {
        alert(TODO_VALIDATION_ERRORS.ERROR_DURING_PROCESSING);
      },
      onSuccess: () => {
        setIsEditing(false);
        alert('수정 완료!');
      },
    });
  };

  const handleResetEditing = (): void => {
    setIsEditing(false);
  };

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTodo({
      ...selectedTodo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!data) return;
    const { id, title, content } = data.data;
    setSelectedTodo({ id, title, content });
  }, [data]);

  return (
    <S.TodoContainer>
      <S.TodoTitle>
        <S.Icon>📝</S.Icon>
        <S.Title>Todo Detail</S.Title>
      </S.TodoTitle>
      <S.Form onSubmit={handleEditTodo}>
        <TextField
          label="Title"
          variant="standard"
          name="title"
          value={selectedTodo.title}
          onChange={handleChangeInputValue}
          disabled={!isEditing}
        />
        <TextField
          label="Content"
          name="content"
          multiline
          rows={6}
          value={selectedTodo.content}
          onChange={handleChangeInputValue}
          disabled={!isEditing}
        />
        {isEditing && (
          <>
            <Button type="submit" variant="contained" size="small">
              저장
            </Button>
            <Button
              type="reset"
              variant="outlined"
              size="small"
              onClick={handleResetEditing}
            >
              취소
            </Button>
          </>
        )}
      </S.Form>
    </S.TodoContainer>
  );
}

interface TodoDetailProps {
  selectedTodoId: string;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export default TodoDetail;
