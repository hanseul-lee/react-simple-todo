import type { ChangeEvent, FormEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Avatar,
  Button,
  Stack,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';

import * as S from './AuthForm.style';

import { AUTH_TEMPLATE, ROUTES, USER_VALIDATION_ERRORS } from '@/consts';
import type { User, AUTH_RESPONSE_TYPE } from '@/types';
import { AUTH_TYPE, ALERT_TYPE } from '@/types';

const AuthForm = ({ type, onSubmitAPI }: AuthFormProps) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { email, password, passwordConfirm } = inputs;
  const [open, setOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType>(ALERT_TYPE.error);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const isValidEmail = !!(email.includes('@') && email.includes('.'));
  const isValidPassword = password.length >= 8;
  const isValidPasswordConfirm = password === passwordConfirm;

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    user: User,
  ): Promise<void> => {
    e.preventDefault();

    const response = await onSubmitAPI(user);
    setOpen(true);
    setAlertMessage(response?.message || '');

    if (!response?.token) {
      setAlertType(ALERT_TYPE.error);
    } else {
      setAlertType(ALERT_TYPE.success);
      if (type === AUTH_TYPE.login) {
        localStorage.setItem('token', response.token);
        navigate(ROUTES.main);
        return;
      }
      navigate(ROUTES.login);
    }
  };

  const handleCloseAlert = (
    e?: SyntheticEvent | Event,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <S.Root>
      <S.Container>
        <S.Header>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} />
          <S.Title>{AUTH_TEMPLATE[type].title}</S.Title>
        </S.Header>
        <S.Form onSubmit={(e) => handleSubmit(e, { email, password })}>
          <TextField
            required
            label="Email"
            name="email"
            value={email}
            sx={{ m: 1, width: '30ch' }}
            onChange={handleInputChange}
            error={!!email && !isValidEmail}
          />
          {email && !isValidEmail && (
            <FormHelperText error>
              {USER_VALIDATION_ERRORS.INVALID_EMAIL}
            </FormHelperText>
          )}
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            value={password}
            sx={{ m: 1, width: '30ch' }}
            onChange={handleInputChange}
            error={!!password && !isValidPassword}
          />
          {password && !isValidPassword && (
            <FormHelperText error>
              {USER_VALIDATION_ERRORS.INVALID_PASSWORD}
            </FormHelperText>
          )}
          {type === AUTH_TYPE.signUp && (
            <>
              <TextField
                required
                label="Password Confirm"
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                sx={{ m: 1, width: '30ch' }}
                onChange={handleInputChange}
                error={!!passwordConfirm && !isValidPasswordConfirm}
              />
              {passwordConfirm && !isValidPasswordConfirm && (
                <FormHelperText error>
                  {USER_VALIDATION_ERRORS.INVALID_PASSWORDCONFIRM}
                </FormHelperText>
              )}
            </>
          )}
          <S.ButtonWrap>
            <Stack direction="row" spacing={4}>
              <Link
                to={type === AUTH_TYPE.login ? ROUTES.signUp : ROUTES.login}
              >
                <Button variant="outlined">
                  {type === AUTH_TYPE.login ? '회원가입' : '취소'}
                </Button>
              </Link>
              <Button
                disabled={
                  type === AUTH_TYPE.login
                    ? !isValidEmail || !isValidPassword
                    : !isValidEmail ||
                      !isValidPassword ||
                      !isValidPasswordConfirm
                }
                type="submit"
                variant="contained"
              >
                {AUTH_TEMPLATE[type].name}
              </Button>
            </Stack>
          </S.ButtonWrap>
        </S.Form>
      </S.Container>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertType}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </S.Root>
  );
};

type AlertType = typeof ALERT_TYPE[keyof typeof ALERT_TYPE];

interface AuthFormProps {
  type: typeof AUTH_TYPE[keyof typeof AUTH_TYPE];
  onSubmitAPI: (user: User) => Promise<AUTH_RESPONSE_TYPE | undefined>;
}

export default AuthForm;
