import React, { useState } from 'react';
import { readDataMhs } from "../../firestoreConnect";
import { useEffect } from 'react';
import Form from '../Form';
import { useNavigate } from 'react-router-dom';
import MapWithSide from "../../MapWithSide";
import  PopupInfo from "../PopupInfo";

const data = ({refresh, refreshing ,user, setUser, data, setData}) => {
  const [search, setSearch] = useState('');
  const [route, setRoute] = useState(false) //munculin route
  const [filteredData,setFilteredData] = useState([]);
  const [clicked,setClicked] = useState();

  function filterData(value) {
    setFilteredData(data.filter(data => data.nama.toLowerCase().includes(value.toLowerCase()) || data.NIM.toLowerCase().includes(value.toLowerCase())));
    console.log(filteredData)
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if(Object.keys(user).length < 5){
      navigate("/404")
      return
    }
  },[])

  useEffect(() => {
    
    const fetchData = async () => {
      await readDataMhs(setData);
    };
    
    fetchData();
    console.log('bb')
  }, [refresh]);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(data) 
    }
  }, [data]);

  return (
    <div className=' bg-gradient-to-r from-[#1A1C4F] to-[#284BC3]  w-screen h-screen flex  justify-center'>
    <section className="section p-10 pt-14 w-[80%]">
      <h2 className=" text-5xl font-bold text-white text-center mb-14">Data Kelas</h2>
      <div className="w-full h-1 bg-white mb-5"></div>
      <div className="mb-4">
        <input 
          type="text" 
          id="search-input" 
          className="w-full p-2 pl-4  backdrop-blur-sm bg-white/15  rounded-lg  text-white"
          placeholder="Cari Nama atau NIM..."
          value={search}
          onChange={(e) => {setSearch(e.target.value); filterData(e.target.value) }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white">
          <thead className='block'>
            <tr style={{ display: 'table', width: '100%', tableLayout: 'fixed' }} className='bg-[#2443AE] text-white border-b-2 border-b-gray-600'>
              <th className="py-2 px-4 border text-left   ">Name</th>
              <th className="py-2 px-4 border text-left">NIM</th>
              <th className="py-2 px-4 border text-left  ">Tanggal Lahir</th>
              <th className="py-2 px-4 border text-left ">Alamat</th>
              <th className="py-2 px-4 border text-left  ">Nomor Telepon</th>
              <th className="py-2 px-4 border text-left  ">Favorite</th>
            </tr>
          </thead>
          <tbody className="custom-inset-shadow overflow-y-auto no-scrollbar w-[100%] " style={{ maxHeight: '30rem', display: 'block' }}>
            {filteredData.map((el, index) => (
              <tr key={index} style={{ display: 'table', width: '100%', tableLayout: 'fixed' }} onClick={()=>{setRoute(!route); setClicked(el)}} className={` cursor-pointer hover:bg-gray-400 hover:text-black ${index % 2 === 0 ? 'bg-[#1B2058]  text-white' : 'bg-[#1B2058] text-white'}`}>
                <td className="py-2 border px-4">{el.nama.slice(0,20)}{el.kesukaan.length>20?'...':''}</td>
                <td className="py-2 border px-4">{el.NIM}</td>
                <td className="py-2 border px-4">{el.tglLahir}</td>
                <td className="py-2 border px-4">{el.alamat.nama.slice(0,30)}...</td>
                <td className="py-2 border px-4">{el.telp}</td>
                <td className="py-2 border px-4">{el.kesukaan.slice(0,20)}{el.kesukaan.length>20?'...':''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(user).length==2 && (<div className={`bg-white/ shadow-lg ring-1 ring-black/5 backdrop-blur-md fixed top-0 w-screen h-screen flex justify-center items-center`}>
        <Form refreshing={refreshing} user={user} setUser={setUser} type={'tambah'}/>
      </div>)}
    </section>
      {route && (<div className=' flex justify-center items-center w-screen h-screen fixed top-0 left-0 z-50'><PopupInfo dataClicked={clicked} updatePopup={setRoute}/></div>)}

  </div>
  );
};

export default data;
