

export const formateDate = (date) => {
    const formated_date = new Date(date).toLocaleDateString()
    return formated_date
}

export const getuserDetails = () => {
    const user = localStorage.getItem("userData")
    if(user){
        return JSON.parse(user)
    }
    return null
}
console.log("called")
export const priorityColors = {
    Low: '#00FF00',      
    Medium: '#FFFF00',   
    High: '#FFA500',     
    Urgent: '#FF0000'    
  };