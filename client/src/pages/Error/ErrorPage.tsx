import styled from '@emotion/styled';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const S = {
  Root: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    h1 {
      margin-bottom: 20px;
    }
    p {
      margin-bottom: 10px;
    }
  `,
};

const ErrorPage = () => {
  const error = useRouteError();
  if (!isRouteErrorResponse(error)) {
    return <S.Root>Oops!</S.Root>;
  }

  return (
    <S.Root>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
      </p>
    </S.Root>
  );
};

export default ErrorPage;
