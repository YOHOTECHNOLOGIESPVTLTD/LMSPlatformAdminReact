import Client from 'api/index';

export const sendOtpForPasswordReset = async (email) => {
  try {
    const response = await Client.auth.forget_password({ email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const validateOtp = async (data) => {
  try {
    const response = await Client.auth.validate_otp(data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updatePassword = async (data) => {
  try {
    const response = await Client.auth.update_password(data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
