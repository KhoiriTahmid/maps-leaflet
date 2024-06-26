import React, { useState } from 'react';
import { readDataMhs, deleteDataMhs } from "../../firestoreConnect";
import { useEffect } from 'react';
import Form from ".././Form";
import { popup } from 'leaflet';
import Daftar from '../Daftar';
import Update from '../Update';
import '../../App.css'
import PopupInfo from "../PopupInfo";
import UniversalPopup from "../UniversalPopup";

const AdminDashboard = ({refresh, setUser, refreshing, user, data, setData}) => {
  const [search, setSearch] = useState('');
  const [popupTambah, setPopupTambah] = useState(false);
  const [popupUpdate, setPopupUpdate] = useState(false);
  const [barisClicked, setBarisClicked] = useState(false);
  const [route, setRoute] = useState(false) //munculin route

  function updatePopup(type){
    type!="update"? type!="route"?setPopupTambah(!popupTambah):setRoute(!route):setPopupUpdate(!popupUpdate);
  }

  const [filteredData,setFilteredData] = useState([]);
  const [clickedData,setClickedData] = useState();
  const [toggleAlert, setToggleAlert] = useState('') // '', 'pass'

  function filterData(value) {
    setFilteredData(data.filter(data => data.nama.toLowerCase().includes(value.toLowerCase()) || data.NIM.toLowerCase().includes(value.toLowerCase())));
    console.log(filteredData)
  }

   function remove(event, data) {
    async function call() {
      await deleteDataMhs(user, data.NIM)
    }
    event.stopPropagation();
    call()
    refreshing()
    setToggleAlert("data berhasil dihapus!")
  }



  useEffect(() => {
    const fetchData = async () => {
      await readDataMhs(setData);
    };
    
    fetchData();
  }, [refresh]);
  
 

  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(data) 
    }
  }, [data,route]);

  console.log(data)

  return (
    <div className="bg-gradient-to-r from-[#1A1C4F] to-[#284BC3] h-screen w-screen flex justify-center">
      <section className={`section p-10 pt-12 w-[90%] ${route?"z-[9999]":""}`}>{/* kalo kepanjangan, edit aja */}
      {toggleAlert!="" && (
              <UniversalPopup value={toggleAlert} type={toggleAlert=="berhasil login"? "pojok":"center"} updatePopup={setToggleAlert}/>
          )}
        <h2 className="text-5xl font-bold text-white text-center mb-8">Data Kelas</h2>
        <div className="w-full h-1 bg-white mb-5"></div>
        <div className="mb-4 flex gap-4">
          <input 
            type="text" 
            id="search-input" 
            className="w-full p-2 pl-4  backdrop-blur-sm bg-white/15  rounded-lg text-white"
            placeholder="Cari Nama atau NIM..."
            value={search}
            onChange={(e) => {setSearch(e.target.value); filterData(e.target.value) }}
          />
          <div onClick={()=>updatePopup("tambah")} className='px-4 py-2 h-10 w-fit text-center rounded bg-[#2743AF] ring-1 ring-white text-white cursor-pointer mr-2 transition-colors duration-300'>tambah</div> 
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-white border-collapse">
            <thead className='block'>
              <tr style={{ display: 'table', width: '100%', tableLayout: 'fixed' }} className='bg-[#2443AE] text-white border-b-2 border-b-gray-600 w-full'>
                <th className="py-2 px-4 text-left border">Nama</th>
                <th className="py-2 px-4 text-left border">NIM</th>
                <th className="py-2 px-4 text-left border">Tanggal Lahir</th>
                <th className="py-2 px-4 text-left border">Alamat</th>
                <th className="py-2 px-4 text-left border">Nomor Telepon</th>
                <th className="py-2 px-4 text-left border">Kesukaan</th>
                <th className="py-2 px-4 text-left border">Action</th>
              </tr>
            </thead>
            <tbody className="custom-inset-shadow overflow-y-auto no-scrollbar w-[100%] " style={{ maxHeight: '30rem', display: 'block' }}>
              {filteredData.map((data, index) => (
                <tr onClick={()=>{setClickedData(data); setBarisClicked(true)}} key={index} style={{ display: 'table', width: '100%', tableLayout: 'fixed' }} className={`cursor-pointer hover:bg-gray-700  ${index % 2 === 0 ? 'bg-[#1B2058]  text-white' : 'bg-[#1B2058] text-white'}`}>
                  <td className="py-2 border px-4">{data.nama.slice(0,20)}{data.nama.length>20?'...':''}</td>
                  <td className="py-2 border px-4">{data.NIM}</td>
                  <td className="py-2 border px-4">{data.tglLahir}</td>
                  <td className="py-2 border px-4">{data.alamat.nama.slice(0,30)}...</td>
                  <td className="py-2 border px-4">{data.telp}</td>
                  <td className="py-2 border px-4">{data.kesukaan.slice(0,20)}{data.kesukaan.length>20?'...':''}</td>
                  <td className="py-2 border px-4 h-[4.15rem] flex ">
                    <Button onClick={(event) => event.stopPropagation()}  setClickedData={setClickedData} data={data} setBarisClicked={setRoute} updatePopup={updatePopup} refresh={refresh} refreshing={refreshing} admin={user} teks={'Edit'} type={'edit'} NIM={data.NIM}/>
                    <div onClick={(event) => {remove(event, data)}} className='ring-1 ring-white px-4 py-2 h-10 text-center rounded bg-[#2743AF]  text-white cursor-pointer mr-2 transition-colors duration-300'>hapus</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {popupTambah && (<div className="fixed left-0 top-0 mx-auto z-[999]"><Daftar setToggleAlert={setToggleAlert} updatePopup={updatePopup} refreshing={refreshing} setUser={setUser} typeTambah={"tambahAdmin"}/></div>)}
        {popupUpdate && (<div className="fixed left-0 top-0 mx-auto z-[999]"><Update setToggleAlert={setToggleAlert} data={data}  updatePopup={updatePopup} refreshing={refreshing} dataClicked={clickedData} typeTambah={"updateAdmin"}/></div>)}

      </section>
      {barisClicked && (<div className=' flex justify-center items-center w-screen h-screen fixed top-0 left-0 z-50'><PopupInfo dataClicked={clickedData} updatePopup={setBarisClicked}/></div>)}

          </div>
  );
};

function Button({teks, setBarisClicked, type, admin, NIM, data, setClickedData , refreshing, updatePopup}) {
  
  async function handle() {
    setBarisClicked(false)
    console.log("yajoo")
    if (type=='edit') {
      updatePopup("update")
      setClickedData(data)
    }else{
      await deleteDataMhs(admin, NIM)
      
      refreshing()
    }
  }

  return (
    <div onClick={handle} className='px-4 py-2 h-10 text-center rounded bg-[#2743AF] ring-1 ring-white text-white cursor-pointer mr-2 transition-colors duration-300'>{teks}</div>
  )
}


export default AdminDashboard;
