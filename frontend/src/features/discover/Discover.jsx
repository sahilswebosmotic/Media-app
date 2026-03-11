import {
  Box,
  Container,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import React from "react";
import UserCard from "./components/UserCard";
import { useGetAllUsersQuery } from "@features/profile/api/users.api";

export default function Discover () {
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

