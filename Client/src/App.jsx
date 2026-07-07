import { Children, useState } from 'react'
import Login from './Pages/Login'
import { Navigate, Route, Routes } from 'react-router'
import Registration from './Pages/Registration'
import Dashboard from './Pages/Dashboard'
import RefreshToken from './Components/RefreshToken'
import DashboardStatistics from './Pages/DashboardStatistics'
import TaskCreate from './Pages/TaskCreate'

function App() {
const [isAuthenticate, setIsAuthenticate] = useState(() => {
    return !!localStorage.getItem('token');
  });
const PrivateRoute = ({ children }) => {
    return isAuthenticate ? children : <Navigate to="/login" replace />;
  };
  return (
   <>
   <RefreshToken setIsAuthenticate={setIsAuthenticate}/>
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      }>
        <Route path="/" element={<DashboardStatistics/>}/>
      <Route path="/createTask" element={<TaskCreate/>}/>
      <Route path="/tasks/new" element={<h2>adnan</h2>}/>
      <Route path="/tasks/progress" element={<h2>adnan</h2>}/>
      <Route path="/tasks/completed" element={<h2>adnan</h2>}/>
      <Route path="/tasks/canceled" element={<h2>adnan</h2>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Registration/>}/>
    </Routes>
   </>
  )
}

export default App
