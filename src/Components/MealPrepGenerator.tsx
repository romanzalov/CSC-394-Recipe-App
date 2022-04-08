import { Alert, Autocomplete, Box, Button, Grid, Slider, TextField } from '@mui/material'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { cuisineTypeData, DietData, HealthData } from '../Data/MealPrepData'
import {
  cuisineTypeAtom,
  dietTypeAtom,
  generatedMealPlanAtom,
  healthTypeAtom,
  maxCaloriesPerMealAtom,
  maxNumIngredientsAtom,
  maxPrepTimeAtom,
  mealPrepBoardDataAtom,
} from '../State/atoms'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BoardDataInterface } from './MealPlan'
const MealPrepGenerator = () => {
  const [maxNumIngredients, setMaxNumIngredients] = useRecoilState(maxNumIngredientsAtom)
  const [maxCaloriesPerMeal, setMaxCaloriesPerMeal] = useRecoilState(maxCaloriesPerMealAtom)
  const [maxPrepTime, setMaxPrepTime] = useRecoilState(maxPrepTimeAtom)
  const [dietType, setDietType] = useRecoilState(dietTypeAtom)
  const [healthType, setHealthType] = useRecoilState(healthTypeAtom)
  const [cuisineType, setCuisineType] = useRecoilState(cuisineTypeAtom)
  const setGeneratedMealPlan = useSetRecoilState(generatedMealPlanAtom)
  const [showLimitedRecipeAlert, setShowLimitedRecipeAlert] = useState(false)
  const setBoardData = useSetRecoilState(mealPrepBoardDataAtom)
  const navigate = useNavigate()

  const generateMealPlan = async () => {
    const url = new URL('https://api.edamam.com/api/recipes/v2')
    const app_id = 'ecfc8a8c'
    const app_key = '6a5410c5414e58656616eb9ca30ca4db'
    const params = {
      from: 1,
      to: 100,
      type: 'public',
      beta: true,
      random: true,
      app_id,
      app_key,
      ingr: maxNumIngredients,
      calories: maxCaloriesPerMeal,
      time:maxPrepTime,
      diet: dietType.length > 0 ? dietType : ['balanced'],
      health: healthType.length > 0 ? healthType : ['alcohol-free'],
      ...(cuisineType.length > 0 && { cuisineType }),
    }
    url.search = new URLSearchParams(params as any).toString()

    try {
      const res = await fetch(url.toString())
      const data = await res.json()

      const recipes = data.hits.map((data: any) => ({ ...data.recipe, id: uuidv4() }))
      console.log(recipes)
      if (recipes.length < 20) {
        setShowLimitedRecipeAlert(true)
        setTimeout(() => {
          setShowLimitedRecipeAlert(false)
        }, 10000)
        return
      }
      setGeneratedMealPlan(recipes)
      setBoardData(
        (prev) =>
          ({
            ...prev,
            columns: [
              { ...prev.columns[0] },
              { ...prev.columns[1], cards: recipes.slice(0, 3) },
              { ...prev.columns[2], cards: recipes.slice(3, 6) },
              { ...prev.columns[3], cards: recipes.slice(6, 9) },
              { ...prev.columns[4], cards: recipes.slice(9, 12) },
              { ...prev.columns[5], cards: recipes.slice(12, 15) },
              { ...prev.columns[6], cards: recipes.slice(15, 18) },
              { ...prev.columns[7], cards: recipes.slice(18, 22) },
            ],
          } as BoardDataInterface),
      )
      navigate('/mealplan')
    } catch (e) {
      console.error(e)
      return []
    }
  }

  return (
    <div>
      <NavBar />
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <h1>Weekly Meal Plan Generator</h1>

        <Grid item sx={{ width: 600, margin: 5 }}>
          <Box sx={{ marginBottom: 5 }}>Maximum number of ingredients per meal:</Box>
          <Slider
            aria-label="Small steps"
            value={maxNumIngredients}
            step={1}
            marks
            min={5}
            max={25}
            valueLabelDisplay="on"
            onChange={(e, val) => setMaxNumIngredients(val as number)}
          />
        </Grid>

        <Grid item sx={{ width: 600, marginBottom: 5 }}>
          <Box sx={{ marginBottom: 5 }}>Maximum Calories per meal:</Box>
          <Slider
            aria-label="max-calories"
            value={maxCaloriesPerMeal}
            step={50}
            marks
            min={100}
            max={3000}
            valueLabelDisplay="on"
            onChange={(e, val) => setMaxCaloriesPerMeal(val as number)}
          />
        </Grid>

        <Grid item sx={{ width: 600, marginBottom: 5 }}>
          <Box sx={{ marginBottom: 5 }}>Maximum Preparation Time (minutes) per meal:</Box>
          <Slider
            aria-label="max-time"
            value={maxPrepTime}
            step={15}
            marks
            min={30}
            max={240}
            valueLabelDisplay="on"
            onChange={(e, val) => setMaxPrepTime(val as number)}
          />
        </Grid>

        <Grid item sx={{ width: 600, marginBottom: 5 }}>
          <Box sx={{ marginBottom: 5 }}>Diet Type (Not required):</Box>
          <Autocomplete
            disablePortal
            id="diet-data"
            value={dietType}
            options={DietData}
            onChange={(e, val) => setDietType(val)}
            sx={{ width: 600 }}
            renderInput={(params) => <TextField {...params} />}
            multiple
          />
        </Grid>

        <Grid item sx={{ width: 600, marginBottom: 5 }}>
          <Box sx={{ marginBottom: 5 }}>Health Type (Not required):</Box>
          <Autocomplete
            disablePortal
            id="health-data"
            options={HealthData}
            value={healthType}
            onChange={(e, val) => setHealthType(val)}
            sx={{ width: 600 }}
            renderInput={(params) => <TextField {...params} />}
            multiple
          />
        </Grid>

        <Grid item sx={{ width: 600, marginBottom: 5 }}>
          <Box sx={{ marginBottom: 5 }}>Cuisine Type (Not required):</Box>
          <Autocomplete
            disablePortal
            id="cuisine-data"
            options={cuisineTypeData}
            value={cuisineType}
            onChange={(e, val) => setCuisineType(val)}
            sx={{ width: 600 }}
            renderInput={(params) => <TextField {...params} />}
            multiple
          />
        </Grid>

        {showLimitedRecipeAlert && (
          <Grid item>
            <Alert
              severity="error"
              style={{
                height: 100,
                margin: '10px 0px',
                width: 800,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Not enough recipes to create meal plan. Please change your parameters and try again.
            </Alert>
          </Grid>
        )}

        <Grid item>
          <Button variant="contained" size="large" onClick={generateMealPlan}>
            Generate Weekly Meal Plan
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default MealPrepGenerator
