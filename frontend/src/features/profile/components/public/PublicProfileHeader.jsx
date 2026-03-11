import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Grid,
  Paper,
  Skeleton,
  alpha,
} from "@mui/material";

export default function PublicProfileHeader({
  profileData,
  imageData,
  totalPosts,
  profileLoading,
  profileError,
  imageLoading,
}) {
  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
      <Grid container spacing={4} alignItems="center">

        <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
          {imageLoading ? (
            <Skeleton variant="circular" width={96} height={96} />
          ) : (
            <Avatar
              src={imageData?.imageData}
              sx={{
                width: 100,
                height: 100,
                border: (theme) =>
                  `3px solid ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            />
          )}
        </Grid>


        <Grid item xs={12} md={9}>
          {profileLoading ? (
            <>
              <Skeleton variant="text" width={250} height={40} />
              <Skeleton variant="text" width={150} height={24} />

              <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                <Skeleton variant="text" width={80} />
                <Skeleton variant="text" width={80} />
                <Skeleton variant="text" width={80} />
              </Box>
            </>
          ) : profileError ? (
            <Typography color="error">
              Failed to load profile data
            </Typography>
          ) : (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {profileData?.data?.firstname} {profileData?.data?.lastname}
                </Typography>
              </Box>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                @{profileData?.data?.username}
              </Typography>

              <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                <Typography>
                  <b>{totalPosts}</b> Posts
                </Typography>

                <Typography>
                  <b>0</b> Followers
                </Typography>

                <Typography>
                  <b>0</b> Following
                </Typography>
              </Box>

              <Typography sx={{ mt: 2, maxWidth: 500 }}>
                Passionate developer 🚀 | Love building scalable web apps
                | Exploring React & system design.
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
;
