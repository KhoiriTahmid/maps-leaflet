import React,{useState} from 'react';
import { addDataHistory } from "../firestoreConnect";
import Map from "../Map";


export default function PopupForm ({user, togglePopup }){
    const handleSubmit = (e) => {
        e.preventDefault();
        addDataHistory(user, input)
        // Handle form submission
    };
  const [editable, setEditable] = useState(true);

  function handleSave() {
    // updateDataMhs()
    // setUser()
    setEditable(false)
  }

  let verif = { NIM: false, nama: false, tglLahir: false, telp: false, alamat: false, kesukaan: false };
  let input = { NIM: '', nama: '', tglLahir: '', telp: '', alamat: '', kesukaan: '' };
  


  const verifInput = (type, e) => { //setiap inpu field harus pake ini onChange dan location map.on clik
    let cek = false;
    switch (type) {
      case 'NIM':
        cek = (!(/^\d+$/.test(e.value)) || e.value.length != 14)? false: true;
        break;
      case 'alamat':
        cek = true;
        break;
      case 'nama':
        cek = (!(/^[A-Za-z\s]+$/.test(e.value)))? false: true;
        break;
      case 'tglLahir':
        cek = (e.value.slice(0,4)<="2000" || e.value.slice(0,4)>="2007")? false: true;
        break;
      case 'telp':
        cek = (!(/^\d+$/.test(e.value)) || !(e.value.length > 10 && e.value.length < 13) )? false: true;
        break;
      case 'kesukaan':
        cek = (!(/[a-zA-Z]/.test(e.value)))? false: true;
        break;
      default:
        console.log('Tipe informasi tidak dikenal.');
    }

    if(!cek){
      e.style.color ="red";
      verif[type]=false;
    }else{
      if(type!="alamat"){
        e.style.color ="green"
        input[type]=e.value;
      }else{
        input[type]=e;
        console.log(type,input[type],e)
      }
      verif[type]=true;
      if(type=="alamat")console.log('beenr?',verif[type],"alamat",type,input[type],e)
    }

  }

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 overflow-scroll">
      <div className="bg-gray-900 p-6 rounded-lg w-11/12 max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-yellow-500" id="popup-title">Add Class Data</h2>
        {Object.keys(input).map(key => (key != "alamat") && (
          <div className="mb-4" key={key}>
            <label htmlFor={key} className="block text-yellow-500 mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type="text"
              id={key}
              name={key}
              disabled={!editable}
              onChange={(e)=>verifInput(key, e.target)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
            />
          </div>
        ))}
        <div className="mb-4" >
            <label  className="block text-yellow-500 mb-2">Alamat:</label>
            <div className="flex rounded-lg justify-center overflow-clip">
                <Map type={'form'} verifInput={verifInput} h={"20rem"} w={"100%"} editable={editable}/>
            </div>
        </div>
        <div className="flex space-x-4">
            <button onClick={handleSubmit} type="submit" className="bg-green-600 p-2 rounded text-white flex-grow">Save</button>
            <button type="button" className="bg-red-600 p-2 rounded text-white flex-grow" onClick={togglePopup}>Cancel</button>
          </div>
      </div>
      </div>
  )
}
