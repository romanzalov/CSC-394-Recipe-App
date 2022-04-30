import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { FC, useState } from 'react'
import NavBar from './NavBar'
// import Board from 'react-trello'
import { Recipe } from '../Data/RecipeData'
import { CSSProperties } from '@emotion/serialize'
import { useRecoilState, useRecoilValue } from 'recoil'
import { mealPlanNameAtom, mealPrepBoardDataAtom, userAtom } from '../State/atoms'
import Board, { moveCard } from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { LoadingButton } from '@mui/lab'
import { v4 as uuidv4 } from 'uuid'
export interface LaneInterface {
  id: string
  title: string
  label?: string
  description?: string
  style?: CSSProperties
  cards: Partial<Recipe>[]
}

export interface BoardDataInterface {
  columns: LaneInterface[]
}

export const initalBoardData: BoardDataInterface = {
  columns: [
    {
      id: 'Additional Meals',
      title: 'Additional Meals',
      cards: [],
    },
    {
      id: 'Monday',
      title: 'Monday',
      cards: [],
    },
    {
      id: 'Tuesday',
      title: 'Tuesday',
      cards: [],
    },
    {
      id: 'Wednesday',
      title: 'Wednesday',
      cards: [],
    },
    {
      id: 'Thursday',
      title: 'Thursday',
      cards: [],
    },
    {
      id: 'Friday',
      title: 'Friday',
      cards: [],
    },
    {
      id: 'Saturday',
      title: 'Saturday',
      cards: [],
    },
    {
      id: 'Sunday',
      title: 'Sunday',
      cards: [],
    },
  ],
}

const CustomCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: 200,
        width: 250,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '5px 0px',
      }}
      key={recipe.id}
    >
      <div style={{ fontWeight: 'bold', marginBottom: 10, wordWrap: 'break-word' }}>{recipe.label}</div>
      <img src={recipe.image} alt="Recipe" style={{ height: 100 }} />
    </div>
  )
}

const MealPrep: FC = (props) => {
  const [boardData, setBoardData] = useRecoilState(mealPrepBoardDataAtom)
  const [savingData, setSavingData] = useState(false)
  const userLoginData = useRecoilValue(userAtom)
  const [mealPlanName, setMealPlaneName] = useRecoilState(mealPlanNameAtom)
  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(boardData, source, destination)
    setBoardData(updatedBoard)
  }

  const OnSaveMealPlanClick = async () => {
    setSavingData(true)
    const { user } = userLoginData
    const id = uuidv4()
    const docRef = doc(db, 'mealPlans', mealPlanName)
    await setDoc(docRef, {
      name: mealPlanName,
      id: id,
      createdAt: new Date().toISOString(),
      createdBy: user.uid,
      mealPlan: boardData,
    })
    console.log('added meal plan')
    setSavingData(false)
  }

  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Weekly Total (700% Recommended)',
  ]

  const calculateWeekdayTotals = (idx: number) => {
    //iterate over every card in each weekday, sum up every nutrition metric, add they key to the object and return the object
    return boardData.columns[idx].cards.reduce((accum: any, currRecipe: any) => {
      Object.keys(currRecipe.totalDaily).forEach((key) => {
        accum[key] = (accum[key] || 0) + parseInt(currRecipe.totalDaily[key]['quantity'])
      })
      return accum
    }, {})
  }

  const calculateWeeklyTotals = () => {
    let out = {}
    const days = [1, 2, 3, 4, 5, 6, 7]

    days.forEach((day) => {
      out[day] = calculateWeekdayTotals(day)
    })

    //calculate weekly totals
    out[8] = {}
    days.forEach((day) => {
      Object.keys(out[day]).forEach((key) => {
        out[8][key] = (out[8][key] || 0) + out[day][key]
      })
    })
    return out
  }
  const weeklyTotals = calculateWeeklyTotals()

  return (
    <>
      <NavBar />
      <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 10 }}>
        {Object.keys(userLoginData).length > 0 && (
          <Grid item mb={2} mt={2}>
            <TextField
              id="outlined-basic"
              label="Meal Plan Name"
              variant="outlined"
              value={mealPlanName}
              size="small"
              onChange={(e) => setMealPlaneName(e.target.value)}
            />
            <LoadingButton
              variant="outlined"
              loading={savingData}
              onClick={OnSaveMealPlanClick}
              sx={{ height: '40px', marginLeft: '16px' }}
            >
              Save Meal Plan
            </LoadingButton>
          </Grid>
        )}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 150 }}> % Daily Recommended</TableCell>
                  <TableCell align="left">Calcium</TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Carbs
                  </TableCell>
                  <TableCell align="left">Cholesterol</TableCell>
                  <TableCell align="left">Saturated</TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Fat
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Iron
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Fiber
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Folate{' '}
                  </TableCell>
                  <TableCell align="left">Potassium</TableCell>
                  <TableCell align="left">Magnesium</TableCell>
                  <TableCell align="left">Sodium</TableCell>
                  <TableCell align="left" sx={{ minWidth: 80 }}>
                    Niacin (B3)
                  </TableCell>
                  <TableCell align="left">Phosphorus</TableCell>
                  <TableCell align="left">Protein</TableCell>
                  <TableCell align="left" sx={{ minWidth: 100 }}>
                    Riboflavin (B2)
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 100 }}>
                    Thiamin (B1)
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Vitamin E
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Vitamin A
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Vitamin B6
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 80 }}>
                    Vitamin B12
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Vitamin C
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Vitamin D
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Vitamin K
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 70 }}>
                    Zinc
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weekDays.map((row, idx) => (
                  <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['CA']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['CHOCDF']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['ENERC_KCAL']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['FASAT']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['FAT']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['FE']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['FIBTG']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['FOLDFE']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['K']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['MG']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['NA']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['NIA']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['P']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['PROCNT']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['RIBF']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['THIA']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['TOCPHA']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['VITA_RAE']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['VITB6A']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['VITB12']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['VITC']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['VITD']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['VITK1']} %</TableCell>
                    <TableCell align="left">{weeklyTotals[idx + 1]['ZN']} %</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Board
            onCardDragEnd={handleCardMove}
            disableColumnDrag
            renderCard={(recipe: Recipe) => <CustomCard recipe={recipe} />}
          >
            {boardData}
          </Board>
        </Grid>
      </Grid>
    </>
  )
}

// ControlledBoard() {
//   // You need to control the state yourself.
//   const [controlledBoard, setBoard] = useState(board)

//   function handleCardMove(_card, source, destination) {
//     const updatedBoard = moveCard(controlledBoard, source, destination)
//     setBoard(updatedBoard)
//   }

//   return (
//     <Board
//       onCardDragEnd={handleCardMove}
//       disableColumnDrag
//       renderCard={({ content }, { removeCard, dragging }) => (
//         <div>
//           {content}
//           <button type="button" onClick={removeCard}>
//             Remove Card
//           </button>
//         </div>
//       )}
//     >
//       {controlledBoard}
//     </Board>
//   )
// }

export default MealPrep
