import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography, alpha } from '@mui/material'

const UserMenu = ({ user, actions, anchorEl, onOpen, onClose, onAction }) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton
          onClick={onOpen}
          sx={{
            p: 0.25,
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: 99,
          }}
        >
          <Avatar
            sx={{
              bgcolor: theme => alpha(theme.palette.primary.main, 0.2),
              color: 'primary.main',
              fontWeight: 800,
            }}
          >
            {(user?.firstname?.[0] || 'U').toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-user'
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant='subtitle2'>{user ? `${user.firstname} ${user.lastname}` : 'Guest User'}</Typography>
          <Typography variant='caption' color='text.secondary'>
            @{user?.username || 'guest'}
          </Typography>
        </Box>
        <Divider />
        {actions.map((action) => (
          <MenuItem key={action} onClick={() => onAction(action)}>
            <Typography>{action}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default UserMenu
