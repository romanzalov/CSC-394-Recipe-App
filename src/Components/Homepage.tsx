import {
    Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getRecipes } from "../Api/api";
import { allRecipesAtom, queryInputAtom } from "../State/atoms";
import styles from "../Styles/Main.module.css";
import NavBar from "./NavBar";
import RecipeCard from "./RecipeCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Homepage = () => {
  const [allRecipes, setAllRecipes] = useRecoilState(allRecipesAtom);
  const [queryText, setQueryText] = useRecoilState(queryInputAtom);
  const [apiCallInporgress, setApiCallInProgress] = useState(false);
  const getAndSetAllRecipes = async () => {
    setApiCallInProgress(true);
    const data = await getRecipes(queryText);
    setAllRecipes(data.hits.map((hit: any) => hit.recipe));
    console.log(data);
    setApiCallInProgress(false);
  };

  useEffect(() => {
    getAndSetAllRecipes();
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles["margin-top-25"]}>
          <Typography variant="h2" sx={{ flexGrow: 1 }}>
            Recipe Finder
          </Typography>
        </div>
        <div
          className={`${styles["margin-top-25"]} ${styles["margin-bottom-50"]}`}
        >
          <TextField
            id="recipe-search-bar"
            variant="outlined"
            placeholder="Enter Ingredient(s) here"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={getAndSetAllRecipes}
            style={{ minHeight: "56px" }}
          >
            Find Recipes
          </Button>
        </div>

        {apiCallInporgress ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            container
            spacing={6}
            justifyContent="center"
            alignItems="center"
          >
            {allRecipes.map((recipe: any) => (
              <Grid
                item
                justifyContent="center"
                alignItems="center"
                key={recipe.image}
              >
                {
                  <RecipeCard
                    key={recipe.image}
                    calories={recipe.calories}
                    totalTime={recipe.totalTime}
                    cuisineType={recipe.cuisineType}
                    label={recipe.label}
                    image={recipe.image}
                  />
                }
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};

export default Homepage;
