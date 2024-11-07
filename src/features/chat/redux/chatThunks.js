import { getAllTickets } from "./chatServices"
import { setTickets,setTicketsLoading } from "./chatSlicees"


export const getAllInstitutesTickets = () => async (dispath) => {
     try {
       dispath(setTicketsLoading(true)) 
       const response = await getAllTickets()
       console.log(response,"getAllTicketsResponse")
       dispath(setTickets(response?.data?.data))
     } catch (error) {
        console.log(error)
       return error
     }finally{
      dispath(setTicketsLoading(false))
     }
} 