import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import MapWithSide from ".././MapWithSide";

export default function PopupInfo ({refreshing, dataClicked, updatePopup, data, isPopup=null}) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputUname, setInputUname] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [routePopup, setRoutePopup] = useState(false)

  const navigate = useNavigate();

   const [input, setInput] = useState(dataClicked)


   const ref = useRef(null);

   useEffect(() => {
     const handleOutSideClick = (event) => {
       if (!ref.current?.contains(event.target)) {
         console.log("yok")
         updatePopup(false)
       }
     };
 
     window.addEventListener("mousedown", handleOutSideClick);
 
     return () => {
       window.removeEventListener("mousedown", handleOutSideClick);
     };
   }, [ref]);
 
  

  return (
        <section class={` cursor-pointer w-screen h-screen my-auto flex justify-center items-center backdrop-blur-sm bg-black/10 `}>
      <div class={`flex  gap-6 items-center  justify-center px-6 py-8 mx-auto lg:py-0 `}>
          {routePopup && (<div className='z-[99999] flex justify-center items-center w-screen h-screen fixed top-0 left-0'><MapWithSide setRoutePopup={setRoutePopup}  type={"showOnDash"}  h={`30rem`} w={"75%"} user={input}/></div>)}
        <div ref={ref} class={`w-full bg-red rounded-lg dark:border md:mt-0  xl:p-0 bg-[#1B2058] dark:border-gray-700`}>
              <div class="p-6 space-y-4 md:space-y-10 sm:p-8 ">
                  <div className="flex justify-between">
                    <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-4xl text-white mb-">
                        Info data
                    </h1>
                    <div onClick={()=>setRoutePopup(true)} className='hover:bg-opacity-70  hover:text-slate-300 px-4 py-2 h-10 text-center rounded bg-[#2743AF]  text-white cursor-pointer mr-2 transition-colors duration-300'>Rute</div>

                  </div>
                  <form class="space-y-4 md:space-y-6" action="#">
                  

                  <div className="mb-4" key="nama">
    <label htmlFor="nama" className="block mb-2 text-sm font-medium text-white">Nama:</label>
    <input
        type="text"
        id="nama"
        name="nama"
        readOnly={true}
        defaultValue={dataClicked["nama"]}
        className="w-[40rem] text-white border-gray-300 backdrop-blur-sm bg-white/15 text-whitesm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
</div>
<div className="mb-4" key="NIM">
    <label htmlFor="NIM" className="block mb-2 text-sm font-medium text-white dark:text-white">NIM:</label>
    <input
        type="text"
        id="NIM"
        name="NIM"
        readOnly={true}
        defaultValue={dataClicked["NIM"]}
        className="w-[40rem] border-gray-300 backdrop-blur-sm bg-white/15 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
</div>

<div className="mb-4" key="tglLahir">
    <label htmlFor="tglLahir" className="block mb-2 text-sm font-medium text-white dark:text-white">Tanggal Lahir:</label>
    <input
        type="text"
        id="tglLahir"
        name="tglLahir"
        readOnly={true}
        defaultValue={dataClicked["tglLahir"]}
        className="w-[40rem] border-gray-300 backdrop-blur-sm bg-white/15 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
</div>

<div className="mb-4" key="telp">
    <label htmlFor="telp" className="block mb-2 text-sm font-medium text-white dark:text-white">Nomor Telephone:</label>
    <input
        type="text"
        id="telp"
        name="telp"
        readOnly={true}
        defaultValue={dataClicked["telp"]}
        className="w-[40rem] border-gray-300 backdrop-blur-sm bg-white/15 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
</div>

<div className="mb-4" key="kesukaan">
    <label htmlFor="kesukaan" className="block mb-2 text-sm font-medium text-white dark:text-white">Kesukaan:</label>
    <input
        type="text"
        id="kesukaan"
        name="kesukaan"
        readOnly={true}
        defaultValue={dataClicked["kesukaan"]}
        className="w-[40rem] border-gray-300 backdrop-blur-sm bg-white/15 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
</div>

<div className="mb-4" key="alamat">
    <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-white dark:text-white">Alamat:</label>
    <input
        type="text"
        id="alamat"
        name="alamat"
        readOnly={true}
        defaultValue={dataClicked["alamat"].nama}
        className="w-[40rem] border-gray-300 backdrop-blur-sm bg-white/15 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
</div>


                      
                  </form>
                                </div>
          </div>
          
      </div>
    </section>
  ); 
};

