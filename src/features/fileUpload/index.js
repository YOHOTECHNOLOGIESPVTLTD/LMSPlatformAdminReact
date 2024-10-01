import Client from "api/index";
import toast from "react-hot-toast";
import { getErrorMessage } from "utils/error-handler";

export const handleFileUpload = async (data) => {
    try {
    const response = await Client.file.upload(data)
    toast.success("file upload successfully")
    return response    
    } catch (error) {
      const error_message = getErrorMessage(error)
      throw new Error(error_message)
    }
}

export const handleMultipleFiles = async (data) => {
    try {
    const response = await Client.file.uploads(data)
    return response    
    } catch (error) {
      return error  
    }
}