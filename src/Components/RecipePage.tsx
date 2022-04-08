import {
  Button,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useRecoilValue } from 'recoil'
import { selectedRecipeAtom } from '../State/atoms'
import NavBar from './NavBar'

const RecipePage = () => {
  const recipe = useRecoilValue(selectedRecipeAtom)
  console.log(recipe)
  return (
    <>
      <NavBar />
      <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ width: '100vw' }}>
        <Grid item sx={{ marginTop: 4 }}>
          <Typography variant="h2" gutterBottom component="div">
            {recipe.label}
          </Typography>
        </Grid>
        <Grid item>
          <img src={recipe.image} alt="recipe" />
        </Grid>

        <Grid item sx={{ marginTop: 5 }}>
          <Typography variant="h6" gutterBottom component="div">
            Health Labels:
          </Typography>
        </Grid>

        <Grid item>
          <Grid container direction="row" spacing={1}>
            {recipe.healthLabels.map((label, idx) => (
              <Grid item key={`${label}${idx}`}>
                <Chip label={label} color="success" variant="outlined" />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item sx={{ marginTop: 5 }}>
          <Typography variant="h6" gutterBottom component="div">
            Cuisine Type:
          </Typography>
        </Grid>

        <Grid item>
          <Grid container direction="row" spacing={1}>
            {recipe.cuisineType.map((label, idx) => (
              <Grid item key={`${label}${idx}`}>
                <Chip label={label} color="secondary" variant="outlined" />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item sx={{ marginTop: 5 }}>
          <Typography variant="h6" gutterBottom component="div">
            Total Time: {recipe.totalTime} minutes
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            Total calories: {recipe.calories.toFixed(0)}
          </Typography>
        </Grid>

        <Grid item>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Label</TableCell>
                  <TableCell>Nutrition Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(recipe.digest).map((key, idx) => (
                  <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{recipe.digest[key].label}</TableCell>
                    <TableCell>
                      {recipe.digest[key].total.toFixed(0)} {recipe.digest[key].unit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item sx={{ marginTop: 10 }}>
          <Typography variant="h6" gutterBottom component="div">
            Cooking Instructions:
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Text</TableCell>
                  <TableCell>Food</TableCell>
                  <TableCell>Food Category</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Measure</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Weight</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recipe.ingredients.map((key, idx) => (
                  <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{key.text}</TableCell>
                    <TableCell>{key.food}</TableCell>
                    <TableCell>{key.foodCategory}</TableCell>
                    <TableCell>{<img src={key.image} style={{ height: 100 }} alt="measurement" />}</TableCell>
                    <TableCell>{key.measure}</TableCell>
                    <TableCell>{key.quantity}</TableCell>
                    <TableCell>{key.weight.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sx={{ margin: '50px' }}>
          <Button variant="contained" onClick={() => window.open(recipe.url, '_blank')}>
            Explore original recipe
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default RecipePage
