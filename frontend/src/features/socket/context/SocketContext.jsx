import React, { createContext, useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../utils/socket";
import { useAuth } from "@features/auth/context/useAuth";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const s = connectSocket();
      setSocket(s);
    } else {
      disconnectSocket();
      setSocket(null);
    }

    return () => {
      disconnectSocket();
    };
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};