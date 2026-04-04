import { Box, Paper, Typography, useTheme } from "@mui/material";

const AuthFormCard = ({ title, subtitle, children }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                px: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isDark ? '#000000' : '#fafafa',
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: { xs: 540, sm: 470 },
                    borderRadius: { xs: 3, sm: 4 },
                    border: 1,
                    borderColor: isDark ? '#262626' : '#dbdbdb',
                    bgcolor: isDark ? 'rgba(0, 0, 0, 0.6)' : '#ffffff',
                    backdropFilter: isDark ? "blur(14px)" : 'none',
                    boxShadow: isDark 
                        ? "0 24px 56px rgba(0, 0, 0, 0.5)" 
                        : "0 2px 10px rgba(0, 0, 0, 0.1)",
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
                        sx={{ 
                            fontSize: { xs: "1.6rem", sm: "2rem" }, 
                            fontWeight: 800, 
                            letterSpacing: "0.02em",
                            color: 'text.primary'
                        }}
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
