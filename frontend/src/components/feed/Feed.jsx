// import React, { useState } from 'react'
// import {
//   Alert,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControlLabel,
//   ImageList,
//   ImageListItem,
//   Stack,
//   Switch,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useCreatePostMutation, useGetFeedImageQuery, useGetFeedPostsQuery } from '@store/slice/postsApi'
// import { useForm, useWatch } from 'react-hook-form'
// import * as yup from 'yup'
// // import ProfileHeader from '@components/profile/ProfileHeader'
// import FeedHeader from './FeedHeader'
// import {useGetCurrentUserQuery} from '../../store/slice/authApi'
// // import FeedPost from './FeedPost'

// const postDefaultValues = {
//   title: '',
//   description: '',
//   image: null,
//   isPrivate: false,
// }

// const createPostSchema = yup.object({
//   title: yup.string().required('Title is required.').min(2).max(120),
//   description: yup.string().max(600, 'Description must be at most 600 characters.'),
//   isPrivate: yup.boolean().required(),
//   image: yup
//     .mixed()
//     .nullable()
//     .test('fileType', 'Only image files are allowed.', (file) => {
//       if (!file) return true
//       return file.type.startsWith('image/')
//     }),
// })

// const FeedImage = ({ postId, title, hasImage }) => {
//   const { data: imageData, isLoading } = useGetFeedImageQuery({ postId }, { skip: !hasImage })

//   if (!hasImage) {
//     return null
//   }

//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 180 }}>
//         <CircularProgress size={22} />
//       </Box>
//     )
//   }

//   if (!imageData?.imageData) {
//     return null
//   }

//   return (
//     <CardMedia
//       component="img"
//       image={imageData.imageData}
//       alt={title || 'Post image'}
//       sx={{ height: 220, objectFit: 'cover' }}
//     />
//   )
// }

// const Feed = () => {
//   const theme = useTheme()
//   const isMdDown = useMediaQuery(theme.breakpoints.down('md'))
//   const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   // const [isModalPostOpen, setIsModalPostOpen] = useState(false)
//   const [selectedPost, setSelectedPost] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState('')

//   const { data, isLoading, isError, error, isFetching } = useGetFeedPostsQuery({
//     page: 1,
//     perPage: 30,
//     isMyPostsOnly: false,
//   })
//   const [createPost, { isLoading: isPosting }] = useCreatePostMutation()

//   const {
//     control,
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: postDefaultValues,
//     resolver: yupResolver(createPostSchema),
//   })

//   const selectedImage = useWatch({ control, name: 'image' })

//   const posts = data?.data?.data ?? []
//   const cols = isSmDown ? 1 : isMdDown ? 4 : 5

//   const handleOpenModal = () => {
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl)
//       setPreviewUrl('')
//     }
//     reset(postDefaultValues)
//     setIsModalOpen(true)
//   }


//   const handleCloseModal = () => {
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl)
//       setPreviewUrl('')
//     }
//     reset(postDefaultValues)
//     setIsModalOpen(false)
//   }

// const { data: currentUserData } = useGetCurrentUserQuery()

// const currentUserId = currentUserData?.data?._id
// const visiblePosts = posts.filter(post => {
//   if (!post.isPrivate) return true
//   return post.userData?._id === currentUserId
// })


//   const handleOpenPost = (post) => {
//     setSelectedPost(post)
//   }

//   const handleClosePost = () => {
//     setSelectedPost(null)
//   }

//   const onSubmitPost = async (values) => {
//     try {
//       const formData = new FormData()
//       formData.append('title', values.title)
//       formData.append('description', values.description || '')
//       formData.append('isPrivate', values.isPrivate ? 'true' : 'false')
//       if (values.image) {
//         formData.append('image', values.image)
//       }

//       await createPost(formData).unwrap()
//       handleCloseModal()
//     } catch (createError) {
//       setError('root.apiError', {
//         message: createError?.data?.message || 'Unable to create post.',
//       })
//     }
//   }

//   if (isLoading) {
//     return (
//       <Box sx={{ minHeight: '65vh', display: 'grid', placeItems: 'center' }}>
//         <CircularProgress />
//       </Box>
//     )
//   }

//   if (isError) {
//     const message = error?.data?.message || error?.error || 'Something went wrong.'
//     return (
//       <Box sx={{ maxWidth: 900, mx: 'auto', px: 2 }}>
//         <Alert severity="error">{message}</Alert>
//       </Box>
//     )
//   }

//   return (
//     <Box sx={{ maxWidth: '70%', mx: 'auto', px: { xs: 1.5, md: 2 } }}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
//         <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
//           Explore Feed
//         </Typography>
//         <Button variant="contained" onClick={handleOpenModal} disabled={isFetching}>
//           Create Post
//         </Button>
//       </Stack>

//       {!posts.length ? (
//         <Card sx={{ borderRadius: 3 }}>
//           <CardContent>
//             <Typography color="text.secondary">No posts found.</Typography>
//           </CardContent>
//         </Card>
//       ) : (
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             overflowY: 'auto',
//             pr: 0.5,
//           }}
//         >
//           <ImageList variant="masonry"
//             cols={cols}
//             gap={12}>
//             {visiblePosts.map((post) => (
//               <ImageListItem key={post._id}>
//                 <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
//                   <FeedImage postId={post._id} title={post.title} hasImage={Boolean(post.filePath)} />
//                   <CardContent>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
//                       {post.title}
//                     </Typography>
//                     {post.description && (
//                       <Typography variant="body2" color="text.secondary">
//                         {post.description}
//                       </Typography>
//                     )}
//                     <Typography variant="caption" color="text.secondary">
//                       @{post.userData?.username || 'user'}
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       onClick={() => handleOpenPost(post)}
//                     >Open</Button>
//                   </CardContent>
//                 </Card>
//               </ImageListItem>
//             )) 
//             }
//           </ImageList>
//         </Box>
//       )}

//       <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
//         <DialogTitle>Create a New Post</DialogTitle>
//         <Stack component="form" onSubmit={handleSubmit(onSubmitPost)}>
//           <DialogContent sx={{ pt: 1 }}>
//             {errors.root?.apiError?.message && (
//               <Alert severity="error" sx={{ mb: 1.5 }}>
//                 {errors.root.apiError.message}
//               </Alert>
//             )}

//             <Stack spacing={1.5}>
//               <TextField
//                 label="Title"
//                 fullWidth
//                 {...register('title')}
//                 error={Boolean(errors.title)}
//                 helperText={errors.title?.message}
//               />
//               <TextField
//                 label="Description"
//                 fullWidth
//                 multiline
//                 minRows={3}
//                 {...register('description')}
//                 error={Boolean(errors.description)}
//                 helperText={errors.description?.message}
//               />

//               <Button variant="outlined" component="label">
//                 {selectedImage ? 'Change Image' : 'Upload Image'}
//                 <input
//                   hidden
//                   type="file"
//                   accept="image/*"
//                   onChange={(event) => {
//                     const file = event.target.files?.[0] || null
//                     setValue('image', file, { shouldValidate: true, shouldDirty: true })
//                     if (previewUrl) {
//                       URL.revokeObjectURL(previewUrl)
//                     }
//                     setPreviewUrl(file ? URL.createObjectURL(file) : '')
//                   }}
//                 />
//               </Button>
//               {errors.image?.message && <Alert severity="error">{errors.image.message}</Alert>}

//               {previewUrl && (
//                 <CardMedia
//                   component="img"
//                   image={previewUrl}
//                   alt="Selected preview"
//                   sx={{ borderRadius: 2, maxHeight: 220, objectFit: 'cover' }}
//                 />
//               )}

//               <FormControlLabel control={<Switch {...register('isPrivate')} />} label="Private post" />
//             </Stack>
//           </DialogContent>
//           <DialogActions sx={{ px: 3, pb: 2 }}>
//             <Button variant="outlined" onClick={handleCloseModal} disabled={isPosting}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" disabled={isPosting}>
//               {isPosting ? 'Posting...' : 'Post'}
//             </Button>
//           </DialogActions>
//         </Stack>
//       </Dialog>

//       <Dialog
//         open={Boolean(selectedPost)}
//         onClose={handleClosePost}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>
//           {selectedPost?.title}
//         </DialogTitle>

//         <DialogContent dividers>
//           {selectedPost && (
//             <Stack spacing={2}>
//               {selectedPost.filePath && (
//                 <FeedImage
//                   postId={selectedPost._id}
//                   title={selectedPost.title}
//                   hasImage={Boolean(selectedPost.filePath)}
//                 />
//               )}

//               <Typography variant="body1">
//                 {selectedPost.description}
//               </Typography>

//               <Typography variant="caption" color="text.secondary">
//                 @{selectedPost.userData?.username}
//               </Typography>

//               <Typography variant="caption">
//                 {selectedPost.isPrivate ? "Private Post" : "Public Post"}
//               </Typography>
//             </Stack>
//           )}
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClosePost}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }

// export default Feed



import { Box, Stack, Typography, Button, CircularProgress, Alert } from "@mui/material"
import { useState } from "react"
import { useGetFeedPostsQuery } from "@store/slice/postsApi"
import { useGetCurrentUserQuery } from "@store/slice/authApi"
import FeedGrid from "./FeedGrid"
import PostDialog from "./PostDialog"
import CreatePostDialog from './CreatePostDialog/CreatePostDialog';

const Feed = () => {
  const [selectedPost, setSelectedPost] = useState(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const { data, isLoading, isError, error } = useGetFeedPostsQuery({
    page: 1,
    perPage: 30,
  })

  const { data: currentUserData } = useGetCurrentUserQuery()
  const currentUserId = currentUserData?.data?._id

  const posts = data?.data?.data ?? []

  const visiblePosts = posts.filter(post => {
    if (!post.isPrivate) return true
    return post.userData?._id === currentUserId
  })

  if (isLoading) return <CircularProgress />
  if (isError) return <Alert severity="error">{error?.data?.message}</Alert>

  return (
    <Box sx={{ maxWidth: "70%", mx: "auto" }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Explore Feed</Typography>
        <Button onClick={() => setIsCreateOpen(true)}>Create Post</Button>
      </Stack>

      <FeedGrid
        posts={visiblePosts}
        cols={4}
        onOpenPost={setSelectedPost}
      />

      <PostDialog
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <CreatePostDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </Box>
  )
}

export default Feed