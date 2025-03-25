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
export const resendOtp = async (email) => {
  try {
    const response = await Client.auth.resend_otp({ email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getProfileWithId = async (id) => {
  try {
    const response = await Client.auth.get_profile({id});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getUserActivity=async(data)=>{
  try{
    const response=await Client.auth.get_activity(data);
    return response.data
  }
  catch(error){
    throw error.response.data
  }
}

export  const updateUserDetails=async(data)=>{
  try{
    const response=await Client.auth.edit_profile(data);
    return response.data;
  }
  catch(error){
    console.log(error,"error")
    throw new Error(error)
  }
}
