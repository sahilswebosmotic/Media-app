import { TextField, InputAdornment, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ value, onChange, placeholder = "Search...", fullWidth = true, sx = {} }) {
    return (
        <TextField
            placeholder={placeholder}
            size="medium"
            fullWidth={fullWidth}
            value={value}
            onChange={onChange}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                        </InputAdornment>
                    ),
                },
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.48)' : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                    },
                    '&.Mui-focused': {
                        bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : '#fff',
                        boxShadow: theme => `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
                    }
                },
                ...sx
            }}
        />
    );
}