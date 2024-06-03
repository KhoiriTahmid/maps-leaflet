import React, { useState } from 'react';
import Map from '../Map';
import { updateDataMhs, addDataMhs } from "../firestoreConnect";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import MapWithSide from '../MapWithSide';

//type: tambah (null), updateAdmin (dari clicked), updateUser (dari user)

export default function Form({setPopup, user, setUser, type, refreshing,elementList=null}) {
  const [input, setInput] = useState(user)
  
  const [alamat, setAlamat] = useState('');
  const [editable, setEditable] = useState(false);

  useEffect(()=>{
    console.log("user: ",user)
  },[])

  let verif = { NIM: false, nama: false, tglLahir: false, telp: false, alamat: false, kesukaan: false, userName: false, pass:'' };

  function handleSave() {// form update harus diisi
    if(!Object.values(input).includes("")) {
      updateDataMhs(user, user.NIM, input)
      setUser(input)
      refreshing()
      setEditable(!editable)
    }else{
      console.log("begini",input)
      alert('gagal update')
    }
  }

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
        setAlamat(e);
        setInput(prevInput => ({ ...prevInput, [type]: e }));
      }
      verif[type] = true;
    }
    console.log(input);
  }

  return (
    <div className={` bg-gray-900 p-6 rounded-lg shadow-lg `}>
      {Object.keys(input).map(key => (key !== "alamat") && (
        <div className="mb-4" key={key}>
          <label htmlFor={key} className="block text-yellow-500 mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <input
            readOnly={!editable}
            type={key=='tglLahir'?'date':"text"}
            id={key}
            name={key}
            min={key=="tglLahir"?'2000-01-01':''}
            max={key=="tglLahir"?'2007-01-01':''}
            defaultValue={user[key]}
            onChange={(e) => verifInput(key, e.target)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="block text-yellow-500 mb-2">Alamat:</label>
          {editable? <Map type={type} verifInput={verifInput} h={`30rem`} w={"75%"} user={user}/>:<MapWithSide  type={type} verifInput={verifInput} h={`30rem`} w={"75%"} user={user}/>}
      </div>
      <div className='flex'>
        <div className={` bg-green-500 hover:bg-green-700 cursor-pointer w-fit text-white font-bold py-2 px-4 rounded ml-2 `} onClick={()=>setEditable(!editable)}>Edit</div>
        <div className={`${editable?"":" hidden"} bg-blue-500 hover:bg-blue-700 w-fit text-white font-bold py-2 px-4 rounded ml-2 `} onClick={handleSave}>Save</div>
      </div>
    </div>
  );
}
