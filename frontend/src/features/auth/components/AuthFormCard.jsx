import { Box, Paper, Typography } from "@mui/material";

const AuthFormCard = ({ title, subtitle, children }) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                px: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "transparent",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: { xs: 540, sm: 470 },
                    borderRadius: { xs: 3, sm: 4 },
                    border: 1,
                    borderColor: "divider",
                    bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(15, 23, 42, 0.86)" : "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(14px)",
                    boxShadow: (theme) => theme.palette.mode === "dark" ? "0 24px 56px rgba(2, 6, 23, 0.5)" : "0 8px 32px rgba(0, 0, 0, 0.08)",
                }}
            >
                <Box
                    sx={{
                        p: { xs: 2.4, sm: 3.2, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: 1.7, sm: 2.2 },
                    }}
                >
                    <Typography
                        variant="h4"
                        textAlign="center"
                        gutterBottom
                        sx={{ fontSize: { xs: "1.6rem", sm: "2rem" }, fontWeight: 800, letterSpacing: "0.02em" }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        textAlign="center"
                        color="text.secondary"
                        sx={{ mb: 1, px: { xs: 0.4, sm: 0 } }}
                    >
                        {subtitle}
                    </Typography>
                    {children}
                </Box>
            </Paper>
        </Box>
    );
};

export default AuthFormCard;
