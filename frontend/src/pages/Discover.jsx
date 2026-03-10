import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  alpha,
  Skeleton,
} from "@mui/material";
import {
  useGetAllUsersQuery,
  useGetUserImageQuery,
} from "@store/slice/usersApi";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ item }) => {
  // console.log(item)
  const navigate = useNavigate()
  const { data: imageData, isLoading: imageLoading } = useGetUserImageQuery({
    userId: item._id,
  });

  return (
    <Card
      sx={{
        p: 1.5,
        borderRadius: 3,
        textAlign: "center",
        transition: "all 0.25s ease",
        boxShadow: (theme) =>
          `0 6px 18px ${alpha(theme.palette.common.black, 0.08)}`,
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: (theme) =>
            `0 12px 28px ${alpha(theme.palette.common.black, 0.18)}`,
        },
      }}
    >
      <Box
        sx={{
          pt: 3,
          pb: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {imageLoading ? (
          <Skeleton variant="circular" width={96} height={96} />
        ) : (
          <Avatar
            src={imageData?.imageData}
            alt={`${item.firstname} ${item.lastname}`}
            sx={{
              width: 100,
              height: 100,
              border: (theme) =>
                `3px solid ${alpha(theme.palette.primary.main, 0.4)}`,
            }}
          />
        )}
      </Box>

      <CardContent sx={{ pt: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, lineHeight: 1.2 }}
        >
          {item.firstname} {item.lastname}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mt: 0.5,
          }}
        >
          @{item.username}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "center",
          pb: 2,
          gap: 0,
        }}
      >
        <Button size="small" variant="outlined" 
         sx={{
          borderRadius: 20,
          px: 2,
          textTransform: "none",
          fontWeight: 600,
        }}
        onClick={() => navigate(`/public-profile/${item._id}`)}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

const Discover = () => {
  const { data: usersResponse, isLoading, isError } = useGetAllUsersQuery();

  const users = usersResponse?.data || [];
  const publicUsers = users.filter((user) => user.isPrivate === false);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 0.5,
          }}
        >
          Discover
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Explore the world of creativity and inspiration
        </Typography>

        <Grid container spacing={3}>
          {isLoading ? (
            Array.from(new Array(8)).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 3 }} />
              </Grid>
            ))
          ) : isError ? (
            <Typography color="error">
              Error loading users
            </Typography>
          ) : (
            publicUsers.map((item) => (
              <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                <UserCard item={item} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Discover;
