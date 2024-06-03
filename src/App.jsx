
import "./index.css";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Map from "./Map";

import Routing from "./Routing";
import { useState, useEffect } from "react";

import { readDataMhs, addDataMhs, updateDataMhs, deleteDataMhs, readDataHistory, addDataHistory } from "./firestoreConnect";
import MainPage from "./MainPage";
import UserProfile from "./components/user/UserProfile";
import UserDashboard from "./components/user/UserDashboard";
import AdminHistory from "./components/admin/AdminHistory";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/Login";
import HalamanDepan from "./components/HalamanDepan";
import { set } from "firebase/database";
import Daftar from "./components/Daftar";
import NotFound from "./NotFound";

// var u need : userState, 

export default function App() {
  const [user, setUser] = useState(() => {
    const authToken = localStorage.getItem('authToken');
    return authToken ? JSON.parse(authToken) : null;
  });// diisi pas login atau crate akun
  const [data, setData] = useState([])
  const [history, setHistory] = useState([])
  const [refresh, setRefresh] = useState(false)

  function refreshing() {
    setRefresh(!refresh)
  }

  useEffect(()=>{
    console.log(user)
  },[])
  
  
// buat kalo ngetik path dalem, gak bisa kebuka

// route path
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' >
            <Route index element={<HalamanDepan data={data} setData={setData} refresh={refresh}/>} />
            <Route path='/Login' element={<Login setUser={setUser}/>} />
            <Route path='/Daftar' element={<Daftar refreshing={refreshing} setUser={setUser} typeTambah={"tambahUser"}/>} />
            <Route path='/User' element={<MainPage user={user} type={'user'}/>} >
              <Route path='Dashboard' element={<UserDashboard refresh={refresh} refreshing={refreshing}  user={user} setUser={setUser} data={data} setData={setData} />} />
              <Route path='Profile' element={<UserProfile refreshing={refreshing} setUser={setUser} user={user}/>} />
            </Route>
            <Route path='/Admin' element={<MainPage user={user} type={'admin'}/>} >
              <Route path='Dashboard' element={<AdminDashboard setUser={setUser} refresh={refresh} refreshing={refreshing}  user={user} data={data} setData={setData} />} />
              <Route path='History' element={<AdminHistory refresh={refresh} refreshing={refreshing}  user={user} setUser={setUser} data={history} setData={setHistory}  />} />
            </Route>

            <Route path='*' element={<NotFound/>} />

          </Route>
        </Routes>
      </Router>
    </>
  )}

  const ProtectedRoute = ({ children }) => {
    
    return token ? children : <Navigate to="/404" />;
};








// //     <div className="mx-auto h-screen w-screen">

// //       {/* <div className="w-screen h-2/4 flex justify-center items-center">
// //         <div className="button rounded-full px-3 flex justify-center cursor-pointer py-1 bg-slate-800 text-white " onClick={addData}>add</div>
// //       </div>
// //       <div className="w-screen h-2/4 flex-col gap-2 flex justify-center items-center">
// //         <div className="button rounded-full px-3 flex justify-center cursor-pointer py-1 bg-slate-800 text-white " onClick={readData}>get</div>
// //         {data!=null && data.map(e=>{
// //           return <p className="text-xl text-black">{e.Nama}</p>
// //         })}
// //       </div> */}
//       <Login/>
// //       {/* <MainPage user={user} data={data} setData={setData}/> */}

// // {/* 
// //       <label>NIM</label>
// //       <input onChange={(e)=>verifInput("NIM",e.target)} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
// //       <label>nama</label>
// //       <input onChange={(e)=>verifInput("nama",e.target)} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
// //       <label>tglLahir</label>
// //       <input onChange={(e)=>verifInput("tglLahir",e.target)} type="date" id="start" name="trip-start"  min="2000-01-01" max="2005-12-31" />
// //       <label>telp</label>
// //       <input onChange={(e)=>verifInput("telp",e.target)} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
// //       <label>alamat</label>
// //       <Map verifInput={verifInput}/>
// //       <label>kesukaan</label>
// //       <input onChange={(e)=>verifInput("kesukaan",e.target)} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
// //       <div onClick={()=>!Object.values(verif).includes(false)? addDataMhs(user, input):console.log("isi yg bener", input)} className="button p-2 bg-red-500 text-white">add mhs</div>
// //       <div onClick={()=>readDataMhs(setData)} className="button p-2 bg-red-500 text-white">get mhs</div>
// //       <div onClick={()=>updateDataMhs(user, "11111111111119", input)} className="button p-2 bg-red-500 text-white">upadte mhs</div>
// //       <div onClick={()=>deleteDataMhs(user, "22222222222222")} className="button p-2 bg-red-500 text-white">delete mhs</div>
// //       <div onClick={()=>deleteDataMhs(user, "22222222222222")} className="button p-2 bg-red-500 text-white">add hst</div>
// //       <div onClick={()=>readDataHistory()} className="button p-2 bg-red-500 text-white">get hst</div>
// //       {data?.map(e=><p>ee</p>)} */}
// //     </div>
//   );
// }

