import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import FeedImage from "@features/feed/components/FeedImage";

export default function PublicPostCard({ post, onOpen }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.25s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 200,
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <FeedImage
          postId={post._id}
          title={post.title}
          hasImage={Boolean(post.filePath)}
          sx={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />

        {/* Title Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            p: 2,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {post.title}
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {post.description}
        </Typography>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "auto",
          }}
        >
          {/* Dates */}
          <Box>
            <Typography variant="caption" color="text.secondary">
              Created • {new Date(post.createdAt).toLocaleDateString()}
            </Typography>

            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
            >
              Updated • {new Date(post.updatedAt).toLocaleDateString()}
            </Typography>
          </Box>

          {/* Button */}
          <Button
            size="small"
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 2,
            }}
            onClick={() => onOpen(post)}
          >
            View
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

