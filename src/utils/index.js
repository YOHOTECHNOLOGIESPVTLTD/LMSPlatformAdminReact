

export const formateDate = (date) => {
    const formated_date = new Date(date).toLocaleDateString()
    return formated_date
}