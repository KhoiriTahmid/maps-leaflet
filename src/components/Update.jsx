import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import { addDataMhs, updateDataMhs, findDataByUnameOrNIM, readDataMhs } from "../firestoreConnect";
import { useNavigate } from "react-router-dom";
import Map from ".././Map";
import MapWithSide from ".././MapWithSide";
import { update } from 'firebase/database';

export default function Update ({refreshing, setToggleAlert, dataClicked, typeTambah, updatePopup, data, isPopup=null}) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputUname, setInputUname] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [routePopup, setRoutePopup] = useState(false)

  const navigate = useNavigate();

   const [input, setInput] = useState(dataClicked)

   const inputRefs = {
    userName: useRef(null),
    pass: useRef(null),
    NIM:useRef(null),
    nama:useRef(null),
    tglLahir:useRef(null),
    alamat:useRef(null),
    telp:useRef(null),
    kesukaan:useRef(null),
  };


  const [okeToSave, setOkeToSave] = useState(false);


  let verif = {userName:false, pass:false, NIM: false, nama: false, tglLahir: false, telp: false, alamat: false, kesukaan: false };

  const verifInput = (type, e) => { //setiap input field harus pake ini onChange dan location map.on click
    let cek = false;
    switch (type) {
      case 'userName':
        cek = (!(/^[a-zA-Z][a-zA-Z0-9._]{2,14}$/.test(e.value))) ? false : true;
        break;
      case 'pass':
        cek = (!( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.value))) ? false : true;
        break;
      case 'NIM':
        cek = (!(/^\d+$/.test(e.value)) || e.value.length !== 14) ? false : true;
        break;
      case 'alamat':
        cek = true;
        break;
      case 'nama':
        cek = (!(/^[A-Za-z\s]+$/.test(e.value))) ? false : true;
        break;
      case 'tglLahir':
        cek = (e.value.slice(0, 4) <= "2000" || e.value.slice(0, 4) >= "2007") ? false : true;
        break;
      case 'telp':
        cek = (!(/^\d+$/.test(e.value)) || !(e.value.length > 10 && e.value.length < 13)) ? false : true;
        break;
      case 'kesukaan':
        cek = (!(/[a-zA-Z]/.test(e.value))) ? false : true;
        break;
      default:
        console.log('Tipe informasi tidak dikenal.');
    }

    if (!cek) {
      if(type!="alamat")inputRefs[type].current.style.borderColor="red"
      verif[type] = false;
    } else {
      if (type !== "alamat") {
        inputRefs[type].current.style.borderColor="green"
        setInput(prevInput => ({ ...prevInput, [type]: e.value }));
      } else {
        setInput(prevInput => ({ ...prevInput, [type]: e }));
      }
      verif[type] = true;
    }
  }

  async function handleSave() {// form update harus diisi
    if(!Object.values(input).includes("")) {
        const dataFilter = data.filter(e=>e.NIM==input.NIM || e.userName==input.userName);
        if(dataFilter.length>1 || (dataFilter != dataClicked && dataFilter>0)){
            setToggleAlert("username atau nim telah digunakan")
            return;
        }else{
            await updateDataMhs({nama:"admin", NIM:"00000000000000"}, dataClicked.NIM, input);
            updatePopup("update")
            setToggleAlert("data berhasil diupdate")
        }
        refreshing()
    }else{
      setToggleAlert("lengkapi data terlebih dulu")
    }
  }

  const ref = useRef(null);

   useEffect(() => {
     const handleOutSideClick = (event) => {
       if (!ref.current?.contains(event.target)) {
         console.log("yok")
         updatePopup("update")
       }
     };
 
     window.addEventListener("mousedown", handleOutSideClick);
 
     return () => {
       window.removeEventListener("mousedown", handleOutSideClick);
     };
   }, [ref]);

  

  return (
    <section class={` cursor-pointer w-screen h-screen my-auto flex justify-center items-center  ${typeTambah!="tambahUser"? "bg-opacity-50 backdrop-blur-lg":""} bg-gradient-to-r from-[#1A1C4F] to-[#284BC3]`}>
      <div ref={ref} class={`flex  gap-6 items-center ${typeTambah!="tambahUser"?"shadow  w-fit rounded-2xl":""} justify-center mx-auto lg:py-0`}>
          {routePopup && (<div className='z-[99999] flex justify-center items-center w-screen h-screen fixed top-0 left-0'><MapWithSide setRoutePopup={setRoutePopup}  type={"showOnDash"}  h={`30rem`} w={"75%"} user={input}/></div>)}

        <div class={`w-full bg-red rounded-lg ${typeTambah=="tambahUser"?"shadow":""}  md:mt-0 xl:p-0 bg-[#1A1C4F]`}>
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white mb-10 mt-10">
                      Update data
                  </h1>
                  <form class="space-y-4 py-5" action="#">
                  {Object.keys(input).map(key => (key !== "alamat" && key !== "userName" && key !== "pass") && (
                        <div className="mb-4" key={key}>
                        <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input
                            type={key=='tglLahir'?'date':key=='pass'?"password":"text"}
                            ref={inputRefs[key]}
                            id={key}
                            name={key}
                            contentEditable={!isPopup}
                            defaultValue={dataClicked[key]}
                            min={key=="tglLahir"?'2000-01-01':''}
                            max={key=="tglLahir"?'2007-01-01':''}
                            onChange={(e) => verifInput(key, e.target)}
                            className="w-[25rem] pl-4  backdrop-blur-sm bg-white/15  rounded-lg text-white sm:text-sm focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        </div>
                    ))}
                      
                  </form>
              </div>
          </div>
          <div class={`w-full bg-red rounded-lg ${typeTambah=="tambahUser"?"shadow":""} md:mt-0 xl:p-0 bg-[#1A1C4F]`}>
              <div class="px-7 space-y-4  py-[2.10rem] ">
                  <form class="space-y-4 md:space-y-6 " action="#">
                      <div>
                          <label for="username" class="block mb-2 text-sm font-medium  b text-white">username</label>
                          <input ref={inputRefs.userName} defaultValue={dataClicked.userName} onChange={(e)=> verifInput("userName", e.target)} type="text" name="email" id="email" class="border border-gray-300 backdrop-blur-sm bg-white/15 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-white  ">Password</label>
                          <input ref={inputRefs.pass} defaultValue={dataClicked.pass} onChange={(e)=> verifInput("pass", e.target)} type="text" name="password" id="password" class="border border-gray-300 backdrop-blur-sm bg-white/15 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>

                      <Map setRoutePopup={setRoutePopup} data={dataClicked} type={'tambah'} verifInput={verifInput} h={`20rem`} w={"75%"}/>                     
                      <div onClick={()=>handleSave()} class="  cursor-pointer hover:ring-gray-600 text-white hover:bg-opacity-70 w-full  bg-[#2743AF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700 dark:focus:ring-primary-800">update data</div>
                      
                  </form>
              </div>
          </div>
      </div>
    </section>
    
    
    
  ); 
};
