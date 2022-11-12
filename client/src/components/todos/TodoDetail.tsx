import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';

import * as S from './Todos.style';

import { TODO_VALIDATION_ERRORS } from '@/consts';
import { deleteTodo, updateTodo } from '@/apis';
import { useTodo } from '@/hooks';

function TodoDetail({ isEditing, setIsEditing }: TodoDetailProps) {
  const params = useParams();
  const { data } = useTodo(params.todoId || '');
  const navigate = useNavigate();

  const updateTodoMutation = useMutation(updateTodo, {
    mutationKey: ['updateTodo'],
  });
  const deleteTodoMutation = useMutation(deleteTodo, {
    mutationKey: ['deleteTodo'],
  });

  const [selectedTodo, setSelectedTodo] = useState({
    id: '',
    title: '',
    content: '',
  });

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTodo({
      ...selectedTodo,
      [e.target.name]: e.target.value,
    });
  };

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
      },
    });
  };

  const handleResetEditing = (): void => {
    setIsEditing(false);
  };

  const handleClickEditIcon = () => {
    setIsEditing(true);
  };

  const handleClickDeleteIcon = (): void => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    deleteTodoMutation.mutate(params.todoId || '', {
      onError: () => {
        alert(TODO_VALIDATION_ERRORS.ERROR_DURING_PROCESSING);
      },
      onSuccess: () => {
        setIsEditing(false);
        navigate(-1);
      },
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
      {!isEditing && (
        <S.IconWrap>
          <IconButton aria-label="editButton" onClick={handleClickEditIcon}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="deleteButton" onClick={handleClickDeleteIcon}>
            <DeleteIcon />
          </IconButton>
        </S.IconWrap>
      )}
    </S.TodoContainer>
  );
}

interface TodoDetailProps {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export default TodoDetail;
