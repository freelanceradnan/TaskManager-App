import { Children, useState } from 'react'
import Login from './Pages/Login'
import { Navigate, Route, Routes } from 'react-router'
import Registration from './Pages/Registration'
import Dashboard from './Pages/Dashboard'
import RefreshToken from './Components/RefreshToken'
import DashboardStatistics from './Pages/DashboardStatistics'
import TaskCreate from './Pages/TaskCreate'
import NewTasks from './Pages/NewTasks'
import ProgressTask from './Pages/ProgressTasks'
import CompletedTask from './Pages/CompletedTasks'
import CancelTask from './Pages/CancelTasks'
import Profile from './Pages/Profile'
import Sentotp from './Pages/Sentotp'
import Otpverify from './Pages/Otpverify'
import ChangePassword from './Pages/ChangePassword'

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
      <Route path="/tasks/new" element={<NewTasks/>}/>
      <Route path="/tasks/progress" element={<ProgressTask/>}/>
      <Route path="/tasks/completed" element={<CompletedTask/>}/>
      <Route path="/tasks/canceled" element={<CancelTask/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sentOtp" element={<Sentotp/>}/>
      <Route path="/otpverify" element={<Otpverify/>}/>
      <Route path="/changepassword" element={<ChangePassword/>}/>
      <Route path="/signup" element={<Registration/>}/>
    </Routes>
   </>
  )
}

export default App
