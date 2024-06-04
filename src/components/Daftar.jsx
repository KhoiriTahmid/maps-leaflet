import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import { addDataMhs, findDataByUnameOrNIM } from "../firestoreConnect";
import { useNavigate  } from "react-router-dom";
import Map from ".././Map";
import { NavLink } from 'react-router-dom';
import UniversalPopup from "./UniversalPopup";

export default function Daftar ({refreshing, setToggleAlert, setUser, typeTambah, updatePopup}) {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    NIM: '',
    nama: '',
    tglLahir: '',
    telp: '',
    alamat: '',
    kesukaan: '',
    userName:'',
    pass:''
  });
  const syarat = {NIM: '14 Digit angka',nama: 'hanya huruf dan spasi', tanggalLahir: '',telp: '11-12 digit angka',alamat: '', kesukaan: 'harus didahului huruf', username:'6-15 angka dan huruf, dan didahuluai huruf',password:'minimal 6 digit yang memuat huruf kapital, kecil dan angka '};
  const [toggleAlerto, seToggleAlerto] = useState("");

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


  let verif = {userName:false, pass:false, NIM: false, nama: false, tglLahir: false, telp: false, alamat: false, kesukaan: false };

  const verifInput = (type, e) => { //setiap input field harus pake ini onChange dan location map.on click
    let cek = false;
    switch (type) {
      case 'userName':
        cek = (!(/^[a-zA-Z][a-zA-Z0-9._]{5,14}$/.test(e.value))) ? false : true;
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
      verif[type] = false;
      if(type!="alamat")inputRefs[type].current.style.borderColor="red"
    } else {
      if (type !== "alamat") {
        if(type!="alamat")inputRefs[type].current.style.borderColor="green"
        setInput(prevInput => ({ ...prevInput, [type]: e.value }));
      } else {
        setInput(prevInput => ({ ...prevInput, [type]: e }));
      }
      verif[type] = true;
    }
    console.log(input);
  }

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

  async function handleSave() {// form update harus diisi
    if(!Object.values(input).includes("")) {
        const udahAda = [await findDataByUnameOrNIM(input.NIM), await findDataByUnameOrNIM(input.userName)]
        console.log("ini input : ", input)
        if(udahAda[0] || udahAda[1]){
            setToggleAlert? setToggleAlert("username atau nim telah digunakan"): seToggleAlerto("username atau nim telah digunakan")
            return;
        }
      if (typeTambah=="tambahUser") {
        navigate('/login')
        addDataMhs(input, input);
      }else{
        addDataMhs({nama:"admin", NIM:10000000000000}, input);
        updatePopup("tambah");
      }
      refreshing()
      setToggleAlert? setToggleAlert("berhasil menambahkan data!"): seToggleAlerto("berhasil menambahkan akun!")
    }else{
      setToggleAlert? setToggleAlert("lengkapi data terlebih dulu"):seToggleAlerto("lengkapi data terlebih dulu")
    }
  }

  

  return (
    <section class={` cursor-pointer w-screen h-screen my-auto flex justify-center items-center  bg-gradient-to-r from-[#1A1C4F] to-[#284BC3] ${typeTambah!="tambahUser"? "bg-opacity-50 backdrop-blur-lg":""} `}>
      <div ref={ref} class={`flex  gap-6 items-center ${typeTambah!="tambahUser"?"shadow w-fit rounded-2xl":""}  justify-center mx-auto`}>
      {toggleAlerto!="" && (
              <UniversalPopup value={toggleAlerto} type={toggleAlerto=="berhasil login"? "pojok":"center"} updatePopup={seToggleAlerto}/>
          )}
        <div class={`w-full bg-red rounded-lg ${typeTambah=="tambahUser"?"shadow":""} dark:border md:mt-0 xl:p-0 h-full bg-[#1A1C4F] dark:border-gray-700`}>
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white mt-10 mb-20">
                      {typeTambah=="tambahUser" ? "Daftarkan akunmu":"Tambah data"}
                  </h1>
                  <form class="space-y-4 md:space-y-6 pb-1" action="#">
                  {Object.keys(input).map((key,index) => {
                    const syaratCuy = Object.keys(syarat)
                    console.log(syaratCuy)
                    
                    return (key !== "alamat" && key !== "userName" && key !== "pass") && (
                        <div className="mb-4" key={key}>
                        <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{syaratCuy[index]}</label>
                        <input
                            ref={inputRefs[key]}
                            type={key=='tglLahir'?'date':key=='pass'?"password":"text"}
                            id={key}
                            placeholder={syarat[syaratCuy[index]]}
                            name={key}
                            min={key=="tglLahir"?'2000-01-01':''}
                            max={key=="tglLahir"?'2007-01-01':''}
                            onChange={(e) => verifInput(key, e.target)}
                            className={` w-[25rem] backdrop-blur-sm bg-white/15   border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                        </div>
                    )})}
                      
                  </form>
              </div>
          </div>
          <div class={`w-full bg-[#1A1C4F] rounded-lg ${typeTambah=="tambahUser"?"shadow":""} dark:border md:mt-0 xl:p-0  dark:border-gray-700`}>
              <div class="p-6 my-1.5 sm:p-8 ">
                  <form class="space-y-4 md:space-y-6 " action="#">
                      <div>
                          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                          <input ref={inputRefs.userName} placeholder={syarat.username} onChange={(e)=> verifInput("userName", e.target)} type="text" name="email" id="email" class="backdrop-blur-sm bg-white/15   border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input ref={inputRefs.pass} placeholder={syarat.password} onChange={(e)=> verifInput("pass", e.target)} type="text" name="password" id="password" class="backdrop-blur-sm bg-white/15   border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>

                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <Map  type={'tambah'} verifInput={verifInput} h={`20rem`} w={"75%"}/>
                      </div>

                      
                      
                      <div onClick={()=>handleSave()} class=" cursor-pointer hover:bg-opacity-70 text-white w-full  bg-[#2743AF]  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">{typeTambah=="tambahUser"? "Sign Up": "tambah data"}</div>
                      {typeTambah=="tambahUser" && (<p class="text-sm font-light text-gray-500 dark:text-gray-400">
                          already have an account? <NavLink to={'/login'} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</NavLink>
                      </p>)}
                  </form>
              </div>
          </div>
      </div>
    </section>
    
    
    
  ); 
};
