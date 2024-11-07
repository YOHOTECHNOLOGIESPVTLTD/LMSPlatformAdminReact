import { io } from "socket.io-client"


const SOCKET_URL = process.env.REACT_APP_PUBLIC_API_URL

const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: false
})

export const connectSocket = () => {
    socket.connect()
}

export const disconnectSocket = () => {
    socket.disconnect()
}

export default socket