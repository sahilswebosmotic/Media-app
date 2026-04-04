import { useEffect } from "react";
import { useSocket } from "../context/socket/SocketContext";
import { useToast } from "../context/toast/useToast";
import { useDispatch } from "react-redux";
import { apiSlice } from "../store/slice/apiSlice";

/**
 * Hook to listen to socket.io events and update Redux cache
 */
export const useSocialSocketListeners = () => {
  const socket = useSocket();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    // ========================================
    // NEW POST EVENT (existing)
    // ========================================
    
    const handleNewPost = (newPost) => {
      // Invalidate posts cache to refetch
      dispatch(apiSlice.util.invalidateTags(['Posts']));
    };

    // ========================================
    // LIKES EVENTS
    // ========================================
    
    const handleLikeCountUpdate = (data) => {
      const { postId, likesCount } = data;
      
      // Update all getFeedPosts cache entries
      dispatch(
        apiSlice.util.updateQueryData('getFeedPosts', undefined, (draft) => {
          const post = draft?.data?.data?.find((p) => p._id === postId);
          if (post) {
            post.likesCount = likesCount;
          }
        })
      );

      // Update getUsersPosts cache
      dispatch(
        apiSlice.util.updateQueryData('getUsersPosts', undefined, (draft) => {
          const post = draft?.data?.data?.find((p) => p._id === postId);
          if (post) {
            post.likesCount = likesCount;
          }
        })
      );
    };

    const handlePostLiked = (data) => {
      // Only show notification if it's your post being liked
      // This is handled by the backend sending to post author only
      showToast("Someone liked your post!", "success");
    };

    // ========================================
    // COMMENTS EVENTS
    // ========================================
    
    const handleCommentCountUpdate = (data) => {
      const { postId, commentsCount } = data;

      // Update getFeedPosts cache
      dispatch(
        apiSlice.util.updateQueryData('getFeedPosts', undefined, (draft) => {
          const post = draft?.data?.data?.find((p) => p._id === postId);
          if (post) {
            post.commentsCount = commentsCount;
          }
        })
      );

      // Update getUsersPosts cache
      dispatch(
        apiSlice.util.updateQueryData('getUsersPosts', undefined, (draft) => {
          const post = draft?.data?.data?.find((p) => p._id === postId);
          if (post) {
            post.commentsCount = commentsCount;
          }
        })
      );
    };

    const handleNewComment = (data) => {
      const { postId, commentsCount } = data;
      
      // Invalidate comments cache to refetch
      dispatch(apiSlice.util.invalidateTags([{ type: 'Comments', id: postId }]));
      
      // Show notification
      showToast("New comment on your post!", "info");
    };

    const handleCommentUpdated = (data) => {
      // Invalidate comments cache to refetch
      dispatch(apiSlice.util.invalidateTags(['Comments']));
    };

    const handleCommentDeleted = (data) => {
      const { postId } = data;
      // Invalidate comments cache to refetch
      dispatch(apiSlice.util.invalidateTags([{ type: 'Comments', id: postId }]));
    };

    // ========================================
    // SHARES EVENTS
    // ========================================
    
    const handleShareCountUpdate = (data) => {
      const { postId, sharesCount } = data;

      // Update getFeedPosts cache
      dispatch(
        apiSlice.util.updateQueryData('getFeedPosts', undefined, (draft) => {
          const post = draft?.data?.data?.find((p) => p._id === postId);
          if (post) {
            post.sharesCount = sharesCount;
          }
        })
      );

      // Update getUsersPosts cache
      dispatch(
        apiSlice.util.updateQueryData('getUsersPosts', undefined, (draft) => {
          const post = draft?.data?.data?.find((p) => p._id === postId);
          if (post) {
            post.sharesCount = sharesCount;
          }
        })
      );
    };

    const handlePostShared = (data) => {
      showToast("Someone shared your post!", "success");
    };

    // ========================================
    // FOLLOWS EVENTS
    // ========================================
    
    const handleNewFollower = (data) => {
      const { followersCount } = data;
      
      // Invalidate follow-related queries to refetch
      dispatch(apiSlice.util.invalidateTags(['Follows', 'Profile']));
      
      // Show notification
      showToast("You have a new follower!", "success");
    };

    // ========================================
    // REGISTER ALL LISTENERS
    // ========================================
    
    socket.on("new-post", handleNewPost);
    socket.on("like-count-update", handleLikeCountUpdate);
    socket.on("post-liked", handlePostLiked);
    socket.on("comment-count-update", handleCommentCountUpdate);
    socket.on("new-comment", handleNewComment);
    socket.on("comment-updated", handleCommentUpdated);
    socket.on("comment-deleted", handleCommentDeleted);
    socket.on("share-count-update", handleShareCountUpdate);
    socket.on("post-shared", handlePostShared);
    socket.on("new-follower", handleNewFollower);

    // ========================================
    // CLEANUP
    // ========================================
    
    return () => {
      socket.off("new-post", handleNewPost);
      socket.off("like-count-update", handleLikeCountUpdate);
      socket.off("post-liked", handlePostLiked);
      socket.off("comment-count-update", handleCommentCountUpdate);
      socket.off("new-comment", handleNewComment);
      socket.off("comment-updated", handleCommentUpdated);
      socket.off("comment-deleted", handleCommentDeleted);
      socket.off("share-count-update", handleShareCountUpdate);
      socket.off("post-shared", handlePostShared);
      socket.off("new-follower", handleNewFollower);
    };
  }, [socket, dispatch, showToast]);
};
