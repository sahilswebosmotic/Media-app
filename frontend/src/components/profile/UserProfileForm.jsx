import React, { useState } from 'react'
import { 
  Box, 
  Card, 
  CardContent, 
  CircularProgress, 
  Container, 
  Grid, 
  Stack, 
  Typography, 
  Button, 
  Avatar, 
  Tabs, 
  Tab, 
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material'
import { 
  Settings as SettingsIcon, 
  Link as LinkIcon, 
  CalendarMonth as DateIcon,
  GridView as GridIcon,
  VideoLibraryOutlined as ReelsIcon,
  BookmarkBorder as SavedIcon,
  PortraitOutlined as TaggedIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'
import useUserProfilePage from './useUserProfilePage'
import ProfileMediaGrid from './ProfileMediaGrid'
import EditProfileDialog from './EditProfileDialog'
import { useOutletContext } from 'react-router-dom'
import { useAuth } from '../../context/auth/useAuth'

const UserProfileForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { setIsLogoutConfirmOpen } = useOutletContext();
  const { logout } = useAuth();
  const {
    currentUser,
    isLoading,
    isError,
    error,
    avatarSource,
    avatarAlt,
    displayName,
    profileValues,
    isEditing,
    handleEdit,
    handleCancel,
    onSubmit,
    register,
    errors,
    handleFileChange,
    handleRemoveAvatar,
    isUpdating,
    submitError,
    successMessage,
    handleSubmit
  } = useUserProfilePage()

  const [activeTab, setActiveTab] = useState(0);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !currentUser) {
    return (
      <Container maxWidth='md' sx={{ mt: 4 }}>
        <Typography color="error" textAlign="center">
          {error?.data?.message || 'Unable to load profile.'}
        </Typography>
      </Container>
    )
  }

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header Background */}
      <Box 
        sx={{ 
          height: { xs: 150, md: 200 }, 
          width: '100%', 
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          borderRadius: 4,
          mb: -10
        }} 
      />

      <Container maxWidth="md" disableGutters={isMobile}>
        <Stack spacing={2}>
          {/* Profile Header Info */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 2, sm: 3 }} 
            alignItems={{ xs: 'center', sm: 'flex-end' }} 
            sx={{ px: { xs: 2, sm: 2 }, textAlign: { xs: 'center', sm: 'left' } }}
          >
            <Avatar
              src={avatarSource}
              alt={avatarAlt}
              sx={{
                width: { xs: 100, sm: 120, md: 150 },
                height: { xs: 100, sm: 120, md: 150 },
                border: `4px solid ${theme.palette.background.default}`,
                boxShadow: theme.shadows[4],
                bgcolor: 'background.paper',
                mt: { xs: -6, sm: 0 }
              }}
            />
            
            <Box sx={{ flexGrow: 1, pb: 1, width: '100%' }}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={1.5} 
                alignItems="center" 
                justifyContent={{ xs: 'center', sm: 'space-between' }}
              >
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  {profileValues.username}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    py: 0.25,
                    px: 0.25,
                    borderRadius: 999,
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleEdit}
                    sx={{
                      borderRadius: 999,
                      px: 2.4,
                      minHeight: 38,
                      fontWeight: 700,
                      borderColor: theme.palette.mode === "dark" ? "rgba(29,155,240,0.45)" : "rgba(29,155,240,0.5)",
                      color: "text.primary",
                      bgcolor: "background.paper",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: theme.palette.mode === "dark" ? "rgba(29,155,240,0.10)" : "rgba(29,155,240,0.08)",
                      },
                    }}
                  >
                    Edit profile
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    color="error"
                    onClick={() => setIsLogoutConfirmOpen(true)}
                    startIcon={<LogoutIcon />}
                    sx={{
                      borderRadius: 999,
                      px: 1.4,
                      minHeight: 38,
                      fontWeight: 700,
                      color: theme.palette.mode === "dark" ? "rgba(248,113,113,0.9)" : "error.main",
                      "&:hover": {
                        bgcolor: theme.palette.mode === "dark" ? "rgba(248,113,113,0.12)" : "rgba(211,47,47,0.08)",
                      },
                    }}
                  >
                    Logout
                  </Button>
                  <IconButton
                    size="small"
                    sx={{
                      width: 38,
                      height: 38,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: "transparent",
                      color: "text.secondary",
                      "&:hover": { bgcolor: theme.palette.action.hover, color: "text.primary" },
                    }}
                  >
                    <SettingsIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
              
              <Stack 
                direction="row" 
                spacing={{ xs: 3, sm: 4 }} 
                justifyContent={{ xs: 'center', sm: 'flex-start' }} 
                sx={{ mt: 2.5 }}
              >
                <Stack alignItems="center">
                  <Typography variant="body1" sx={{ fontWeight: 900 }}>
                    {currentUser.postsCount || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">posts</Typography>
                </Stack>
                <Stack alignItems="center" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  <Typography variant="body1" sx={{ fontWeight: 900 }}>
                    {currentUser.followersCount || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">followers</Typography>
                </Stack>
                <Stack alignItems="center" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  <Typography variant="body1" sx={{ fontWeight: 900 }}>
                    {currentUser.followingCount || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">following</Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>

          {/* Bio Section */}
          <Box sx={{ px: 2, pt: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              {currentUser.firstname} {currentUser.lastname}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500, mt: 0.5, mx: { xs: 'auto', sm: 0 } }}>
              Building the Media-app with robust backend & infinite scroll. 🚀
            </Typography>
            <Stack 
              direction="row" 
              spacing={2} 
              sx={{ mt: 2 }} 
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
              flexWrap="wrap"
            >
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                <LinkIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontWeight: 700 }}>github.com/{profileValues.username}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                <DateIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">Joined {currentUser.createdAt.slice(0, 10)}</Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider sx={{ mt: 3 }} />

          {/* Tabs Section */}
          <Tabs 
            value={activeTab} 
            onChange={(e, v) => setActiveTab(v)}
            variant="fullWidth"
            centered
            sx={{
              minHeight: 0,
              '& .MuiTabs-indicator': { top: 0 },
              '& .MuiTab-root': { py: 1.5, fontWeight: 700, minHeight: 0, fontSize: '0.8rem' }
            }}
          >
            <Tab icon={<GridIcon sx={{ fontSize: 18 }} />} label="POSTS" iconPosition="start" />
            <Tab icon={<ReelsIcon sx={{ fontSize: 18 }} />} label="REELS" iconPosition="start" />
            <Tab icon={<SavedIcon sx={{ fontSize: 18 }} />} label="SAVED" iconPosition="start" />
          </Tabs>

          {/* Grid View */}
          <Box sx={{ mt: 1 }}>
            {activeTab === 0 && <ProfileMediaGrid userId={currentUser._id} />}
            {activeTab !== 0 && (
              <Typography sx={{ py: 8, textAlign: 'center' }} color="text.secondary">
                No content available.
              </Typography>
            )}
          </Box>
        </Stack>
      </Container>

      <EditProfileDialog
        open={isEditing}
        onClose={handleCancel}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        avatarSource={avatarSource}
        handleFileChange={handleFileChange}
        handleRemoveAvatar={handleRemoveAvatar}
        isUpdating={isUpdating}
        submitError={submitError}
        successMessage={successMessage}
      />
    </Box>
  )
}

export default UserProfileForm

