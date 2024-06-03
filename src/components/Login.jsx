import React, { useState } from 'react';
import '../App.css';
import { addDataHistory, findDataByParam, findDataByUnameOrNIM } from "../firestoreConnect";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

const LoginPage = ({setUser}) => {
  const [showPassword, setShowPassword] = useState(false);
  // let input = { NIM: {value: "",pass: false}, nama: {value: "",pass: false}}
  const [inputUname, setInputUname] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [toggleForgot, setToggleForgot] = useState(false)

  const navigate = useNavigate();


  const verifInput = async (type) => { // type == login || lupaPass
    console.log(inputUname)
    if (inputPass == "admin123" && inputUname=="admin123") {
      navigate('/admin/dashboard')
      localStorage.setItem('authToken', JSON.stringify({nama:'admin', NIM:"000000000000000"}));//
      setUser({nama:'admin', NIM:"000000000000000"})
      addDataHistory({nama:'admin', NIM:"000000000000000"}, "Login")
      return;
    }
    
    //cari data based on uname / nim
    const data = await findDataByUnameOrNIM(inputUname)
    if(data && type=="login" && inputPass==data.pass){
      navigate('/user/profile')
      localStorage.setItem('authToken', JSON.stringify(data));//
      setUser(data)
      addDataHistory(data, "Login")
      return;
    }
    if(data && type=="lupaPass"){
      alert("paaword anda: ",data.pass)
      return;
    }
   alert("masukan salah!")

  }

  function handleForgot() {
    setToggleForgot(!toggleForgot)
  }

  async function handleGetPass() {
    const data = await findDataByUnameOrNIM(inputUname);
    alert("password : ",data.pass)
    setToggleForgot(false)
  }

  

  return (
    <section class="bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {toggleForgot && (<div className="absolute z-40 w-full h-[30rem] bg-white flex  items-center rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8  w-full' >
                        <label for="username" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Masukkan username atau NIM</label>
                        <input onChange={(e)=>setInputUname(e.target.value)} type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="khokoa" required=""/>
                        <div onClick={handleGetPass} className="dark:text-gray-200 dark:hover:text-gray-400 ring-2 ring-gray-200 cursor-pointer hover:ring-gray-600 text-gray-900 w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">dapatkan password</div>
                    </div>
          </div>)}
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                  </h1>
                  <form class="space-y-4 md:space-y-6" action="#">
                      <div>
                          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username or NIM</label>
                          <input onChange={(e)=>setInputUname(e.target.value)} type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="khokoa" required=""/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input onChange={(e)=>setInputPass(e.target.value)} type={showPassword? "text":"password"} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>
                      <div class="flex items-center justify-between">
                          <div class="flex items-start">
                              <div class="flex items-center h-5">
                                <input onClick={()=>setShowPassword(!showPassword)} id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                              </div>
                              <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500 dark:text-gray-300">Show password</label>
                              </div>
                          </div>
                          <p onClick={handleForgot} class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</p>
                      </div>
                      <div onClick={()=>verifInput("login")} class="dark:text-gray-200 dark:hover:text-gray-400 ring-2 ring-gray-200 cursor-pointer hover:ring-gray-600 text-gray-900 w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</div>
                      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                          Belum punya akun? <NavLink to={"/daftar"} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
    
    
    
  ); 
};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    {/* <div className="flex h-screen">
      <div className="w-1/2 bg-green-900 flex flex-col justify-center items-center p-5 text-center">
        <div className="bg-white w-24 h-8 mb-5"></div>
        <div className="bg-white mt-12 ml-16 w-8 h-24"></div>
        <p className="text-7xl text-yellow-400 mt-5">Selamat Datang</p>
      </div>
      <div className="w-1/2 bg-green-900 flex justify-center items-center p-5">
        <form className="w-80">
          <div className="relative mb-8">
            <label htmlFor="username" className=" text-white pointer-events-none transition-all duration-200">Nama Lengkap</label>
            <input onChange={(e)=>verifInput("nama",e.target)} type="text" id="username" name="username" required className="w-full bg-green-900 text-white py-2 border-b-2 border-gray-700 outline-none"/>
          </div>
          <div className="relative mb-8">
            <label htmlFor="password" className=" text-white pointer-events-none transition-all duration-200">NIM</label>
            <input onChange={(e)=>verifInput("NIM",e.target)} type={showPassword ? 'text' : 'password'} id="password" name="password" required className="w-full bg-green-900 text-white py-2 border-b-2 border-gray-700 outline-none"/>
            <div className=" flex items-center mt-2">
              <input type="checkbox" id="showPassword" onClick={togglePasswordVisibility} className="mr-2 border-none ring-0" />
              <label htmlFor="showPassword" className="text-white"> Show Password </label>
            </div>
          </div>
          <div onClick={
            //cek admin bukan
            //cek apakah udah regist ato blom? klo udah ke maindash klo belom ke profil
            //setUser
            (e)=>{cekUser()}
          } className="w-full text-center py-2 bg-yellow-400 text-white text-2xl cursor-pointer rounded-full hover:bg-yellow-500 transition-colors duration-300">LOGIN</div>
        </form>
      </div>
    </div>*/}


export default LoginPage;
