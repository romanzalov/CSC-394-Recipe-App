import { Routes, Route } from 'react-router-dom'
import Homepage from './Components/Homepage'
import MealPrep from './Components/MealPlan'
import MealPrepGenerator from './Components/MealPrepGenerator'
import RecipePage from './Components/RecipePage'
import SavedRecipes from './Components/SavedMealPlans'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/mealprepgenerator" element={<MealPrepGenerator />} />
        <Route path="/mealplan" element={<MealPrep />} />
        <Route path="/saved-meal-plans" element={<SavedRecipes />} />
      </Routes>
    </div>
  )
}

export default App
