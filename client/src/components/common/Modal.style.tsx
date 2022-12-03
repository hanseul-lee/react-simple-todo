import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  margin: 40px 10px 0;
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    opacity: 0.7;
  }
`;

export const ResetButton = styled(Button)`
  background: rgba(0, 0, 0, 0.12);
`;

interface ConfirmButtonProps {
  isConfirm: boolean;
}

export const ConfirmButton = styled(Button)<ConfirmButtonProps>`
  background: #1976d2;
  color: white;

  ${({ isConfirm }) =>
    !isConfirm &&
    css`
      margin-left: 210px;
    `};
`;
