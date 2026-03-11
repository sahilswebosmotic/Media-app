import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../utils/socket";
import { useAuth } from "@features/auth/context/useAuth";

import { SocketContext } from "./SocketContextObject";

export const SocketProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const s = connectSocket();  
      setTimeout(() => setSocket(s), 0);
    } else {
      disconnectSocket();
      setTimeout(() => setSocket(null), 0);
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