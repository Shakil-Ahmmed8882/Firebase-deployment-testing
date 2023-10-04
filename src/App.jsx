
import './App.css'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import app from './Firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';
const auth = getAuth(app);

function App() {

  const provider = new GoogleAuthProvider()
  const [user, setUser] = useState(null)

  const GoogleSignIn = () =>{
    signInWithPopup(auth, provider)
    .then(()=> console.log('Done signed in'))
    .catch(err => console.log(err.message))
  }


  useEffect(()=> {
    const unSubscribe = onAuthStateChanged(auth, currentUser =>{
      if(currentUser){
        setUser(currentUser)
      }


      return ()=> unSubscribe()
    })
  },[])

  console.log('user______', user)


  const logOut = () => {
    signOut(auth)
    .then(()=> console.log('singned out'))
    .catch(err => console.error(err))
  }

  return (
    <>
      <h1>Deployment Testing</h1>

      <button style={{backgroundColor:'green', color:'white'}} onClick={GoogleSignIn}>Sign in with google</button>
      
      <button style={{backgroundColor:'red', color:'white', display:'block',margin:'10px auto'}} onClick={logOut}>Sign out</button>

    </>
  )
}

export default App
