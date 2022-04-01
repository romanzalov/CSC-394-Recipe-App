import {
  Box,
  Button,
  CircularProgress,
  Grid,
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

const Homepage = () => {
  const [allRecipes, setAllRecipes] = useRecoilState(allRecipesAtom);
  const [queryText, setQueryText] = useRecoilState(queryInputAtom);
  const [apiCallInporgress, setApiCallInProgress] = useState(false);
  const getAndSetAllRecipes = async (query: string) => {
    setApiCallInProgress(true);
    const data = await getRecipes(query);
    setAllRecipes(data.hits.map((hit: any) => hit.recipe));
    console.log(data);
    setApiCallInProgress(false);
  };

  useEffect(() => {
    const options = ["chicken", "beef", "vegan", "vegetables"];

    //grabs a random keyword
    getAndSetAllRecipes(options[Math.floor(Math.random() * options.length)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            onClick={() => getAndSetAllRecipes(queryText)}
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
