import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#800080" }}>
        <Toolbar>
          <Grid container>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Purple Team CSC 394
          </Typography>
            <Grid item>
            <Button color="inherit">Most Popular Recipes</Button>
            </Grid>
            <Grid item>
            <Button color="inherit">Vegan Recipes</Button>
            </Grid>
            <Grid item>
            <Button color="inherit">Random Recipes</Button>
            </Grid>
            <Grid item>
            <Button color="inherit">Login</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
