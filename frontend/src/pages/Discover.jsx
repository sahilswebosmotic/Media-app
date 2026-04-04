import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { useAuth } from "@context/auth/useAuth";
import FollowButton from "@components/common/FollowButton";
import { useGetAllUsersQuery } from "@store/slice/usersApi";

const getUserInitials = (user) => {
  const first = user?.firstname?.[0] || "";
  const last = user?.lastname?.[0] || "";
  const initials = `${first}${last}`.trim();
  return initials || user?.username?.[0]?.toUpperCase() || "U";
};

const Discover = () => {
  const theme = useTheme();
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [page] = useState(1);
  const perPage = 24;

  const { data, isLoading, isFetching, isError, error } = useGetAllUsersQuery({
    page,
    perPage,
    search: search.trim() || undefined,
  });

  const users = useMemo(() => {
    const allUsers = data?.data || [];
    return allUsers.filter((item) => item?._id !== currentUser?._id);
  }, [data?.data, currentUser?._id]);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", width: "100%" }}>
      <Stack spacing={2} sx={{ mb: 3, px: { xs: 0.5, sm: 0 } }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Discover people
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find creators and follow people across the app.
        </Typography>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or username"
          size="small"
          InputProps={{
            startAdornment: (
              <SearchIcon
                fontSize="small"
                sx={{ mr: 1, color: "text.secondary" }}
              />
            ),
          }}
          sx={{
            maxWidth: 460,
            "& .MuiOutlinedInput-root": {
              borderRadius: 999,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
            },
          }}
        />
      </Stack>

      {isLoading || isFetching ? (
        <Box sx={{ minHeight: "40vh", display: "grid", placeItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : null}

      {!isLoading && !isFetching && isError ? (
        <Typography color="error">
          {error?.data?.message || "Failed to load users."}
        </Typography>
      ) : null}

      {!isLoading && !isFetching && !isError && users.length === 0 ? (
        <Typography color="text.secondary">No users found.</Typography>
      ) : null}

      {!isLoading && !isFetching && !isError && users.length > 0 ? (
        <Grid container spacing={2}>
          {users.map((profileUser) => (
            <Grid item xs={12} sm={6} md={4} key={profileUser._id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: "background.paper",
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1.5}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.light" }}>
                        {getUserInitials(profileUser)}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700 }}
                          noWrap
                        >
                          {profileUser.firstname} {profileUser.lastname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          @{profileUser.username}
                        </Typography>
                      </Box>
                    </Stack>

                    <FollowButton userId={profileUser._id} size="small" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Box>
  );
};

export default Discover;
