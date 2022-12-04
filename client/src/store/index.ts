import type { UseQueryResult } from '@tanstack/react-query';
import { createContext } from 'react';

export const TodoContext = createContext<UseQueryResult<any, unknown>>({
  data: [],
  isSuccess: true,
  // @ts-ignore
  refetch: () => {},
});
