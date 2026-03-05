import React, { useState } from 'react'
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ProfileAvatarSection from './ProfileAvatarSection'
import ProfileActions from './ProfileActions'
import ProfileDetailsSection from './ProfileDetailsSection'
import ProfileFeedback from './ProfileFeedback'
import ProfileHeader from './ProfileHeader'
import useUserProfilePage from './useUserProfilePage'

const UserProfileForm = () => {
  const {
    currentUser,
    isLoading,
    isError,
    error,
    isEditing,
    isUpdating,
    isDeleting,
    register,
    errors,
    isDirty,
    watchedFile,
    hasStoredAvatar,
    profilePreview,
    avatarSource,
    avatarAlt,
    displayName,
    profileValues,
    submitError,
    successMessage,
    handleSubmit,
    onSubmit,
    handleEdit,
    handleCancel,
    handleFileChange,
    handleRemoveAvatar,
    removeAvatar,
    onAccountDelete,
  } = useUserProfilePage()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Container maxWidth='md'>
        <Alert severity='error'>{error?.data?.message || 'Unable to load profile details.'}</Alert>
      </Container>
    )
  }

  if (!currentUser) {
    return (
      <Container maxWidth='md'>
        <Alert severity='warning'>Profile data is not available.</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth='md' sx={{ pb: 4 }}>
      <Card
        sx={{
          borderRadius: 5,
          border: '1px solid rgba(148, 163, 184, 0.2)',
          bgcolor: 'rgba(15, 23, 42, 0.84)',
          backdropFilter: 'blur(14px)',
          overflow: 'hidden',
          boxShadow: '0 24px 56px rgba(2, 6, 23, 0.42)',
          mb: 3
        }}
      >
        <ProfileHeader isPrivate={currentUser?.isPrivate} />

        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2.5} component="form" onSubmit={handleSubmit(onSubmit)}>
            <ProfileFeedback
              successMessage={successMessage}
              submitError={submitError}
              fileErrorMessage={errors.profilePhotoFile?.message}
            />

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <ProfileAvatarSection
                  avatarSource={avatarSource}
                  avatarAlt={avatarAlt}
                  isEditing={isEditing}
                  watchedFile={watchedFile}
                  displayName={displayName}
                  username={profileValues.username}
                  hasStoredAvatar={hasStoredAvatar}
                  profilePreview={profilePreview}
                  onFileChange={handleFileChange}
                  onRemoveAvatar={handleRemoveAvatar}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <ProfileDetailsSection
                  isEditing={isEditing}
                  register={register}
                  errors={errors}
                  profileValues={profileValues}
                  email={currentUser.email}
                  createdAt={currentUser.createdAt}
                  updatedAt={currentUser.updatedAt}
                />
              </Grid>
            </Grid>

            <ProfileActions
              isEditing={isEditing}
              isUpdating={isUpdating}
              isDirty={isDirty}
              removeAvatar={removeAvatar}
              onEdit={handleEdit}
              onCancel={handleCancel}
            />
          </Stack>
        </CardContent>
      </Card>

      {!isEditing && (
        <Box sx={{ textAlign: 'center' }}>
          <Button
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={() => setOpenDeleteDialog(true)}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Delete Account
          </Button>
        </Box>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{ sx: { borderRadius: 4, bgcolor: 'background.paper' } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Delete Account Forever?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is permanent. All your posts, photos, and profile data will be erased from our community.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined">Cancel</Button>
          <Button
            onClick={onAccountDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default UserProfileForm

