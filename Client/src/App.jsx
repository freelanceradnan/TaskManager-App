import { useState } from 'react'
import Login from './Pages/Login'
import { Navigate, Route, Routes } from 'react-router'
import Registration from './Pages/Registration'
import Dashboard from './Pages/Dashboard'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}>
      <Route path="/createTask" element={<h2>adnan</h2>}/>
      <Route path="/tasks/new" element={<h2>adnan</h2>}/>
      <Route path="/tasks/progress" element={<h2>adnan</h2>}/>
      <Route path="/tasks/completed" element={<h2>adnan</h2>}/>
      <Route path="/tasks/canceled" element={<h2>adnan</h2>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Registration/>}/>
    </Routes>
  )
}

export default App
