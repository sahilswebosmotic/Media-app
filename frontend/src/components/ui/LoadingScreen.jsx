import { Box, CircularProgress } from "@mui/material";

export default function LoadingScreen({ minHeight = "45vh" }) {
    return (
        <Box sx={{ minHeight, display: "grid", placeItems: "center" }}>
            <CircularProgress />
        </Box>
    );
}
