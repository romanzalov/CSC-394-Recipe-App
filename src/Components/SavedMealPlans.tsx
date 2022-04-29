import { Box, Button, CircularProgress, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { db } from '../firebase'
import { mealPlanNameAtom, mealPrepBoardDataAtom, userAtom, userSavedMealPlansAtom } from '../State/atoms'
import NavBar from './NavBar'
import { collection, doc, getDocs, query, where, deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const SavedMealPlans = () => {
  const [savedUserMealPlans, setSavedUserMealPlans] = useRecoilState(userSavedMealPlansAtom)
  const setMealPlan = useSetRecoilState(mealPrepBoardDataAtom)
  const setMealPlanName = useSetRecoilState(mealPlanNameAtom)
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const onViewButtonClick = (mealPlan: any, name: string) => {
    console.log('mealPlan', mealPlan)
    setMealPlan(mealPlan)
    setMealPlanName(name)
    navigate('/mealplan')
  }

  const onDeleteMealPlanButton = async (id: string) => {
    const mealPlans = { ...savedUserMealPlans }
    const mealPlanId = mealPlans[id].id
    delete mealPlans[id]
    const docRef = doc(db, 'mealPlans', mealPlanId)
    await deleteDoc(docRef)
    setSavedUserMealPlans(mealPlans)
  }

  const getAllMealPlans = async () => {
    if (!user || !user.user || !user.user.uid) {
      setLoading(false)
      return
    }
    const citiesRef = collection(db, 'mealPlans')

    const q = query(citiesRef, where('createdBy', '==', user.user.uid))
    const querySnapshot = await getDocs(q)
    const allMealPlans = {}
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
      const docData = doc.data()
      allMealPlans[docData.name] = {
        mealPlan: docData.mealPlan,
        id: docData.id,
      }
    })
    setSavedUserMealPlans(allMealPlans)

    setLoading(false)
  }
  useEffect(() => {
    getAllMealPlans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <NavBar />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress size={64} />
        </Box>
      ) : (
        <ul>
          {Object.entries(savedUserMealPlans).map(([name, data]) => (
            <Paper
              sx={{
                width: '80%',
                height: 50,
                margin: '32px',
                backgroundColor: 'primary.light',
                display: 'flex',
                color: 'white',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
              }}
              elevation={5}
              key={name}
            >
              <Box sx={{ fontSize: 24 }}>{name}</Box>
              <Box>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ marginRight: 8 }}
                  onClick={() => onViewButtonClick(data.mealPlan, name)}
                >
                  View Meal Plan
                </Button>
                <Button variant="contained" color="error" onClick={() => onDeleteMealPlanButton(name)}>
                  Delete
                </Button>
              </Box>
            </Paper>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SavedMealPlans
