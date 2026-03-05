import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Box,
    Container,
    Typography,
    Avatar,
    CircularProgress,
    Grid,
    Paper,
    Stack,
    Divider,
    Button
} from '@mui/material'
import { useGetUsersProfileQuery, useGetUserImageQuery } from '@store/slice/usersApi'
import { useGetUserPostsQuery } from '@store/slice/postsApi'
import FeedGrid from '@components/feed/FeedGrid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const PublicProfile = () => {
    const { userId } = useParams()
    const navigate = useNavigate()

    const { data: profileResponse, isLoading: isProfileLoading, isError: isProfileError } = useGetUsersProfileQuery(userId)
    const { data: imageResponse, isLoading: isImageLoading } = useGetUserImageQuery({ userId })
    const { data: postsResponse, isLoading: isPostsLoading } = useGetUserPostsQuery({ userId, perPage: 30 })

    const user = profileResponse?.data
    const posts = postsResponse?.data?.data || []

    if (isProfileLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (isProfileError || !user) {
        return (
            <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h5" color="error" gutterBottom>
                    User profile not found.
                </Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Container>
        )
    }

    return (
        <Container maxWidth="lg">
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                Back
            </Button>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
                    <Avatar
                        src={imageResponse?.imageData ? `data:image/jpeg;base64,${imageResponse.imageData}` : ''}
                        sx={{ width: 120, height: 120, fontSize: '3rem', bgcolor: 'primary.dark' }}
                    >
                        {user.firstname[0]}{user.lastname[0]}
                    </Avatar>

                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>
                            {user.firstname} {user.lastname}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            @{user.username}
                        </Typography>
                        {user.isPrivate && (
                            <Typography variant="caption" sx={{ bgcolor: 'warning.dark', px: 1, py: 0.5, borderRadius: 1, fontWeight: 700 }}>
                                PRIVATE ACCOUNT
                            </Typography>
                        )}
                    </Box>
                </Stack>
            </Paper>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                    Posts
                </Typography>
                <Divider />
            </Box>

            {isPostsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress size={30} />
                </Box>
            ) : posts.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
                    This user hasn't posted anything yet.
                </Typography>
            ) : (
                <FeedGrid
                    posts={posts}
                    width="100%"
                    onOpenPost={(post) => navigate(`/home`, { state: { openPostId: post._id } })}
                />
            )}
        </Container>
    )
}

export default PublicProfile
