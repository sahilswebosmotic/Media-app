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
import { useGetFollowingQuery } from "../../store/slice/usersApi"
import FollowButton from "../common/FollowButton"

const FollowingDialog = ({ open, onClose, userId }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetFollowingQuery(
    { userId, page, perPage: 20 },
    { skip: !open || !userId }
  );

  const following = data?.data?.following || [];
  const pagination = data?.data?.pagination;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Following
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
            Failed to load following
          </Typography>
        ) : following.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            Not following anyone yet
          </Typography>
        ) : (
          <>
            <List>
              {following.map((user) => (
                <ListItem
                  key={user._id}
                  secondaryAction={
                    <FollowButton userId={user._id} variant="outlined" size="small" />
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={user.profilePhoto} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.firstname} ${user.lastname}`}
                    secondary={`@${user.username}`}
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

export default FollowingDialog;
