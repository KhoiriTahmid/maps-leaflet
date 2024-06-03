import React, { useState } from 'react';
import { readDataMhs } from "../../firestoreConnect";
import { useEffect } from 'react';
import Form from '../Form';
import { Route } from 'react-router-dom';
import MapWithSide from "../../MapWithSide";

const data = ({refresh, refreshing ,user, setUser, data, setData}) => {
  const [search, setSearch] = useState('');
  const [route, setRoute] = useState(false) //munculin route
  const [filteredData,setFilteredData] = useState([]);
  const [clicked,setClicked] = useState();

  function filterData(value) {
    setFilteredData(data.filter(data => data.nama.toLowerCase().includes(value.toLowerCase()) || data.NIM.toLowerCase().includes(value.toLowerCase())));
    console.log(filteredData)
  }

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
    <>
    <section className="section p-10 pt-10 bg-slate-950 min-h-screen">
      <h2 className="text-4xl font-bold text-yellow-500 text-center mb-4">Data Kelas</h2>
      <div className="w-full h-1 bg-yellow-500 mb-5"></div>
      <div className="mb-4">
        <input 
          type="text" 
          id="search-input" 
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          placeholder="Cari Nama atau NIM..."
          value={search}
          onChange={(e) => {setSearch(e.target.value); filterData(e.target.value) }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white">
          <thead>
            <tr className='text-yellow-500 border-b-2 border-b-yellow-500'>
              <th className="py-2 px-4 text-left bg-gray-700">Name</th>
              <th className="py-2 px-4 text-left bg-gray-700">NIM</th>
              <th className="py-2 px-4 text-left bg-gray-700">Tanggal Lahir</th>
              <th className="py-2 px-4 text-left bg-gray-700">Alamat</th>
              <th className="py-2 px-4 text-left bg-gray-700">Nomor Telepon</th>
              <th className="py-2 px-4 text-left bg-gray-700">Favorite</th>
            </tr>
          </thead>
          <tbody className='overflow-scroll '>
            {filteredData.map((el, index) => (
              <tr key={index} onClick={()=>{setRoute(!route); setClicked(el)}} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                <td className="py-2 px-4">{el.nama}</td>
                <td className="py-2 px-4">{el.NIM}</td>
                <td className="py-2 px-4">{el.tglLahir}</td>
                <td className="py-2 px-4">{el.alamat.nama.slice(0,30)}...</td>
                <td className="py-2 px-4">{el.telp}</td>
                <td className="py-2 px-4">{el.kesukaan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(user).length==2 && (<div className={`bg-white/ shadow-lg ring-1 ring-black/5 backdrop-blur-md fixed top-0 w-screen h-screen flex justify-center items-center`}>
        <Form refreshing={refreshing} user={user} setUser={setUser} type={'tambah'}/>
      </div>)}
    </section>
    {route && (<div className=' flex justify-center items-center w-screen bg-red-900 h-screen fixed top-0 left-0 z-50'><MapWithSide  type={"showOnDash"}  h={`30rem`} w={"75%"} user={clicked}/></div>)}
  </>
  );
};

export default data;
