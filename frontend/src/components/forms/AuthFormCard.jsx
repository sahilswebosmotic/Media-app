import { Box, Paper, Typography } from "@mui/material";

const AuthFormCard = ({ title, subtitle, children }) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // px: { xs: 1.5, sm: 2.5 },
                // py: { xs: 2, sm: 3 },
                background:
                    "radial-gradient(circle at 12% 15%, rgba(94,160,255,0.22), transparent 28%), radial-gradient(circle at 88% 85%, rgba(14,165,233,0.18), transparent 30%), #0b1220",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: { xs: 520, sm: 460 },
                    borderRadius: { xs: 2.5, sm: 3 },
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    boxShadow: "0 20px 45px rgba(0, 0, 0, 0.45)",
                }}
            >
                <Box
                    sx={{
                        p: { xs: 2.2, sm: 3, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: 1.8, sm: 2.2 },
                    }}
                >
                    <Typography
                        variant="h4"
                        textAlign="center"
                        gutterBottom
                        sx={{ fontSize: { xs: "1.7rem", sm: "2.125rem" }, fontWeight: 700 }}
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
