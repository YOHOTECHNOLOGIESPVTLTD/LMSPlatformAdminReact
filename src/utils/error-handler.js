


export const getErrorMessage =(error) => {
    const message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
    return message
}