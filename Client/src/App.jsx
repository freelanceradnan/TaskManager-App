import { useState } from 'react'
import Login from './Pages/Login'
import { Navigate, Route, Routes } from 'react-router'
import Registration from './Pages/Registration'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/registration" element={<Registration/>}/>
    </Routes>
  )
}

export default App
