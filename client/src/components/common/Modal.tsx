import { Box, Modal as ModalMui } from '@mui/material';
import type { ReactNode } from 'react';

import * as S from './Modal.style';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  padding: '40px 20px 20px 40px',
  lineHeight: '20px',
};

function Modal({ open, setOpen, onConfirm, children }: ModalProps) {
  const handleClose = () => setOpen(false);

  return (
    <ModalMui
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children}
        <S.ButtonWrap>
          {onConfirm && (
            <S.ResetButton onClick={handleClose}>취소</S.ResetButton>
          )}
          <S.ConfirmButton
            onClick={onConfirm || handleClose}
            isConfirm={!onConfirm}
          >
            확인
          </S.ConfirmButton>
        </S.ButtonWrap>
      </Box>
    </ModalMui>
  );
}

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm?: () => void;
  children: ReactNode;
}

export default Modal;
