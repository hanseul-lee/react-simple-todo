import axios from 'axios';

import { BASE_URL } from '@/consts';
import type { User, AUTH_RESPONSE_TYPE } from '@/types';

export const login = async (user: User): Promise<AUTH_RESPONSE_TYPE> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, user);
    const { message, token } = response.data;
    if (response.status === 200) {
      localStorage.setItem('token', `Bearer ${token}`);
    }
    return { message, token };
  } catch (err: any) {
    console.error(err);
    return { message: err?.response.data.details, token: null };
  }
};

export const signUp = async (user: User): Promise<AUTH_RESPONSE_TYPE> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/create`, user);
    return { message: data.message, token: data.token };
  } catch (err: any) {
    console.error(err);
    return { message: err?.response.data.details, token: null };
  }
};
