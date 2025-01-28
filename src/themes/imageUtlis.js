const backendUrl = process.env.REACT_APP_PUBLIC_API_URL

export const getImageUrl = (imageKey) => {
    return imageKey ? `${backendUrl}/${imageKey}` : '';
}