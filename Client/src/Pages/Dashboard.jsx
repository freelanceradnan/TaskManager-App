import { LayoutDashboard, Menu, PlusCircle, CircleDot, Loader, CheckCircle2, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate=useNavigate()
  const [userData,setUserData]=useState([])
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(true);
  const menuNames = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, link: "/" },
    { name: 'Create New', icon: <PlusCircle size={18} />, link: "/createTask" },
    { name: 'New Task', icon: <CircleDot size={18} />, link: "/tasks/new" },
    { name: 'In Progress', icon: <Loader size={18} />, link: "/tasks/progress" },
    { name: 'Completed', icon: <CheckCircle2 size={18} />, link: "/tasks/completed" },
    { name: 'Canceled', icon: <XCircle size={18} />, link: "/tasks/canceled" }
  ];
 const HandleLogout=async(e)=>{
  e.preventDefault()
  try {
    setTimeout(() => {
     localStorage.removeItem('token')
     toast.success('logout success!')
     navigate('/login')
    }, 1000);
  
  } catch (error) {
    toast.error('failed to logout')
  }
 }
 useEffect(()=>{
 const getData=async()=>{
  try {
  const token=localStorage.getItem('token')
  if(token){
    const url='http://localhost:3000/api/getProfile'
    const res=await fetch(url,{
      method:'GET',
      headers:{
        'authorization':token
      }
    })
    const result=await res.json()
    
    setUserData(result.message.data)
  }
 } catch (error) {
  toast.error('failed to get user data')
 }

 }
  getData()
 },[])
 
  return (
    <div className="min-h-screen bg-[#f9f8f8] flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center h-16 bg-white px-6 shadow-sm border-b border-gray-100 z-40 shrink-0">
        <div className="flex gap-4 items-center">
          <button 
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200" 
            onClick={() => setOpenMenu(!openMenu)}
          >
            <Menu size={20} />
          </button>
          <h2 className="text-xl font-bold tracking-tight text-[#363b64]">Task Manager</h2>
        </div>

       
        <div className="relative">
          <button 
            className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm focus:outline-none transition-all duration-200" 
            onClick={() => setOpenModal(!openModal)}
          >
            M
          </button>

          {openModal && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-gray-800 transition-all">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">User Menu</p>
                <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
              </div>
              <Link to="/Profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors" onClick={()=>setOpenModal(false)}>My Profile</Link>
             
              <hr className="my-1 border-gray-100" />
              <button className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors" onClick={HandleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* --- MAIN LAYOUT --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* --- SIDEBAR --- */}
        {openMenu && (
          <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4 h-[calc(100vh-64px)] shrink-0 shadow-sm transition-all duration-300 absolute left-0 md:static ">
            <div className="flex flex-col space-y-1.5">
              {menuNames.map((menu, index) => (
                <NavLink 
                  key={index}
                  onClick={()=>setOpenMenu(false)}
                  to={menu.link}
                  end={menu.link === "/"}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                    ${isActive 
                      ? "bg-blue-50 text-blue-600 shadow-sm  " 
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <span className="shrink-0">{menu.icon}</span>
                  <span>{menu.name}</span>
                </NavLink>
              ))}
            </div>
          </aside>
        )}

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 h-[calc(100vh-64px)]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;