import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import * as S from './Todos.style';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirm = window.confirm('로그아웃 하시겠습니까?');
    if (!isConfirm) return;
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <S.Header>
      <Button variant="outlined" size="small" onClick={handleLogout}>
        로그아웃
      </Button>
    </S.Header>
  );
}

export default Header;
