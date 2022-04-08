import { FC } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Recipe } from '../Data/RecipeData'
import { Button, CardActions } from '@mui/material'
import { mealPrepBoardDataAtom, selectedRecipeAtom } from '../State/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { BoardDataInterface } from './MealPlan'
import { useNavigate } from 'react-router-dom'

interface RecipeCardProps {
  recipe: Recipe
}
const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const [boardData, setBoardData] = useRecoilState(mealPrepBoardDataAtom)
  const navigate = useNavigate()

  const setSelectedRecipe = useSetRecoilState(selectedRecipeAtom)
  const viewFullRecipe = () => {
    setSelectedRecipe(recipe)

    navigate('/recipe')
  }
  const isRecipeAdded = (board: BoardDataInterface) => {
    let found = false

    board.columns.forEach((col) => {
      col.cards?.forEach((card) => {
        if (card.id === recipe.id) {
          found = true
        }
      })
    })
    return found
  }
  const recipeAlreadyAdded = isRecipeAdded(boardData)

  const addRecipeToMealPlan = () => {
    setBoardData((prev) => ({
      ...prev,
      columns: [
        { ...prev.columns[0], cards: [...prev.columns[0].cards, recipe] },
        { ...prev.columns[1] },
        { ...prev.columns[2] },
        { ...prev.columns[3] },
        { ...prev.columns[4] },
        { ...prev.columns[5] },
        { ...prev.columns[6] },
        { ...prev.columns[7] },
      ],
    }))
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" image={recipe.image} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.label}
        </Typography>
        <Typography variant="body2">
          <b>Cuisine Type:</b> {recipe.cuisineType.map((type) => type.toLocaleUpperCase())}
        </Typography>
        <Typography variant="body2">
          <b>Total Prep Time:</b> {recipe.totalTime} minutes
        </Typography>
        <Typography variant="body2">
          <b>Total Calories:</b> {recipe.calories.toFixed(0)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={viewFullRecipe}>
          View Full Recipe
        </Button>
        {!recipeAlreadyAdded && (
          <Button size="small" variant="outlined" onClick={addRecipeToMealPlan}>
            Add to Meal Plan
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default RecipeCard
