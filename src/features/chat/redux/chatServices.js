import { getErrorMessage } from "utils/error-handler"
import client from "api/index"


export const getAllTickets = async () => {
    try{
     const response = await client.help_center.ticket.get_all()
     return response
    }catch(error){
     const error_message = getErrorMessage(error)
     console.log(error)
     throw new Error(error_message)  
    }
}