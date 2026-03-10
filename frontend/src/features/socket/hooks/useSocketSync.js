import { useEffect } from "react";
import { useSocket } from "../context/useSocket";
import { useDispatch } from "react-redux";
import { apiSlice } from "@store/api/apiSlice";

export const useSocketSync = () => {
    const socket = useSocket();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return;

        const handleNewPost = () => {
            dispatch(apiSlice.util.invalidateTags(["Posts"]));
        };

        socket.on("new-post", handleNewPost);

        return () => {
            socket.off("new-post", handleNewPost);
        };
    }, [socket, dispatch]);
};