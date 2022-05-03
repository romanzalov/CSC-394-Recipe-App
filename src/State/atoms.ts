import { UserCredential } from 'firebase/auth'
import { atom } from 'recoil'
import { BoardDataInterface, initalBoardData } from '../Components/MealPlan'
import { exampleRecipe, Recipe } from '../Data/RecipeData'

export const allRecipesAtom = atom<Recipe[]>({
  key: 'allRecipes',
  default: [],
})

export const selectedRecipeAtom = atom<Recipe>({
  key: 'selectedRecipeAtom',
  default: exampleRecipe,
})
export const queryInputAtom = atom<string>({
  key: 'queryInput',
  default: '',
})

export const maxNumIngredientsAtom = atom<number>({
  key: 'maxNumIngredients',
  default: 25,
})

export const maxCaloriesPerMealAtom = atom<number>({
  key: 'maxCaloriesPerMeal',
  default: 3000,
})

export const maxPrepTimeAtom = atom<number>({
  key: 'maxPrepTimeAtom',
  default: 240,
})

export const dietTypeAtom = atom<string[]>({
  key: 'dietType',
  default: [],
})

export const healthTypeAtom = atom<string[]>({
  key: 'healthType',
  default: [],
})

export const cuisineTypeAtom = atom<string[]>({
  key: 'cuisineType',
  default: [],
})

export const generatedMealPlanAtom = atom<object[]>({
  key: 'generatedMealPlan',
  default: [],
})

export const homePageLoadedAtom = atom<boolean>({
  key: 'homePageLoaded',
  default: false,
})

export const mealPrepBoardDataAtom = atom<BoardDataInterface>({
  key: 'MealPrepBoardData',
  default: initalBoardData,
})

export const userAtom = atom<UserCredential>({
  key: 'loggedInUser',
  default: {} as UserCredential,
  dangerouslyAllowMutability: true,
})

export const userSavedMealPlansAtom = atom<object>({
  key: 'userSavedMealPlansAtom',
  default: {},
})

export const mealPlanNameAtom = atom<string>({
  key: 'mealPlanNameAtom',
  default: 'RENAME_ME',
})
