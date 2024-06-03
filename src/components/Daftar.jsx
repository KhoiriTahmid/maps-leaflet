import React, { useState } from 'react';
import '../App.css';
import { addDataMhs, findDataByUnameOrNIM } from "../firestoreConnect";
import { useNavigate } from "react-router-dom";
import Map from ".././Map";
import { NavLink } from 'react-router-dom';

export default function Daftar ({refreshing, setUser, typeTambah, updatePopup}) {
  const [showPassword, setShowPassword] = useState(false);
  // let input = { NIM: {value: "",pass: false}, nama: {value: "",pass: false}}
  const [inputUname, setInputUname] = useState('')
  const [inputPass, setInputPass] = useState('')

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
      e.style.color = "red";
      verif[type] = false;
    } else {
      if (type !== "alamat") {
        e.style.color = "green";
        setInput(prevInput => ({ ...prevInput, [type]: e.value }));
      } else {
        setInput(prevInput => ({ ...prevInput, [type]: e }));
      }
      verif[type] = true;
    }
    console.log(input);
  }

  async function handleSave() {// form update harus diisi
    if(!Object.values(input).includes("")) {
        const udahAda = [await findDataByUnameOrNIM(input.NIM), await findDataByUnameOrNIM(input.userName)]
        console.log("ini input : ", input)
        if(udahAda[0] || udahAda[1]){
            alert("username atau nim telah digunakan")
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
    }else{
      alert("lengkapi data terlebih dulu")
    }
  }

  

  return (
    <section class={`w-screen h-screen my-auto flex justify-center items-center bg-white ${typeTambah!="tambahUser"? "bg-opacity-50 backdrop-blur-lg":""} dark:bg-gray-900`}>
      <div class={`flex  gap-6 items-center ${typeTambah!="tambahUser"?"shadow bg-white w-fit rounded-2xl":""} justify-center px-6 py-8 mx-auto lg:py-0`}>
        <div class={`w-full bg-red rounded-lg ${typeTambah=="tambahUser"?"shadow":""} dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white mb-20">
                      {typeTambah=="tambahUser" ? "Sign up your account":"Tambah data"}
                  </h1>
                  <form class="space-y-4 md:space-y-6" action="#">
                  {Object.keys(input).map(key => (key !== "alamat" && key !== "userName" && key !== "pass") && (
                        <div className="mb-4" key={key}>
                        <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input
                            type={key=='tglLahir'?'date':key=='pass'?"password":"text"}
                            id={key}
                            name={key}
                            min={key=="tglLahir"?'2000-01-01':''}
                            max={key=="tglLahir"?'2007-01-01':''}
                            onChange={(e) => verifInput(key, e.target)}
                            className="w-[20rem] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        </div>
                    ))}
                      
                  </form>
              </div>
          </div>
          <div class={`w-full bg-red rounded-lg ${typeTambah=="tambahUser"?"shadow":""} dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                  <form class="space-y-4 md:space-y-6 " action="#">
                      <div>
                          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                          <input onChange={(e)=> verifInput("userName", e.target)} type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input onChange={(e)=> verifInput("pass", e.target)} type="text" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>

                      <Map  type={'tambah'} verifInput={verifInput} h={`20rem`} w={"75%"}/>
                      
                      <div onClick={()=>handleSave()} class=" ring-2 ring-gray-200 cursor-pointer hover:ring-gray-600 text-gray-900 w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{typeTambah=="tambahUser"? "Sign Up": "tambah data"}</div>
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
