import { io } from "socket.io-client";
import Cookies from "js-cookie";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

let socket = null;

export const connectSocket = () => {
  const token = Cookies.get("accessToken");
  if (!token) return null;

  // Prevent duplicate connections
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    extraHeaders: {
      token: token,  
    },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;