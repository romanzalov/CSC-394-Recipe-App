import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useRecoilState } from 'recoil'
import { userAtom } from '../State/atoms'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const NavBar = () => {
  const [user, setUser] = useRecoilState(userAtom)
  const onLoginButtonClick = async () => {
    const provider = new GoogleAuthProvider()
    const data: UserCredential = await signInWithPopup(auth, provider)
    console.log(data)
    setUser(data)
    const docRef = doc(db, 'Users', data.user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      //grab meal plans and save them to local state
      // setUserMealPlans(docSnap.data().mealPlans)
      console.log('Document data:', docSnap.data())
    } else {
      //create user
      setDoc(docRef, {
        name: data.user.displayName,
        email: data.user.email,
      })
    }
  }

  const onLogOutButtonClick = async () => {
    await auth.signOut()
    setUser({} as UserCredential)
  }
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
              {Object.keys(user).length > 0 && (
                <Button color="inherit">
                  <Link to={'/saved-meal-plans'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    Saved Meal Plan (s)
                  </Link>
                </Button>
              )}
              <Button color="inherit">
                <Link to={'/mealplan'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Meal Plan
                </Link>
              </Button>
            </Grid>
            <Grid item>
              {Object.keys(user).length === 0 ? (
                <Button color="inherit" onClick={() => onLoginButtonClick()}>
                  Login
                </Button>
              ) : (
                <Button color="inherit" onClick={() => onLogOutButtonClick()}>
                  Log Out
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
