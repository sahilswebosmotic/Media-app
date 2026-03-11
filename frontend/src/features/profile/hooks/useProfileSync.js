import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiSlice } from "@store/api/apiSlice";

export default function useProfileSync() {
    const dispatch = useDispatch();

    useEffect(() => {
        const channel = new BroadcastChannel("profile_updates");

        const handleMessage = (event) => {
            console.log('Received broadcast message:', event.data)
            if (event.data?.type === "PROFILE_UPDATED") {
                console.log('Invalidating tags: Profile, Users')
                dispatch(apiSlice.util.invalidateTags(["Profile", "Users"]));
            }
        };

        channel.onmessage = handleMessage;

        return () => {
            channel.close();
        };
    }, [dispatch]);
}
