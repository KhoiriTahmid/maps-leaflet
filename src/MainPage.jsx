import React from 'react'
import UserDashboard from "./components/user/UserDashboard";
import Profile from "./components/user/UserProfile";
import { useState } from 'react';
import Burger from "./assets/Burger copy";
import { Outlet, useNavigate, NavLink } from "react-router-dom"
import { useEffect } from 'react';


export default function MainPage({user, type, data, setData}) {
      const [toggle, setToggle] = useState(false)
      const [page, setPage] = useState("classdata")
      const navigate = useNavigate()
      useEffect(()=>{
        if(!localStorage.getItem('authToken')){
          console.log("tokip", localStorage.getItem('authToken'))
          navigate("/404")
        }
      })
      if (!localStorage.getItem('authToken')) {
        return null; // atau bisa return loading spinner atau apapun yang Anda mau
      }
  return (
    <div className=''>
        {/* {page=="classdata"? <UserDashboard data={data} setData={setData} />:<Profile user={user} classData={data}/>} */}
        <Outlet data={data} user={user} setData={setData}/>
        <div className="fixed top-0 left-0 cursor-pointer m-10" onClick={()=>setToggle(!toggle)}><Burger/></div>
        <div className="w-fit h-screen fixed top-0 z-50"><Sidebar type={type} toggle={toggle} setPage={setPage} setToggle={setToggle}/></div>
    </div>
  )
}

const Sidebar = ({type, toggle, setPage, setToggle }) => {
  toggle&&console.log("nyala")
  function handle() {
    localStorage.clear()
  }
  return (
    <div className={`fixed  top-0 left-0 pt-20 h-full w-64 transform transition-transform bg-gray-800  ${toggle ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="text-white text-2xl fixed top-10 right-5 cursor-pointer" onClick={()=>setToggle(!toggle)}>✖</div>
      <nav className="mt-10">
        <NavLink to={type=='user'?'/user/dashboard':'/admin/dashboard'} className="block py-2.5 px-4 rounded transition duration-200 cursor-pointer hover:bg-gray-700 hover:text-white text-gray-400" href="#" onClick={() => { setPage('classdata'); setToggle(!toggle); }}>Dashboard</NavLink>
        <NavLink to={type=='user'?'/user/profile':'/admin/history'} className="block py-2.5 px-4 rounded transition duration-200 cursor-pointer hover:bg-gray-700 hover:text-white text-gray-400" href="#" onClick={() => { setPage(type=='user'?'profile':'history'); setToggle(!toggle); }}>{type=='user'?'Profile':'History'}</NavLink>
      </nav>
      <NavLink onClick={handle} to={"/"} className=" fixed bottom-16 block py-2.5 px-4 rounded transition duration-200 cursor-pointer hover:bg-gray-700 hover:text-white text-gray-400">Logout</NavLink>
    </div>
  );
};

