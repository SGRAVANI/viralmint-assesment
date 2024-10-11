import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Components/Login'
import Blogs from "./Components/Blogs"
import { Route,Routes } from 'react-router-dom'
import SignUp from './Components/SignUp.jsx'
function App() {
 

  return (
    <>
    
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/signup" element={<SignUp/>} />
     </Routes>
    </>
  )
}

export default App
