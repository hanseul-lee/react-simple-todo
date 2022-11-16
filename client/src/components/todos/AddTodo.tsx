import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import * as S from './Todos.style';

import { TODO_VALIDATION_ERRORS } from '@/consts';
import { createTodo } from '@/apis';

function TodoDetail() {
  const [inputValues, setInputValues] = useState({ title: '', content: '' });
  const { title, content } = inputValues;

  const addTodoMutation = useMutation(createTodo, {
    mutationKey: ['addTodo'],
  });

  const handleAddTodo = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    addTodoMutation.mutate(
      { title, content },
      {
        onError: () => {
          alert(TODO_VALIDATION_ERRORS.ERROR_DURING_PROCESSING);
        },
        onSuccess: () => {
          setInputValues({ title: '', content: '' });
          alert('추가 완료!');
        },
      },
    );
  };

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <S.TodoContainer>
      <S.TodoTitle>
        <S.Icon>✏️</S.Icon>
        <S.Title>Add Todo</S.Title>
      </S.TodoTitle>
      <S.Form onSubmit={handleAddTodo}>
        <TextField
          label="Title"
          name="title"
          variant="standard"
          value={inputValues.title}
          onChange={handleChangeInputValue}
        />
        <TextField
          label="Content"
          name="content"
          multiline
          rows={6}
          value={inputValues.content}
          onChange={handleChangeInputValue}
        />
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={!title.trim() || !content.trim()}
        >
          추가
        </Button>
      </S.Form>
    </S.TodoContainer>
  );
}

export default TodoDetail;
