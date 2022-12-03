import styled from '@emotion/styled';

import { COLORS } from '@/styles';

export const Header = styled.header`
  margin: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const Root = styled.main`
  margin: 150px 40px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const TodoContainer = styled.div`
  width: 400px;
  text-align: center;
`;

export const Form = styled.form`
  display: inline-flex;
  flex-direction: column;

  div:first-of-type {
    margin-bottom: 10px;
  }
  button {
    margin-top: 10px;
  }

  .Mui-disabled > textarea,
  .Mui-disabled > input {
    -webkit-text-fill-color: rgba(0, 0, 0, 0.87) !important;
  }
`;

export const TodoTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

export const Icon = styled.span`
  margin-bottom: 10px;
`;

export const Title = styled.span`
  margin-bottom: 20px;

  &.todoList {
    margin-bottom: 40px;
  }
`;

export const TodoList = styled.ul`
  margin: 20px 20px 0;
  padding: 0 10px;
  max-height: 300px;
  overflow-y: scroll;

  a.active li {
    background: ${COLORS.primary};
    color: ${COLORS.white};

    svg {
      fill: ${COLORS.white};
    }
  }
`;

export const TodoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  border-radius: 5px;
  text-decoration: none;
  color: ${COLORS.gray900};
  height: 45px;

  &:hover {
    background-color: ${COLORS.gray100};
    cursor: pointer;
  }
`;

export const Name = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const IconWrap = styled.div`
  & > button {
    margin: 20px 6px 0;
  }
`;
