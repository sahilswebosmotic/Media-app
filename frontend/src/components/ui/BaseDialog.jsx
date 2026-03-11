import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export default function BaseDialog({ open, title, onClose, children, actions, maxWidth = "sm" }) {
    return (
        <Dialog
            open={Boolean(open)}
            onClose={onClose}
            fullWidth
            maxWidth={maxWidth}
        >
            {title && (
                <DialogTitle sx={{ pb: 1.2, fontWeight: 800 }}>
                    {title}
                </DialogTitle>
            )}

            <DialogContent dividers>
                {children}
            </DialogContent>

            {actions && (
                <DialogActions sx={{ p: 2 }}>
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
}
