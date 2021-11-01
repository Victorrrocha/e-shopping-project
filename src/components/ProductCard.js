import { Typography } from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material"

const ProductCard = ({image, title, price}) => {
    return (
        <Grid item sx={{
            justifyContent: 'center'
        }}>
            <Card sx={{
                maxWidth: 200,
                padding: .5
            }}>
                <CardMedia 
                    component="img"
                    height="200px"
                    sx={{
                        objectFit: 'contain'
                    }}
                    image={image}
                    alt="product"/>
                
                <CardContent sx={{
                    height: '100px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Typography 
                        sx={{
                            height: 'fit-content',
                            fontSize: '1rem',
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            marginBottom: '1rem'
                        }}
                        
                        variant="h5" 
                        component="div">
                        {title}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {`$${price}`}
                    </Typography>
                </CardContent>
                
                <CardActions>
                    <Button size="medium" color="secondary">Add to cart</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard
