import api, { getCsrfToken } from '../api/axios';

export const loginUser = async (values) => {
  try {
    await getCsrfToken();
    const response = await api.post('/api/login', values);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (values) => {
  try {
    await getCsrfToken();
    const response = await api.post('/api/register', values);
    return response.data;
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors ? Object.values(errors).flat().join('\n') : 'Registration failed';
    throw new Error(message);
  }
};
