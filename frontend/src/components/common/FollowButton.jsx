import { useState, useEffect } from "react"
import { Button, CircularProgress } from "@mui/material"
import {
  PersonAdd as FollowIcon,
  PersonRemove as UnfollowIcon,
} from "@mui/icons-material"
import {
  useFollowUserMutation,
  useIsFollowingQuery,
} from "../../store/slice/usersApi"
import { useToast } from "../../context/toast/useToast"

const FollowButton = ({ userId, variant = "contained", size = "medium" }) => {
  const { showToast } = useToast();
  const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
  const { data: followingData } = useIsFollowingQuery(userId);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (followingData?.data?.isFollowing !== undefined) {
      setIsFollowed(followingData.data.isFollowing);
    }
  }, [followingData]);

  const handleFollow = async (e) => {
    e?.stopPropagation();
    if (isFollowing) return;

    const previousState = isFollowed;
    setIsFollowed(!previousState);

    try {
      const result = await followUser(userId).unwrap();
      setIsFollowed(result.data.isFollowing);
      showToast(
        result.data.isFollowing ? "Followed successfully" : "Unfollowed",
        "success"
      );
    } catch (error) {
      setIsFollowed(previousState);
      showToast("Failed to follow/unfollow user", "error");
      console.error("Failed to follow user:", error);
    }
  };

  return (
    <Button
      variant={isFollowed ? "outlined" : variant}
      size={size}
      onClick={handleFollow}
      disabled={isFollowing}
      startIcon={
        isFollowing ? (
          <CircularProgress size={16} />
        ) : isFollowed ? (
          <UnfollowIcon />
        ) : (
          <FollowIcon />
        )
      }
      sx={{
        minWidth: 120,
        textTransform: "none",
        fontWeight: 600,
      }}
    >
      {isFollowing ? "Loading..." : isFollowed ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
