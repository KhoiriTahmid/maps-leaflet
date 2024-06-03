import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HalamanDepan() {
  
  return (
    <div className='flex flex-col gap-10 w-screen h-screen justify-center items-center'>
      <div className="w-[70%] h-[60%] bg-slate-500">table</div>
      <div className="cta flex gap-10">
        <NavLink to={'/login'} className="login flex justify-center items-center rounded-xl ring-1 ring-black cursor-pointer py-1 px-2 hover:ring-slate-700">Login</NavLink>
        <NavLink to={'/daftar'} className="login flex justify-center items-center rounded-xl ring-1 ring-black cursor-pointer py-1 px-2 hover:ring-slate-700">Daftar</NavLink>
      </div>
    </div>
  )
}
