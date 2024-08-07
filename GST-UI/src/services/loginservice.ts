import axiosInstance from './axios';

export const LoginService = async (data:any) => {
  try {
    const response = await axiosInstance.post('/users/login',data);
    return response;
  } catch (error) {
    console.error( error);
    return error;
  }
};

export const VerifyOtp = async (data:any) => {
  try {
    const response = await axiosInstance.post('/users/verify-otp',data);
    return response;
  } catch (error) {
    console.error( error);
    return error;
  }
};

export const signUp = async (data:any) => {
  try {
    const response = await axiosInstance.post('/users/signup',data);
    return response;
  } catch (error) {
    console.error( error);
    return error;
  }
};

export const resendOtp = async (data:any) => {
  try {
    const response = await axiosInstance.post('/users/resend-otp',data);
    return response;
  } catch (error) {
    console.error( error);
    return error;
  }
};