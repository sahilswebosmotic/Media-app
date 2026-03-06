import React from 'react'
import { Alert, Box, Card, CardContent, CircularProgress, Container, Grid, Stack } from '@mui/material'
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
  } = useUserProfilePage()

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
    <Container maxWidth='md' sx={{ pb: 2 }}>
      <Card
        sx={{
          borderRadius: 5,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.84)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(14px)',
          overflow: 'hidden',
          boxShadow: theme => theme.palette.mode === 'dark' ? '0 24px 56px rgba(2, 6, 23, 0.42)' : '0 12px 32px rgba(0, 0, 0, 0.05)',
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
    </Container>
  )
}

export default UserProfileForm

