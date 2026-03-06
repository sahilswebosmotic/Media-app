import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import React from "react";

const PostCard = ({item}) =>{
    return(
<Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardMedia
        component="img"
        height="140"
        image={item.imageUrl}
        alt={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.user}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Profile</Button>
        <Button size="small">Follow</Button>
      </CardActions>
    </Card>
    )
}
const Discover = () => {
  
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 0.5 }}>
                    Discover
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Explore the world of creativity and inspiration
                </Typography>
                <Grid container spacing={3}>
                    {/* {discoverItems.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <PostCard item={item} />
                    </Grid>
                ))} */}
                </Grid>
            </Box>
        </Container>
    );
};

export default Discover;