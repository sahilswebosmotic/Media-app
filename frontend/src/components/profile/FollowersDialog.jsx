import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  CircularProgress,
  Typography,
  Box,
  IconButton,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import { useGetFollowersQuery } from "../../store/slice/usersApi"
import FollowButton from "../common/FollowButton"

const FollowersDialog = ({ open, onClose, userId }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetFollowersQuery(
    { userId, page, perPage: 20 },
    { skip: !open || !userId }
  );

  const followers = data?.data?.followers || [];
  const pagination = data?.data?.pagination;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Followers
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {isLoading && page === 1 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            Failed to load followers
          </Typography>
        ) : followers.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No followers yet
          </Typography>
        ) : (
          <>
            <List>
              {followers.map((follower) => (
                <ListItem
                  key={follower._id}
                  secondaryAction={
                    <FollowButton userId={follower._id} variant="outlined" size="small" />
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={follower.profilePhoto} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${follower.firstname} ${follower.lastname}`}
                    secondary={`@${follower.username}`}
                  />
                </ListItem>
              ))}
            </List>
            {pagination && pagination.currentPage < pagination.totalPages && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  onClick={() => setPage(page + 1)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </Button>
              </Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowersDialog;
