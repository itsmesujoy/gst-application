import axiosInstance from './axios';

export const LoginService = async (data:any) => {
  try {
    const response = await axiosInstance.post('/users/login',data);
    return response;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return error;
  }
};