import React, { useState, useEffect } from 'react'
import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    Grid,
    Card,
    CardContent,
    Avatar,
    Button,
    CircularProgress,
    Pagination,
    Stack
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useGetAllUsersQuery, useGetUserImageQuery } from '@store/slice/usersApi'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ user }) => {
    const navigate = useNavigate()
    const { data: imageData, isLoading: isImageLoading } = useGetUserImageQuery({ userId: user._id })

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4, transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', pt: 3 }}>
                <Avatar
                    src={imageData?.imageData ? `data:image/jpeg;base64,${imageData.imageData}` : ''}
                    sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}
                >
                    {user.firstname[0]}{user.lastname[0]}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {user.firstname} {user.lastname}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    @{user.username}
                </Typography>
                <Box sx={{ mt: 'auto', pt: 2, width: '100%' }}>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => navigate(`/profile/${user._id}`)}
                        sx={{ borderRadius: 2 }}
                    >
                        View Profile
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

const DiscoverPeople = () => {
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [page, setPage] = useState(1)
    const perPage = 12

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
            setPage(1)
        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    const { data, isLoading, isError } = useGetAllUsersQuery({
        page,
        perPage,
        search: debouncedSearch
    })

    // Since backend getAllUsers in users.controller.js returns { status: "success", data: users }
    // where data is directly the array (it skips the total count logic in current implementation)
    const users = data?.data || []

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    Discover People
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Find and connect with other users in the community.
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by name or username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ maxWidth: 600, bgcolor: 'background.paper', borderRadius: 2 }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Typography color="error" variant="h6" textAlign="center" py={8}>
                    Failed to load users. Please try again later.
                </Typography>
            ) : users.length === 0 ? (
                <Typography variant="h6" textAlign="center" color="text.secondary" py={8}>
                    No users found.
                </Typography>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {users.map((user) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
                                <UserCard user={user} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Note: Backend doesn't return total count for users yet, so simple pagination */}
                    {users.length === perPage && (
                        <Stack spacing={2} sx={{ mt: 6, alignItems: 'center' }}>
                            <Pagination
                                count={page + 1}
                                page={page}
                                onChange={(e, v) => setPage(v)}
                                color="primary"
                            />
                        </Stack>
                    )}
                </>
            )}
        </Container>
    )
}

export default DiscoverPeople
