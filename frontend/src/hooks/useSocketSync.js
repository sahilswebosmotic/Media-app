import { useEffect } from "react";
import { useSocket } from "../context/socket/SocketContext";
import { useDispatch } from "react-redux";
import { apiSlice } from "../store/slice/apiSlice";

export const useSocketSync = () => {
    const socket = useSocket();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return;

        const handleNewPost = (postData) => {
            // Option A: Invalidate the cache so RTK Query refetches
            dispatch(apiSlice.util.invalidateTags(["Posts"]));
        };


        socket.on("new-post", handleNewPost);

        return () => {
            socket.off("new-post", handleNewPost);
        };
    }, [socket, dispatch]);
};