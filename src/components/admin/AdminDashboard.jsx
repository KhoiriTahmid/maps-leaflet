import React, { useState } from 'react';
import { readDataMhs, deleteDataMhs } from "../../firestoreConnect";
import { useEffect } from 'react';
import Form from ".././Form";
import { popup } from 'leaflet';
import Daftar from '../Daftar';
import Update from '../Update';

const AdminDashboard = ({refresh, setUser, refreshing, user, data, setData}) => {
  const [search, setSearch] = useState('');
  const [popupTambah, setPopupTambah] = useState(false);
  const [popupUpdate, setPopupUpdate] = useState(false);

  function updatePopup(type){
    type!="update"? setPopupTambah(!popupTambah):setPopupUpdate(!popupUpdate);
  }

  const [filteredData,setFilteredData] = useState([]);
  const [clickedData,setClickedData] = useState();

  function filterData(value) {
    setFilteredData(data.filter(data => data.nama.toLowerCase().includes(value.toLowerCase()) || data.NIM.toLowerCase().includes(value.toLowerCase())));
    console.log(filteredData)
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
  }, [data]);

  console.log(data)

  return (
    <section className="section p-10 pt-10 bg-slate-950 min-h-screen">
      <h2 className="text-4xl font-bold text-yellow-500 text-center mb-4">Data Kelas</h2>
      <div className="w-full h-1 bg-yellow-500 mb-5"></div>
      <div className="mb-4 flex gap-4">
        <input 
          type="text" 
          id="search-input" 
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          placeholder="Cari Nama atau NIM..."
          value={search}
          onChange={(e) => {setSearch(e.target.value); filterData(e.target.value) }}
        />
        <div onClick={()=>updatePopup("tambah")} className='px-4 py-2 h-10 w-fit text-center rounded bg-green-500 text-white cursor-pointer mr-2 transition-colors duration-300'>tambah</div> 
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white">
          <thead>
            <tr className='text-yellow-500 border-b-2 border-b-yellow-500'>
              <th className="py-2 px-4 text-left bg-gray-700">Nama</th>
              <th className="py-2 px-4 text-left bg-gray-700">NIM</th>
              <th className="py-2 px-4 text-left bg-gray-700">Tanggal Lahir</th>
              <th className="py-2 px-4 text-left bg-gray-700">Alamat</th>
              <th className="py-2 px-4 text-left bg-gray-700">Nomor Telepon</th>
              <th className="py-2 px-4 text-left bg-gray-700">Kesukaan</th>
              <th className="py-2 px-4 text-left bg-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className='overflow-scroll '>
            {filteredData.map((data, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                <td className="py-2 px-4">{data.nama}</td>
                <td className="py-2 px-4">{data.NIM}</td>
                <td className="py-2 px-4">{data.tglLahir}</td>
                <td className="py-2 px-4">{data.alamat.nama.slice(0,30)}...</td>
                <td className="py-2 px-4">{data.telp}</td>
                <td className="py-2 px-4">{data.kesukaan}</td>
                <td className="py-2 px-4 flex">
                  <Button setClickedData={setClickedData} data={data} updatePopup={updatePopup} refresh={refresh} refreshing={refreshing} admin={user} teks={'Edit'} type={'edit'} NIM={data.NIM}/>
                  <Button setClickedData={setClickedData} data={data}  refresh={refresh} refreshing={refreshing} admin={user} NIM={data.NIM} teks={'Hapus'} type={'hapus'}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popupTambah && (<div className="fixed left-0 top-0 mx-auto z-50"><Daftar updatePopup={updatePopup} refreshing={refreshing} setUser={setUser} typeTambah={"tambahAdmin"}/></div>)}
      {popupUpdate && (<div className="fixed left-0 top-0 mx-auto z-50"><Update data={data}  updatePopup={updatePopup} refreshing={refreshing} dataClicked={clickedData} typeTambah={"updateAdmin"}/></div>)}

    </section>
  );
};

function Button({teks, type, admin, NIM, data, setClickedData , refreshing, updatePopup}) {
  
  async function handle() {
    setClickedData(data)
    if (type=='edit') {
      updatePopup("update")
    }else{
      await deleteDataMhs(admin, NIM)
      refreshing()
    }
  }

  return (
    <div onClick={handle} className='px-4 py-2 h-10 text-center rounded bg-green-500 text-white cursor-pointer mr-2 transition-colors duration-300'>{teks}</div>
  )
}


export default AdminDashboard;
