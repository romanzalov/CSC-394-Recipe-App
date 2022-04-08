import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#800080' }}>
        <Toolbar>
          <Grid container>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Purple Team CSC 394
            </Typography>
            <Grid item>
              <Button color="inherit">
                <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  Recipe Finder
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit">
                <Link to={'/mealprepgenerator'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  Generate Meal Plan
                </Link>
              </Button>
              <Button color="inherit">
                <Link to={'/mealplan'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Meal Plan
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit">Login</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
